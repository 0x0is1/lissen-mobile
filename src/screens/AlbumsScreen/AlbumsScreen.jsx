import { StyleSheet, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import ServiceProvider from '../../libs/APIParser';
import Navbar from './components/Navbar';

const AlbumsScreen = () => {
	const serviceProvider = new ServiceProvider();
	const [albumData, setAlbumData] = useState(null);

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
			{/* <Navbar /> */}
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

	albumsContainer: {
		flex: 1,
	},
});
