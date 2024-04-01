import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ViewComponent, StyleSheet, FlatList, SafeAreaView, ScrollView, Button, KeyboardAvoidingView, Platform, TextInput } from 'react-native';

const Main = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
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
    useEffect(() => {
        dataMarkets();

    }, []);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.containerSearch}>
                <Text style={styles.header}>Cryptos</Text>
                <TextInput placeholder="Username" style={styles.textInput} onChangeText={onChangeSearch}  value={search}/>
            </View>
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


const CryptoItem = ({ element }) => (
    <View style={styles.item}>
        <Text style={styles.Label}>{element.Label}</Text>
        <Text style={styles.Name}>{element.Name}</Text>
        <Text style={styles.Price}>{element.Price}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginTop: 0,
        marginBottom: 3,
    },
    ScrollView: {
        flex: 2,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 10,
        padding: 15,
        marginBottom: 3,

    },
    containerSearch: {
        marginTop: 40,
        backgroundColor: 'black',

        padding: 15,
    },
    item: {
        backgroundColor: '#C1C1C1',
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 5,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'center',

        alignItems: 'center',
    },
    Label: {
        fontSize: 20,
        margin: 5,
        fontWeight: 'bold',
        color: 'grey',

    },
    Name: {
        margin: 5,
        fontSize: 15,
        fontWeight: 'bold',

    },
    Price: {
        margin: 5,
        color: 'green',

    },
    textInput: {
        height: 40,
        color: 'white',
        borderColor: '#c0c0c0',
        borderBottomWidth: 1,
        marginTop: 10,
    },
    header: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',

    },
});

export default Main;