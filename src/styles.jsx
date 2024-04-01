import { StyleSheet } from "react-native";

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
        position: 'relative',
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
    img: {
        width: 30,
        height: 30,
      
    },
    favorite: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
});
export default styles;