import axios from 'axios';

var api = {};
var apiAuth = { logged: false };
var newTokenInProgress = false;
var apiUrl = 'http://localhost:8080/api';
api.url = apiUrl;
api.baseUrl = apiUrl.replace('/api', '');

api.token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjU4NjI0MzIsInVzZXJfbmFtZSI6InByZXNhZGF2YWxlcml1QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiNDAwMTU1M2MtZjVjZC00MTQzLTlhYjAtNWYzZmJmNDM5M2I5IiwiY2xpZW50X2lkIjoib3ZpZGl1cyIsInNjb3BlIjpbIndlYiJdfQ.N4wszNU3w0RP2EnGr-gx_xR7wAOAvnKLIoTDYOl-u3K3-E2wN5IFLMCw1BwVKMT9AyxrLLieCFqhFNAVQcPFTU6HdG_QfOsBPzKhC9dpkax-1uzgTfoI-3EtSHY_PMn5FA26J_HQMjCawrW05UAJZE_vhrwljISCK-urmJXyH_dUOAR5McChYc9KUWXhKzH350zffzW0GbUzZ7hB6_o-osVHQC6Y1zfVZ8WAeoFexfjoqRNyJRjhtGsDpFDnO4ElnymzmoWE3QflkNT0jJ8NRvZ0wvv7A589U8n5n4ZH8mcFnhj51qwyxIlYrpgmxsOWQzE2iO1Irc_xTqVjHf5yRA";

api.post = (url, data) => {
    return api.request('POST', url, data);
};

api.get = (url, data) => {
    return api.request('GET', url, data);
};
api.url = apiUrl;
// Prepare a request to send
api.request = (method, url, data) => {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();
        url = apiUrl + url;
        console.log('url: ', url);
        let headers = {};
        // if (apiAuth && apiAuth.logged && apiAuth.token) {
        //     headers = api.oauth.authorizationHeader(apiAuth.token);
        // }
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = `Bearer ${api.token}`;

        api.sendRequest(method, url, headers, data)
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                if (response.status === 401) {
                    // Token expired. Refresh the token
                    if (newTokenInProgress === true) {
                        reject(response);
                        return false;
                    }
                    newTokenInProgress = true;
                    api.oauth.refreshToken(apiAuth)
                        .then(auth => {
                            // Refresh success !
                            // try the current request again
                            newTokenInProgress = false;
                            headers = {};
                            if (auth.logged && auth.token) {
                                headers = api.oauth.authorizationHeader(auth.token);
                            }
                            headers['Content-Type'] = 'application/json';
                            api.sendRequest(method, url, headers, data)
                                .then(response => resolve(response))
                                .catch(response => reject(response));
                        })
                        .catch(response => {
                            // Could not refresh. Could be network or server error, or expired refresh token
                            newTokenInProgress = false;
                            api.oauth.updateAuth({ logged: false });
                            reject(response);
                        });
                } else {
                    reject(response);
                }
            });
    });
};

// Send the actual http request
api.sendRequest = (method, url, headers, data) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: method,
            url: url,
            headers: headers,
        };
        if (method == 'GET') options.params = data;
        else options.data = data;

        axios(options)
            .then(response => {
                resolve(response);
            })
            .catch(({ response }) => {
                resolve(response);
            });
    });
};

// Oauth2 implementation functions
api.oauth = {};

api.oauth.logout = () => {
    api.oauth.updateAuth({ logged: false });
    emitter.emit('auth', 'logout');
};

// Create the authorization header for a request
api.oauth.authorizationHeader = token => {
    return { Authorization: token.token_type + ' ' + token.access_token };
};

// Update apiAuth var
api.oauth.updateAuth = auth => {
    apiAuth = auth;
    AsyncStorage.setItem('auth', JSON.stringify(auth));
};
//get auth
api.oauth.getAuth = () => {
    return apiAuth;
};

