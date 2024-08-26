import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import ServiceProvider from '../../libs/APIParser';
import Feather from "react-native-vector-icons/Feather";

const AlbumsScreen = () => {
	const serviceProvider = new ServiceProvider();
	const [albumData, setAlbumData] = useState(null);
	const handleSearch = () => {}
	const handleDashboard = () => {}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await serviceProvider.getLaunchData();
				setAlbumData(data);
			} catch (error) {
				console.error('Error fetching album data:', error);
			}
		};

		fetchData();
	}, []);

	const categories = albumData ? Object.keys(albumData.modules).map((key) => ({
		id: key,
		title: albumData.modules[key].title,
		data: albumData[albumData.modules[key].source],
	})) : [];

	return (
		<View style={styles.container}>
			<View style={styles.searchInput}>
				<TouchableOpacity onPress={handleDashboard}>
					<Feather name="menu" size={25} color="black" />
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSearch}>
					<Feather name="search" size={25} color="black" />
				</TouchableOpacity>
			</View>
			<FlatList
				data={categories}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Category
						categoryName={item.title}
						categoryData={item.data}
					/>
				)}
				style={styles.albumsContainer}
			/>
		</View>
	);
};

export default AlbumsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	searchInput: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 15,
		justifyContent: 'space-between',
	},

	albumsContainer: {
		flex: 1,
	},
});
