// Fetching Products in Cart and Displayng Details
//Requirements:
// 1. Fetch Cart Data from Api.
// 2. Fetch Product deails using product id from the Cart API.

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Picker,
} from "react-native";

const CartApp = () => {
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, [order]);

  const fetchOrderData = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/2`);
      const data = await response.json();
      console.log("data>>>", data);
      //   const productRequest = data.p
      setProducts(data);
      console.log("Image Data", data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <Text>{item.title}</Text>
              <Text>{`Price${item.price}`}</Text>
            </>
          )}
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

export default CartApp;
