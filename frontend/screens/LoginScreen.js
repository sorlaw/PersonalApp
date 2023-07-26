import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Center,
  VStack,
  FormControl,
  HStack,
  NativeBaseProvider,
} from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const storeData = async (usr, psw) => {
    try {
      await AsyncStorage.setItem("username", usr);
      await AsyncStorage.setItem("password", psw);
    } catch (err) {
      console.log(err.message);
    }
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post(
        `http://192.168.43.197:5000/api/data/user`,
        {
          username,
          password,
        }
      );
      if (!response.data) {
        alert("Maaf User tidak ditemukan silahkan daftar terlebih dahulu");
      } else {
        navigation.navigate("Home");
        storeData(username, password);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex items-center justify-center bg-white w-screen h-screen">
      <View>
        <Image source={require("../img/user.png")} className="w-32 h-32" />
      </View>

      <View className="w-52 h-80 ">
        <NativeBaseProvider>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input value={username} onChangeText={setUsername} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                  />
                </FormControl>
                <Button mt="2" colorScheme="indigo" onPress={checkLogin}>
                  Sign in
                </Button>

                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    I'm a new user.
                  </Text>
                </HStack>
                <Button
                  mt="2"
                  colorScheme="teal"
                  onPress={() => navigation.navigate("Daftar")}
                >
                  Sign up
                </Button>
              </VStack>
            </Box>
          </Center>
        </NativeBaseProvider>
      </View>
    </View>
  );
};

export default HomeScreen;
