import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ViewComponent, StyleSheet, FlatList, SafeAreaView, ScrollView, Button, KeyboardAvoidingView, Platform, TextInput, Image, TouchableHighlight } from 'react-native';
import Search from './search';
import styles from './styles';
import NoneFavorite from '../public/favorite-svgrepo-com.png';
import IsFavorite from '../public/favorite-interface-multimedia-svgrepo-com.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Main = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [favoriteData, setFavoriteData] = useState([]);
    const [page, setPage] = useState(10);
    const [search, setSearch] = useState('');

    const dataMarkets = async () => {
        const response = await fetch('https://www.worldcoinindex.com/apiservice/v2getmarkets?key=skfp3FBOBLiyyZxhTFnLGWQTvSqdW4d8NpN&fiat=usd');
        const data = await response.json();
        await data.Markets.forEach(element => {
            setCryptoData(element)
        });
    };

    // Función para recuperar datos de AsyncStorage
    const retrieveData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('favorite-Crypto');
            return jsonValue != null ? setFavorite( JSON.parse(jsonValue)) : null;
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    const elementosAMostrar = cryptoData.slice(0, page);

    const onChangeSearch = (e) => {
        setSearch(e);
        const filteredData = cryptoData.filter((element) => {
            return element.Name?.toLowerCase().includes(search?.toLowerCase());
        });
        setFilteredData(filteredData);
        console.log(filteredData);
    }

    const favoriteSet = (element) => {
        // Verifica si el elemento ya está en la lista de favoritos
        const isFavorite = favorite.some(fav => fav.Label === element.Label);
        const storeData = async (value) => {
            try {
                const jsonValue = JSON.stringify(value);
                console.log(jsonValue);
             
                await AsyncStorage.setItem('favorite-Crypto', jsonValue);
            } catch (e) {
                // saving error
            }
        };

        if (isFavorite) {
            // Si ya está en la lista de favoritos, elimínalo
            const updatedFavorites = favorite.filter(fav => fav.Label !== element.Label);
            storeData(updatedFavorites);
            setFavorite(updatedFavorites);
        } else {
            // Si no está en la lista de favoritos, agrégalo
            storeData([...favorite, element]);
            setFavorite([...favorite, element]);
        }
    };
    const Favorite = ({ element }) => (
        <View style={styles.favorite}
        >
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => favoriteSet(element)}>
                {favorite.some(fav => fav.Label === element.Label) ? <Image source={IsFavorite} style={styles.img} /> : <Image source={NoneFavorite} style={styles.img} />}


            </TouchableHighlight>
        </View>
    );
    const CryptoItem = ({ element }) => (
        <View style={styles.item}>
            <View style={styles.item}>
                <Text style={styles.Label}>{element.Label}</Text>
                <Text style={styles.Name}>{element.Name}</Text>
                <Text style={styles.Price}>u$d: {element.Price}</Text>
            </View>
            <Favorite element={element} />
        </View>
    );

    useEffect(() => {
      dataMarkets();
        retrieveData();
        const interval = setInterval(dataMarkets, 70000);

    return () => clearInterval(interval);

    }, []);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Search search={search} onChangeSearch={onChangeSearch} />
            <SafeAreaView style={styles.container}>

                <ScrollView style={styles.ScrollView}>
                    {favorite && favorite.map((element, index) => (
                        <CryptoItem key={index} element={ cryptoData.find(crypto => crypto.Label === element.Label) } />                        
                    ))}

                    {search.length > 2 ? filteredData.map((element, index) => (
                        <CryptoItem key={index} element={element} />

                    )) : elementosAMostrar.map((element, index) => (
                        <CryptoItem key={index} element={element} />
                    ))}

                </ScrollView>
                <Button title="Cargar más" onPress={() => { setPage(page + 10) }} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};





export default Main;