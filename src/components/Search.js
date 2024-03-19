// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import houses from '../helpers/houseData'
import HouseItem from './HouseItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0 // Compteur pour connaître la page courante
    this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state = {
      houses: [],
      isLoading: false
    }
  }

  _loadHouses() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true }) // Lancement du chargement
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          houses: [ ...this.state.houses, ...data.results ],
          isLoading: false // Arrêt du chargement
        })
      })
    }
  }


_searchHouses() {
  this.page = 0
  this.totalPages = 0
  this.setState({
    houses: [],
    }, () => {
        //console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de maisons : " + this.state.houses.length)
        this._loadHouses()
    })
}

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
        {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }


  render() {
    return (
      <View style={styles.main_container}>
      <TextInput style={styles.textinput}
          placeholder='Titre de la maison'
          onChangeText={(text)=> this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchHouses()} />

      <Button title='Rechercher' onPress={() => this._searchHouses()}/>

      <FlatList
          data={this.state.houses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <HouseItem house={item}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadHouses()
            }
          }}
        />

      {this._displayLoading()}

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
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
