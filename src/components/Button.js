import React from 'react';
import { Text, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Button extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <LinearGradient
                colors={['#B5B5EC', '#9914B2', '#68114A']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 38, overflow: "hidden" }}>
                <Pressable
                    onPress={() => { this.props.onPress() }}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 }}
                    android_ripple={{ color: '#7B0B7B' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Muli-SemiBold', color: '#fff' }}>{this.props.text}</Text>
                </Pressable>
            </LinearGradient>
        )
    }
}