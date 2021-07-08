import React from 'react';
import { Text } from 'react-native';
import Button from '../components/Button';

export default class User extends React.Component {
    constructor(props) {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Text>PROFIL</Text>
                <Button
                    text={'Logout'}
                    onPress={() => { this.props.onLogout() }}
                />
            </>
        )
    }
}