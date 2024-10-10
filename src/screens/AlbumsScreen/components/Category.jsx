import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import Card from "./Card";

const Category = ({ categoryName, categoryData }) => {
	categoryData = categoryData.map((item, index) => ({
		...item,
		index,
	}));
	const renderCard = ({ item }) => <Card albumData={item} index={item.index} />;

	return (
		<View style={styles.container}>
			<Text style={styles.categoryTitle}>{categoryName}</Text>
			<MasonryList
				data={categoryData}
				keyExtractor={(item) => item.id}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				renderItem={renderCard}
				onEndReachedThreshold={0.1}
			/>
		</View>
	);
};

export default Category;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
	},
	categoryTitle: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 5,
		textAlign: "center",
	},
});
