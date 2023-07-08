import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Album = ({ navigation }) => {
  const [orang, setOrang] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    getOrang();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detail", {
          id: item.id,
          nama: item.nama,
          provinsi: item.provinsi,
          kota: item.kota,
          poto: item.url,
        })
      }
    >
      <Image
        source={{ uri: item.url }}
        style={{ margin: 10 }}
        className="rounded-md w-40 h-48"
      />
    </TouchableOpacity>
  );

  const getOrang = async () => {
    try {
      const response = await axios.get("http://192.168.100.138:5000/orang");
      setOrang(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <FlatList
        data={orang}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
  );
};

export default Album;
