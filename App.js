import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  const fetch_Product_App = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category/smartphones"
      );
      setData(response?.data?.products);
    } catch (error) {
      console.error(error, "This is error");
    }
  };

  useEffect(() => {
    fetch_Product_App();
  }, []);

  const render_Smart_Phone = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image style={styles.productImage} source={{ uri: item?.images[0] }} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.brand}>Brand: {item?.brand}</Text>
          <Text style={styles.price}>${item?.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={render_Smart_Phone}
        keyExtractor={(item) => item?.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginVertical:20

  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: "row",
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  brand: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#009688",
  },
});