// When we get a new token we need to calculate the time when it will expire
api.oauth.processNewToken = token => {
    let token_expires_in = token.expires_in || 0;
    token.issued_at = Math.floor(new Date().getTime() / 1000);
    token.expires_at = token.issued_at + token_expires_in;
    return token;
};

// Check if provided token's timestamp is expired
api.oauth.verifyIfTokenExpired = token => {
    let time_now = Math.floor(new Date().getTime() / 1000);
    let token_expiration = token.expires_at || 0;
    return time_now > token_expiration ? true : false;
};

// Check existing token(s)
api.oauth.check = () => {
    return new Promise((resolve, reject) => {
        let returnNotLogged = () => {
            api.oauth.updateAuth({ logged: false });
            resolve(apiAuth);
        };
        let returnRefreshToken = auth => {
            if (newTokenInProgress === true) {
                reject(auth);
                return false;
            }
            newTokenInProgress = true;
            api.oauth.refreshToken(auth)
                .then(response => {
                    // Refresh success !
                    newTokenInProgress = false;
                    resolve(response);
                })
                .catch(response => {
                    // Could not refresh. Could be network or server error, or expired refresh token
                    if (response.message) {
                        emitter.emit('appNotification', { title: 'Error', desc: response.message });
                    }
                    newTokenInProgress = false;
                    return returnNotLogged();
                });
        };

        // Get authentication data from the local database
        AsyncStorage.getItem('auth').then(authString => {
            let auth = JSON.parse(authString);
            if (auth != null && auth && auth.logged === true) {
                // I was logged in. Let's check if our token is expired
                if (api.oauth.verifyIfTokenExpired(auth.token) === true) {
                    // Token expired. Refresh the token
                    return returnRefreshToken(auth);
                } else {
                    // Token is not expired, but check it on the server
                    api.oauth.checkRemote(auth.token)
                        .then(response => {
                            if (response.logged === true) {
                                // Token is valid. Update auth data and return
                                api.oauth.updateAuth({
                                    logged: true,
                                    user: response.user,
                                    token: auth.token,
                                });
                                resolve(apiAuth);
                            } else {
                                // Server says token is not valid. Can be expired. Refresh token
                                return returnRefreshToken(auth);
                            }
                        })
                        .catch(response => {
                            // Could not check the token. Could be network or server error
                            resolve(auth);
                        });
                }
            } else {
                // I was not logged in
                return returnNotLogged();
            }
        }).catch(error => {
            // Could not access local database, or maybe the db is clean
            return returnNotLogged();
        });
    });
};

// Refresh access token if possible
api.oauth.refreshToken = auth => {
    return new Promise((resolve, reject) => {
        api.oauth.refreshRemote(auth.token.refresh_token)
            .then(response => {
                if (response.success === true) {
                    // Got a fresh new token. Save it and return
                    let new_processed_token = api.oauth.processNewToken(response.token);
                    api.oauth.updateAuth({
                        logged: true,
                        user: response.user,
                        token: new_processed_token,
                    });
                    resolve(apiAuth);
                } else {
                    // Refresh Token is expired.
                    reject(response);
                }
            })
            .catch(response => {
                // Could not refresh. Could be network or server error
                reject(response);
            });
    });
};

// Check existing token on the remote api
api.oauth.checkRemote = token => {
    return new Promise((resolve, reject) => {
        api.sendRequest(
            'GET',
            apiUrl + '/oauth/token',
            api.oauth.authorizationHeader(token),
            {}
        )
            .then(response => {
                resolve(response.data);
            })
            .catch(response => {
                reject(response);
            });
    });
};

// Refresh expired token
api.oauth.refreshRemote = refresh_token => {
    return new Promise((resolve, reject) => {
        api.sendRequest(
            'POST',
            apiUrl + '/user/refresh',
            {},
            { refresh_token: refresh_token }
        )
            .then(response => {
                resolve(response.data);
            })
            .catch(response => {
                reject(response);
            });
    });
};
export default api;
