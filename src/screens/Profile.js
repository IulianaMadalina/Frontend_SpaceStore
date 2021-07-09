import React from 'react';
import { Text } from 'react-native';
import Button from '../components/Button';

export default class User extends React.Component {
    constructor(props) {
        super();
    }

    async logout() {
        try {
            await AsyncStorage.removeItem('user');
        } catch (e) {
            console.error('Error deleting user from storage');
        }
    }

    render() {
        return (
            <>
                <Text>PROFIL</Text>
                <Button
                    text={'Logout'}
                    onPress={() => { this.logout(); this.props.onLogout() }}
                />
            </>
        )
    }
}