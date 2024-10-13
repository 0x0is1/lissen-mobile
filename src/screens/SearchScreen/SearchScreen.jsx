import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
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
				try {
					const response = await serviceProvider.getSearch(
						encodeURIComponent(searchInput),
						1,
						searchType,
					);
					setResp(response?.results);
				} catch (error) {
					setResp(null);
				}
			}, 500);
			setTimer(newTimer);
		} else {
			const fetchRecommendData = async () => {
				const response = await serviceProvider.getTopSearches();
				setResp(response);
			};
			fetchRecommendData();
		}
	}, [searchInput, searchType]);

	return (
		<View style={{ flex: 1 }}>
			<Navbar setSearchInput={setSearchInput} />
			<ModeSelector setSearchType={setSearchType} searchType={searchType} />
			<SearchList searchData={Array.isArray(resp) ? resp : []} />
		</View>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({});
