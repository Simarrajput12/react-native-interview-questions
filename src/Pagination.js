//Implenented Pagination and Lazy Loading

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

// const url = "https://jsonplaceholder.typicode.com/photos?_limit=50&_page";

const Pagination = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage();
  }, [page]);

  const fetchImage = async () => {
    try {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=50&_page=${page}`
      );
      const imagesData = await data.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...imagesData]);
      console.log("Image Data", imagesData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", false);
      setLoading(false);
    }
  };

  const loadMorePhotos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="blue" /> */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              <Text>{item.title}</Text>
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={{ height: 100, width: 100 }}
              />
            </>
          )}
          onEndReached={loadMorePhotos}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Pagination;
