import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    const handleDirection = () => {
        navigation.navigate('Main');
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image 
                    animation="flipInY"
                    source={require('../../assets/app-de-clima.png')}
                    style={{width: '80%'}}
                    resizeMode='contain'
                />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>A qualidade do ar em suas mãos</Text>
                <Text style={styles.text}>Clique para começar</Text>

                <TouchableOpacity
                 style={styles.button}
                 onPress={handleDirection}
                 >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38a69d'
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#38a69d',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title:{
        fontSize: 24,
        fontWeight: 600,
        marginTop: 28,
        marginBottom: 12,
    },
    text:{
        color:'#a1a1a1'
    },
    button:{
        position: 'absolute',
        backgroundColor: '#38a69d',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 600
    }
})