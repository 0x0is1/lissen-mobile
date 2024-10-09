import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { expo } from "../../../app.json";
const VersionScreen = () => {
  return (
    <View>
      <Text>{expo.version}</Text>
    </View>
  )
}

export default VersionScreen

const styles = StyleSheet.create({})