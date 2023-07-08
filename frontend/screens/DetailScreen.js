import { View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Box,
  AspectRatio,
  Center,
  Stack,
  Heading,
  Text,
  HStack,
  NativeBaseProvider,
  Flex,
  Modal,
  FormControl,
  Button,
  Input,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";

const DetailScreen = ({ route, navigation }) => {
  const { id, nama, provinsi, kota, poto } = route.params;
  const [showModal, setShowModal] = useState(false);

  const hapusOrang = () => {
    axios.delete(`http://192.168.100.138:5000/orang/${id}`);
    alert("Data terhapus");
    navigation.goBack();
  };

  const ModalUpdate = () => {
    const [nama, setNama] = useState("");
    const [prov, setProv] = useState([]);
    const [kota, setKota] = useState([]);
    const [selectProv, setSelectProv] = useState("");
    const [selectKota, setSelectKota] = useState("");
    const [image, setImage] = useState(null);

    const updateOrang = () => {
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
      fetch(`http://192.168.100.138:5000/orang/${id}`, {
        method: "PATCH",
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
            <Modal.Header>Update orang</Modal.Header>
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
                <Button onPress={updateOrang}>Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };

  return (
    <NativeBaseProvider>
      <View className="flex flex-1 justify-center items-center">
        <Box alignItems="center">
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: poto,
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {nama}
                </Heading>
                <Heading size="sm" ml="-1">
                  {provinsi}
                </Heading>
                <Heading size="xs" ml="-1">
                  {kota}
                </Heading>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <ModalUpdate />
        <View className="flex self-start flex-row w-20 justify-evenly mx-5 my-1">
          <TouchableOpacity onPress={hapusOrang}>
            <FontAwesome name="trash" size={32} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <FontAwesome name="pencil" size={32} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default DetailScreen;
