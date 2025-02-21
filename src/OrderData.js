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

const OrderData = () => {
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, [order]);

  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?sort=${order}`
      );
      const data = await response.json();
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
      <Picker selectedValue={order} onValueChange={(value) => setOrder(value)}>
        <Picker.Item label="Price Low to High" value="asc" />
        <Picker.Item label="Price High to Low" value="desc" />
      </Picker>
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

export default OrderData;
