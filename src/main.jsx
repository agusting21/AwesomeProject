import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ViewComponent, StyleSheet, FlatList, SafeAreaView, ScrollView, Button, KeyboardAvoidingView, Platform, TextInput,Image, TouchableHighlight } from 'react-native';
import Search from './search';
import styles from './styles';
import NoneFavorite from '../public/favorite-svgrepo-com.png';
const Main = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [page, setPage] = useState(10);
    const [search, setSearch] = useState('');
    const dataMarkets = useCallback(async () => {
        const response = await fetch('https://www.worldcoinindex.com/apiservice/v2getmarkets?key=6GrIxz2ZW08nvpLx3ljd9LHEY0ltsSBUMNo&fiat=usd');
        const data = await response.json();
        await data.Markets.forEach(element => {
            setCryptoData(element)
        });
    }, []);

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
        
    }
    useEffect(() => {
        dataMarkets();

    }, []);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
          <Search search={search} onChangeSearch={onChangeSearch} />
            <SafeAreaView style={styles.container}>

                <ScrollView style={styles.ScrollView}>

                    {search.length> 2? filteredData.map((element, index) => (
                        <CryptoItem key={index} element={element} />
                        
                        )):elementosAMostrar.map((element, index) => (
                            <CryptoItem key={index} element={element} />
                        ))}
                    
                </ScrollView>
                <Button title="Cargar más" onPress={() => { setPage(page + 10) }} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const Favorite = ({ element }) => (
    <View style={styles.favorite}
    >
    <TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDDDD"
  onPress={() => alert('Pressed!')}>
   
     <Image source={NoneFavorite} style={styles.img}/>
   
    </TouchableHighlight>
    </View>
);
const CryptoItem = ({ element }) => (
    <View style={styles.item}>
    <View style={styles.item}>
        <Text style={styles.Label}>{element.Label}</Text>
        <Text style={styles.Name}>{element.Name}</Text>
        <Text style={styles.Price}>{element.Price}</Text>
    </View>
    <Favorite element={element} />
    </View>
);



export default Main;