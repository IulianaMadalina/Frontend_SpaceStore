import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../components/Button';

export default class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: 'test@test.com',
            name: 'test',
            age: 21,
            role: 'ROLE_DEFAULT',
            password: 'test',
            password1: 'test',
            showPassword: false,
            showPassword1: false,
            adminSwitch: false,
            userType: 'user',
        };
    }

    register() {
        if (this.state.password == this.state.password1)
            api.post('/api/publicEndpoint/register', {
                email: this.state.email,
                password: this.state.password,
            })
                .then(response => {
                    console.log('response register: ', response);
                    this.props.navigation.navigate('Login');
                })
                .catch(error => {
                    alert(JSON.stringify(error.message));
                })
        else
            alert('Parolele nu corespund!');
    }


    render() {
        return (
            <>
                <StatusBar animated backgroundColor='#fff' barStyle={'dark-content'} />
                <ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden', marginTop: 10 }}>
                        <Pressable
                            android_ripple={{ color: '#9914B2', radius: 20 }}
                            onPress={() => { this.props.navigation.navigate('Login') }}
                            style={{ padding: 10, marginLeft: 10 }}>
                            {/* <Back /> */}
                        </Pressable>
                        <Text style={{ fontSize: 12, fontFamily: 'Muli-SemiBold', color: '#292929', marginLeft: 5 }}>Back to Login</Text>
                    </View>


                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Muli-SemiBold', color: '#292929' }}>Create My Profile</Text>

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



                        <TextInput
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                            placeholder={'Your name'}
                            placeholderTextColor={'#292929'}
                            style={{ fontSize: 14, fontFamily: 'Muli', color: '#000', marginTop: 40 }}
                        />
                        <LinearGradient
                            colors={['#B5B5EC', '#9914B2', '#68114A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ height: 2, borderRadius: 2 }}
                        />

                        <TextInput
                            value={this.state.age}
                            onChangeText={text => this.setState({ age: text })}
                            placeholder={'Your age'}
                            placeholderTextColor={'#292929'}
                            style={{ fontSize: 14, fontFamily: 'Muli', color: '#000', marginTop: 40 }}
                        />
                        <LinearGradient
                            colors={['#B5B5EC', '#9914B2', '#68114A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ height: 2, borderRadius: 2 }}
                        />

                        <TextInput
                            value={this.state.role}
                            onChangeText={text => this.setState({ role: text })}
                            placeholder={'Choose one of role (ROLE_DEFAULT / ROLE_ADMIN)'}
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

                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                value={this.state.password1}
                                onChangeText={text => this.setState({ password1: text })}
                                placeholder={'Repeat password'}
                                placeholderTextColor={'#292929'}
                                style={{ fontSize: 14, fontFamily: 'Muli', color: '#000' }}
                                secureTextEntry={!this.state.showPassword1}
                            />
                            <Pressable
                                android_ripple={{ color: 'gray', radius: 20 }}
                                onPress={() => { this.setState({ showPassword1: !this.state.showPassword1 }) }}
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

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Switch
                                style={{ alignSelf: 'flex-start' }}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.adminSwitch ? "#9914B2" : "#f4f3f4"}
                                onValueChange={() => {
                                    if (this.state.userType == 'user') {
                                        this.setState({ userType: 'admin', adminSwitch: true });
                                    }
                                    else {
                                        this.setState({ userType: 'user', adminSwitch: false });
                                    }
                                }}
                                value={this.state.adminSwitch}
                            />
                            <Text style={{}}>{this.state.userType}</Text>
                        </View>

                        <Text style={{ width: '90%', fontSize: 14, fontFamily: 'Muli', color: '#292929', marginTop: '20%' }}>Te-ai inregistrat cu succes in aplicatia Space Store. <Text style={{ fontSize: 14, fontFamily: 'Muli-Bold', color: '#292929' }}>Learn what happens when your number changes.</Text></Text>

                        <View style={{ marginTop: 30 }}>
                            <Button
                                text={'Register'}
                                onPress={() => { this.register() }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}