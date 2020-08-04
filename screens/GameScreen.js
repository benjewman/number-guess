import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

// Improve game logic so it won't guess the same number multiple times
// Low is inclusive at the moment
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;
    if (randNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [rounds, setRounds] = useState(0);

    const { userChoice, onGameOver } = props;
    
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);
    
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't Lie!", "This is wrong", [
                {text: 'Sorry!', style: 'cancel'}
            ]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        // if the next number equals the low or high
        // add or subtract one from the next guess accordingly
        if (nextNumber === currentLow.current) {
            setCurrentGuess(nextNumber + 1);
        } else if (nextNumber === currentHigh.current) {
            setCurrentGuess(nextNumber - 1);
        } else {
            setCurrentGuess(nextNumber);
        }
        setRounds(currentRounds => currentRounds + 1);
    };
    
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons size={24} color="white" name="md-remove"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons size={24} color="white" name="md-add" />
                </MainButton>
            </Card>
        </View>
    )
    
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    }
});

export default GameScreen;