import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ModeSelector from "./components/ModeSelector";
import SearchList from "./components/SearchList";
import ServiceProvider from "../../libs/APIParser";

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState(1);
  const [timer, setTimer] = useState(null);
  const [resp, setResp] = useState(null);

  const serviceProvider = new ServiceProvider();

  useEffect(() => {
    if (searchInput.trim() !== "") {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(async () => {
        const response = await serviceProvider.getSearch(encodeURIComponent(searchInput), 1, searchType);
        setResp(response);
      }, 1000);
      setTimer(newTimer);
    }
    else {
      const fetchRecommendData = async () => {
        const response = await serviceProvider.getTopSearches();
        setResp(response);
      }
      fetchRecommendData();
    }
  }, [searchInput, searchType]);

  return (
    <View>
      <Navbar setSearchInput={setSearchInput} />
      <ModeSelector setSearchType={setSearchType} searchType={searchType} />
      <SearchList searchData={!searchInput?resp:resp.results}/>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})