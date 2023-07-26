import {
  NativeBaseProvider,
  Center,
  Box,
  HStack,
  VStack,
  Avatar,
  Text,
} from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ListOrang = ({ navigation }) => {
  const [orang, setOrang] = useState([]);
  const getOrang = async () => {
    try {
      const response = await axios.get("http://192.168.43.197:5000/orang");
      setOrang(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrang();
  }, [orang]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detail", {
          id: item.id,
          nama: item.nama,
          nohp: item.no_hp,
          gender: item.gender,
          jenjang: item.jenjang,
          hobi: item.hobi,
          poto: item.url,
          alamat: item.alamat,
        })
      }
    >
      <Box
        borderWidth="1"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="muted.800"
        pl={["2", "4"]}
        pr={["2", "5"]}
        py="2"
        borderRadius="md"
        mb="3"
      >
        <HStack>
          <VStack marginRight="4">
            <Avatar
              bg="green.500"
              source={{
                uri: item.url,
              }}
            >
              AJ
            </Avatar>
          </VStack>

          <Text
            fontSize="md"
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            alignSelf="center"
          >
            {item.nama}
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <NativeBaseProvider>
      <Center>
        <Box w="80%" mt="3">
          <FlatList
            data={orang}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ListOrang;
