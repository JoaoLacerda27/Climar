import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Main() {
    const [location, setLocation] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);

    useEffect(() => {
        getLocationPermission();

        (async () => {
            const currentLocation = await Location.getCurrentPositionAsync();
            console.log('Current location:', currentLocation.coords);
            setLocation(currentLocation.coords);
            getAirQualityData(currentLocation.coords.latitude, currentLocation.coords.longitude);
        })();
    }, []);

    const getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permissão de localização não concedida!');
            return;
        }
    };

    const getAirQualityData = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=807673f6-cd6f-4564-9d59-e1847c6fdb09`,
            );
            console.log('Air quality data:', response.data);
            setAirQualityData(response.data);
        } catch (error) {
            console.log('Error getting air quality data:', error);
        }
    };

    const handleLocationChange = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const newLocation = await Location.getCurrentPositionAsync();
            console.log('New location:', newLocation.coords);
            setLocation(newLocation.coords);
            getAirQualityData(newLocation.coords.latitude, newLocation.coords.longitude);
        } else {
            console.error('Permissão de localização não concedida!');
        }
    };

    return (
        <View style={styles.containerMain}>
            <View style={styles.climaLogo}>

                {airQualityData && (
                    <>
                        <MaterialCommunityIcons name={iconMapping[airQualityData.data.current.weather.ic]} size={100} color="#FFF" />
                        <Text style={styles.city}>{airQualityData.data.city}</Text>
                        <Text style={styles.graus} >{airQualityData.data.current.weather.tp}°C</Text>
                    </>
                )}
            </View>

            <View style={styles.containerInfo}>
                {airQualityData && (
                    <View style={styles.containerText}>
                        <View>
                            <Text style={styles.textInfo}>Informações do clima:</Text>
                            <Text style={styles.textTopics}>Pressão: {airQualityData?.data?.current?.weather?.pr} hPa</Text>
                            <Text style={styles.textTopics}>Umidade relativa: {airQualityData?.data?.current?.weather?.hu}%</Text>
                            <Text style={styles.textTopics}>Velocidade do vento: {airQualityData?.data?.current?.weather?.ws} m/s</Text>
                        </View>

                        <View style={styles.infoAir}>
                            <Text style={styles.textInfo}>Informações da qualidade do ar:</Text>
                            <Text style={styles.textTopics}>Índice de qualidade do ar: {airQualityData?.data?.current?.pollution?.aqius}</Text>
                            <Text style={styles.textTopics}>Principal poluente: {airQualityData?.data?.current?.pollution?.mainus}</Text>
                            <Text style={styles.textTopics}>Concentração de PM2.5: {airQualityData?.data?.current?.pollution?.p1?.conc} μg/m³</Text>
                            <Text style={styles.textTopics}>Índice de qualidade do ar para PM2.5: {airQualityData?.data?.current?.pollution?.p1?.aqius}</Text>
                        </View>
                    </View>
                )}
            </View>
            <TouchableOpacity style={styles.buttonChange} onPress={handleLocationChange}>
                <Text style={styles.buttonText}>Alterar localização</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: '#38a69d',
    },
    city: {
        fontSize: 40,
        fontWeight: 600,
        color: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    climaLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    graus: {
        fontSize: 25,
        fontWeight: 200,
        color: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInfo: {
        flex: 3.2,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    buttonChange: {
        position: 'absolute',
        backgroundColor: '#38a69d',
        borderRadius: 50,
        paddingVertical: 8,
        width: '70%',
        height: '6%',
        alignSelf: 'center',
        bottom: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 400
    },
    containerText: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    textInfo: {
        backgroundColor: '#38a69d',
        borderRadius: 30,
        paddingLeft: 5,
        paddingRight: 5,
        padding: 3,

    },
    textTopics: {
        paddingLeft: 5,
        paddingRight: 5,
        padding: 4,

    },
    infoAir: {
        marginTop: 60
    },
});

const iconMapping = {
    '01d': 'weather-sunny',
    '01n': 'weather-night',
    '02d': 'weather-partly-cloudy',
    '02n': 'weather-night-partly-cloudy',
    '03d': 'weather-cloudy',
    '04d': 'weather-cloudy',
    '09d': 'weather-pouring',
    '10d': 'weather-lightning-rainy',
    '10n': 'weather-lightning-rainy',
    '11d': 'weather-lightning',
    '50d': 'weather-hail',
};