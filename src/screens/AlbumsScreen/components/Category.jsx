import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import Card from "./Card";
import generateEmoji from "../../../utils/emoticanGenerator";
import { fonts } from "../../../constants/fonts";
import { colors } from "../../../constants/colors";

const Category = ({ categoryName, categoryData }) => {
	const transformedData = useMemo(
		() => categoryData.map((item, index) => ({ ...item, index })),
		[categoryData]
	);

	const emoji = useMemo(() => generateEmoji(), []);

	const renderCard = useCallback(({ item }) => <Card albumData={item} index={item.index} />, []);

	return (
		<View style={styles.container}>
			<Text style={styles.categoryTitle}>{categoryName} {emoji}</Text>
			<MasonryList
				data={transformedData}
				keyExtractor={(item) => item.id.toString()}
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
		paddingHorizontal: 5,
		overflow: 'hidden',
		borderBottomWidth: 6,
		borderBottomColor: 'gray',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		paddingBottom: 20
	},
	categoryTitle: {
		color: colors.categoryColorPrimary,
		fontSize: 26,
		fontFamily: fonts.poppinsSecondary,
		textAlign: "left",
		marginHorizontal: 10,
		marginTop: 20,
	},
});
