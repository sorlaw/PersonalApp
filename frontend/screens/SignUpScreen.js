import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Center,
  VStack,
  FormControl,
  Link,
  HStack,
  NativeBaseProvider,
} from "native-base";
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async () => {
    try {
      await axios.post(`http://192.168.43.197:5000/api/data/adduser`, {
        nama,
        username,
        password,
      });
      alert("data telah dimasukkan, silahkan login");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex items-center justify-center bg-white w-screen h-screen">
      <View className="w-52 h-80 ">
        <NativeBaseProvider>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Nama Lengkap</FormControl.Label>
                  <Input onChangeText={setNama} value={nama} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input onChangeText={setUsername} value={username} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type="password"
                    onChangeText={setPassword}
                    value={password}
                  />
                </FormControl>
                <Button mt="2" colorScheme="light" onPress={addUser}>
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

export default SignUpScreen;
