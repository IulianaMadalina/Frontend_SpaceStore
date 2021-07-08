import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../components/Button';

export default class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: 'test@test.com',
            password: 'test',
            password1: 'test',
            showPassword: false,
            showPassword1: false,
        };
    }

    register() {
        if (this.state.password == this.state.password1)
            api.post('/ruta register', {
                username: '...........', //dupa ce testati backendul trebuie sa fie this.state.email
                password: '...........', //this.state.password
            })
                .then(response => {
                    console.log('response login: ', response);
                    this.props.navigation.navigate('Home');
                })
                .catch(error => {
                    alert(JSON.stringify(error.message));
                })
        else
            alert('Parolele nu corespund!');
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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

                        <Text style={{ width: '90%', fontSize: 14, fontFamily: 'Muli', color: '#292929', marginTop: '20%' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <Text style={{ fontSize: 14, fontFamily: 'Muli-Bold', color: '#292929' }}>Learn what happens when your number changes.</Text></Text>

                        <View style={{ marginTop: 30 }}>
                            <Button
                                text={'Register'}
                                onPress={() => { this.register() }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}