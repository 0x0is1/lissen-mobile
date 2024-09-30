import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list'; 
import Card from "../../AlbumsScreen/components/Card";
const SearchList = ({ searchData }) => {  
  const renderCard = ({ item, index }) => (
    <Card albumData={item} index={index} />
  );
  return searchData && (
    <ScrollView style={styles.container}>
      <MasonryList
        data={searchData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        onEndReachedThreshold={0.1}
      />
    </ScrollView>
  )
}

export default SearchList

const styles = StyleSheet.create({
  container: {
  },
})