// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import houses from '../helpers/houseData'
import HouseItem from './HouseItem'

import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
     super(props)
      this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
      this.state = { houses: [] }
   }

   _loadFilms() {
      if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
        getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
            this.setState({ houses: data.results })
        })
      }
    }

    _searchTextInputChanged(text) {
  this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
}


  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput}
        placeholder='Titre du film'
        onChangeText={(text)=> this._searchTextInputChanged(text)}/>

        <Button title='Rechercher' onPress={() => this._loadFilms()}/>

        <FlatList
        data={this.state.houses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <HouseItem house={item}/>}
        />
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
