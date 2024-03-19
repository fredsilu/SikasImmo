// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text } from 'react-native'

class Search extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder='Titre du film'/>
        <Button title='Rechercher' onPress={() => {}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    height: 50,
    borderColor: '#45268f',
    borderWidth: 2,
    paddingLeft: 5
  }
})

export default Search
