import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StatusBar, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api';
import Button from '../components/Button';

export default class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: 'presadavaleriu@gmail.com',
            password: 'parola',
            showPassword: false,
        };
    }

    async storeUser() {
        try {
            const jsonValue = JSON.stringify({ email: this.state.email, password: this.state.password })
            await AsyncStorage.setItem('user', jsonValue)
        } catch (e) {
            console.error('Error writing to storage');
        }
    }

    async login() {
        api.post('/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                console.log('response login: ', response);
                if (response.data) {
                    this.storeUser();
                    this.props.navigation.navigate('Home');
                    this.props.onLogin();
                }
            })
            .catch(error => {
                console.error(e);
                alert(JSON.stringify(error.message));
            })
    }

    render() {
        return (
            <>
                <StatusBar animated backgroundColor='#fff' barStyle={'dark-content'} />
                <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden', marginTop: 10 }}>
                        <Pressable
                            android_ripple={{ color: '#9914B2', radius: 20 }}
                            onPress={() => { this.props.navigation.navigate('Profile') }}
                            style={{ padding: 10, marginLeft: 10 }}>
                            {/* <Back /> */}
                        </Pressable>
                        <Text style={{ fontSize: 12, fontFamily: 'Muli-SemiBold', color: '#292929', marginLeft: 5 }}>Create an account</Text>
                    </View>

                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Muli-SemiBold', color: '#292929' }}>Login</Text>

                        <TextInput
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                            placeholder={'E-mail address'}
                            placeholderTextColor={'#292929'}
                            style={{ fontSize: 14, fontFamily: 'Muli', color: '#000', marginTop: 40 }}
                        />
                        <LinearGradient
                            colors={['#B5B5EC', '#9914B2', '#68114A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ height: 2, borderRadius: 2 }}
                        />

                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                                placeholder={'Password'}
                                placeholderTextColor={'#292929'}
                                style={{ fontSize: 14, fontFamily: 'Muli', color: '#000' }}
                                secureTextEntry={!this.state.showPassword}
                            />
                            <Pressable
                                android_ripple={{ color: 'gray', radius: 20 }}
                                onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                                style={{ position: 'absolute', right: -20, padding: 20 }}>
                                {/* <Password style={{}} /> */}
                            </Pressable>
                        </View>
                        <LinearGradient
                            colors={['#B5B5EC', '#9914B2', '#68114A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ height: 2, borderRadius: 2 }}
                        />

                        <Pressable
                            onPress={() => { this.props.navigation.navigate('Register') }}
                            style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Muli', color: '#9914B2', marginTop: 15 }}>Dont't have an account? Register</Text>
                        </Pressable>

                        <Text style={{ width: '90%', fontSize: 14, fontFamily: 'Muli', color: '#292929', marginTop: '20%' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <Text style={{ fontSize: 14, fontFamily: 'Muli-Bold', color: '#292929' }}>Learn what happens when your number changes.</Text></Text>

                        <View style={{ marginTop: 30 }}>
                            <Button
                                text={'Login'}
                                onPress={() => { this.login() }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}