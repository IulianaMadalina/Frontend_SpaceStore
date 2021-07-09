import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';

export default class Navigation extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={'none'}>
                    <Stack.Screen name="TabNav" component={TabNav} />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

class TabNav extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
        }
    }

    async componentDidMount() {
        const user = await this.getUser();
        if (user) {
            this.setState({ loggedIn: true });
        }
    }

    async getUser() {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                return user;
            }
            else
                return null;
        } catch (e) {
            console.error('Error reading from storage');
            return null;
        }
    }

    render() {
        return (
            <Tab.Navigator barStyle={{ backgroundColor: '#7B0B7B' }}>
                {this.state.loggedIn ?
                    <>
                        <Tab.Screen name="Home" component={Home} options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26} />
                            ),
                        }} />
                        <Tab.Screen name="Profile" options={{
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="account" color={color} size={26} />
                            ),
                        }}>{props => <Profile {...props} onLogout={() => this.setState({ loggedIn: false })} />}</Tab.Screen>
                    </>
                    :
                    <>
                        <Tab.Screen name="Login" options={{
                            tabBarLabel: 'Login',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="login" color={color} size={26} />
                            ),
                        }}>{props => <Login {...props} onLogin={() => { this.setState({ loggedIn: true }) }} />}</Tab.Screen>
                        <Tab.Screen name="Register" component={Register} options={{
                            tabBarLabel: 'Register',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="account" color={color} size={26} />
                            ),
                        }} />
                    </>
                }
            </Tab.Navigator>
        )
    }
}