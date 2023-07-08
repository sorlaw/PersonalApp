import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Input,
  Text,
  NativeBaseProvider,
  Box,
  VStack,
  HStack,
  Avatar,
  Center,
  Modal,
  FormControl,
  Button,
  ScrollView,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { debounce } from "lodash";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ListOrang from "../tabs/ListOrang";
import Profile from "../tabs/Profile";
import Album from "../tabs/Album";

const Tab = createMaterialTopTabNavigator();
const botTab = createMaterialBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [orang, setOrang] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [cariOrang, setCariOrang] = useState();

  const findOrang = async (val) => {
    try {
      const response = await axios.get(
        `http://192.168.100.138:5000/orang/api/${val}`
      );
      setCariOrang(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = debounce((text) => {
    findOrang(text);
  }, 500);

  const handleChange = (text) => {
    setSearch(text);
    handleSearch(text);
  };

  useEffect(() => {
    getOrang();
  }, []);

  const getOrang = async () => {
    try {
      const response = await axios.get("http://192.168.100.138:5000/orang");
      setOrang(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

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

  const ModalAdd = () => {
    const [nama, setNama] = useState("");
    const [prov, setProv] = useState([]);
    const [kota, setKota] = useState([]);
    const [selectProv, setSelectProv] = useState("");
    const [selectKota, setSelectKota] = useState("");
    const [image, setImage] = useState(null);

    const saveOrang = () => {
      const fileName = image.uri.split("/").pop();
      const fileType = fileName.split(".").pop();
      let formData = new FormData();
      if (!image) {
        alert("Image Harus di Upload");
      } else {
        formData.append("nama", nama);
        formData.append("provinsi", selectProv);
        formData.append("kota", selectKota);
        formData.append("file", {
          uri: image.uri,
          name: fileName,
          type: "image/" + fileType,
        });
      }
      fetch("http://192.168.100.138:5000/orang", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      alert("Data telah dimasukkan");
      setNama("");
      setSelectProv("");
      setSelectKota("");
      setImage(null);
    };

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [2, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    };

    useEffect(() => {
      fetchProv();
      if (selectProv != "") {
        fetchKota(selectProv);
      }
    }, [selectProv]);

    const fetchProv = async () => {
      try {
        const response = await axios.get(
          "https://sorlaw.github.io/api-wilayah-indonesia/api/provinces.json"
        );
        setProv(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchKota = async (id) => {
      try {
        const response = await axios.get(
          `https://sorlaw.github.io/api-wilayah-indonesia/api/regencies/${id}.json`
        );
        setKota(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const dataProv = prov.map((item) => {
      return {
        key: item.id,
        value: item.name,
      };
    });
    const dataKota = kota.map((item) => {
      return {
        key: item.id,
        value: item.name,
      };
    });

    return (
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Tambah orang</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Nama Lengkap</FormControl.Label>
                <Input onChangeText={setNama} />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Provinsi</FormControl.Label>
                <SelectList
                  setSelected={(val) => setSelectProv(val)}
                  data={dataProv}
                  save="key"
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Kota</FormControl.Label>
                <SelectList
                  setSelected={(val) => setSelectKota(val)}
                  data={dataKota}
                  save="value"
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Masukkan foto</FormControl.Label>
                <Button onPress={pickImage}>Pilih gambar</Button>
                {image && (
                  <Center mt="3">
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 230, height: 200 }}
                    />
                  </Center>
                )}
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onPress={saveOrang}>Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };

  const renderOrang = ({ item }) => (
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
      <Center>
        <Box
          borderWidth="1"
          _dark={{
            borderColor: "muted.50",
          }}
          borderColor="muted.800"
          py="2"
          borderRadius="md"
          mt="3"
          pl="2"
          w="70%"
        >
          <HStack>
            <VStack marginRight="4">
              <Avatar
                bg="green.500"
                source={{
                  uri: item.url,
                }}
                size="sm"
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
      </Center>
    </TouchableOpacity>
  );

  return (
    <NativeBaseProvider>
      <Box alignItems="center">
        <Input
          mt="12"
          placeholder="Cari berdasarkan nama"
          placeholderTextColor="black"
          w="80%"
          size="md"
          focusOutlineColor="black"
          style={[styles.input, isFocused && styles.inputFocused]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChange}
          value={search}
        />
      </Box>
      {!cariOrang ? (
        ""
      ) : (
        <KeyboardAvoidingView>
          <FlatList
            data={cariOrang}
            renderItem={renderOrang}
            keyExtractor={(item) => item.id}
            style={{ width: "100%" }}
          />
        </KeyboardAvoidingView>
      )}
      <TouchableOpacity
        className="mx-9 my-1"
        onPress={() => setShowModal(true)}
      >
        <FontAwesome name="plus-square-o" size={40} color="green" />
      </TouchableOpacity>

      <ModalAdd />

      <Tab.Navigator screenOptions={{ tabBarScrollEnabled: true }}>
        <Tab.Screen name="ListOrang" component={ListOrang} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Album" component={Album} />
      </Tab.Navigator>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
  },
  inputFocused: {
    backgroundColor: "skyblue",
    color: "white",
  },
});

export default HomeScreen;
