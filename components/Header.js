import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View
            style={{
                ...styles.header,
                ...Platform.select({
                    ios: styles.headerIOS,
                    android: styles.headerAndroid
                })
            }}
        >
            <TitleText>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    headerAndroid: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;