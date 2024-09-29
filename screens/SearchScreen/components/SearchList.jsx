import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SearchList = ({ searchData }) => {
  return (
    <View>
      <Text>{JSON.stringify(searchData)}</Text>
    </View>
  )
}

export default SearchList

const styles = StyleSheet.create({})