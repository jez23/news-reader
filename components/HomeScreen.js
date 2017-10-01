import { View, Text, SectionList } from 'react-native'
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import API_KEY from '../key'
import axios from 'axios'

class HomeScreen extends Component {
    constructor () {
        super()
    
        this.handleNewsUpdate = this.handleNewsUpdate.bind(this)
    }
    handleNewsUpdate (response) {
        const results = response.data.response.results
        const news = []
      
        results.forEach(function (result) {
          const existingSection = news.find(function getBySectionName (section) {
            return section.title === result.sectionName
          })
      
          if (existingSection) {
            existingSection.data.push(result)
          } else {
            news.push({
              title: result.sectionName,
              data: [result]
            })
          }
        })
      
        this.setState({ news })
        console.log(this.state.news)
      }
      componentDidMount () {
        axios.get(`https://content.guardianapis.com/search?api-key=${API_KEY}`)
          .then(response => {
            this.handleNewsUpdate(response)
          })
          .catch(error => console.log(error))
      }
    render () {
        if (this.state.news.length) {
            return (
              <View>
                <SectionList
                  renderItem={({ item }) => (
                    <NewsItem
                    id={item.id}
                    title={item.webTitle}
                    navigation={this.props.navigation} />
                  )}
                  keyExtractor={item => item.id}
                  renderSectionHeader={({ section }) => <Header key={section.title} title={section.title} />}
                  sections={this.state.news}
                />
              </View>
            )
          }
    }
  }
  HomeScreen.navigationOptions = {
    title: 'News'
  }
  export default HomeScreen
