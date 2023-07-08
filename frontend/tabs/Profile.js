import { TouchableOpacity, View } from "react-native";
import {
  Box,
  VStack,
  Text,
  HStack,
  Center,
  Container,
  Stack,
} from "native-base";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getData = async () => {
    try {
      const usr = await AsyncStorage.getItem("username");
      const psw = await AsyncStorage.getItem("password");
      if (usr !== null && psw !== null) {
        setUsername(usr);
        setPassword(psw);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>{username}</Text>
    //   <Text>{password}</Text>
    // </View>

    <Stack mb="2.5" mt="40%" direction="column" space={3} alignSelf="center">
      <Center
        size="12"
        w="250"
        bg="#27374D"
        rounded="sm"
        _text={{
          color: "warmGray.50",
          fontWeight: "medium",
        }}
        shadow={"3"}
      >
        <Text color="white">Username : {username}</Text>
      </Center>

      <Center
        bg="#27374D"
        size="12"
        w="250"
        rounded="sm"
        _text={{
          color: "warmGray.50",
          fontWeight: "medium",
        }}
        shadow={"3"}
      >
        <Text color="white">Password : {password}</Text>
      </Center>
    </Stack>
  );
};

export default Profile;
