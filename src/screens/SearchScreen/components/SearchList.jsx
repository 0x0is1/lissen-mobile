import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import Card from "../../AlbumsScreen/components/Card";

const SearchList = ({ searchData }) => {
	const renderCard = ({ item, index }) => (
		<Card albumData={item} index={index} />
	);

	return searchData.length > 0 ? (
		<MasonryList
			data={searchData}
			keyExtractor={(item) => item.id}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			renderItem={renderCard}
			onEndReachedThreshold={0.1}
		/>
	) : (
		<View style={styles.noResultsContainer}>
			<Text style={styles.noResultsText}>No results found</Text>
		</View>
	);
};

export default SearchList;

const styles = StyleSheet.create({
	noResultsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noResultsText: {
		fontSize: 18,
		color: "#555",
		fontFamily: "Poppins-Bold"
	},
});
