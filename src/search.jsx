import React from 'react'
import { Text, TextInput, View } from 'react-native'
import styles from './styles'

export const Search = ({search,onChangeSearch}) => {
  return (
    <View style={styles.containerSearch}>
    <Text style={styles.header}>Cryptos</Text>
    <TextInput placeholder="Username" style={styles.textInput} onChangeText={onChangeSearch}  value={search}/>
</View>
  )
}
export default Search