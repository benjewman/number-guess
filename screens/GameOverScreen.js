import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                style={styles.image} 
                source={require('../assets/success.png')} 
                resizeMode="cover"
                />
            </View>
            <View style={styles.resultsContainer}> 
                <BodyText style={styles.resultsText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: '20%',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        overflow: 'hidden',
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    }, 
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultsContainer: {
        marginHorizontal: 50,
        marginVertical: 15
    },
    resultsText: {
        textAlign: 'center',
        fontSize: 20
    }
})

export default GameOverScreen;