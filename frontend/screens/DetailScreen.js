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
  Radio,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";

const DetailScreen = ({ route, navigation }) => {
  const { id, nama, nohp, gender, jenjang, hobi, alamat, poto } = route.params;
  const [showModal, setShowModal] = useState(false);
  const tes = "jeka";

  const hapusOrang = () => {
    axios.delete(`http://192.168.43.197:5000/orang/${id}`);
    alert("Data terhapus");
    navigation.goBack();
  };

  const ModalUpdate = ({ name, jk, noHp, jenJang, hoBi, alaMat, gamBar }) => {
    const [nama, setNama] = useState(name);
    const [gender, setGender] = useState(jk);
    const [nohp, setNohp] = useState(noHp);
    const [jenjang, setJenjang] = useState(jenJang);
    const [hobi, setHobi] = useState([]);
    const [alamat, setAlamat] = useState(alaMat);
    const [image, setImage] = useState(null);

    const dataJenjang = [
      { key: "1", value: "SD" },
      { key: "2", value: "SMP" },
      { key: "3", value: "SMA" },
    ];
    const dataHobi = [
      { key: "1", value: "Membaca" },
      { key: "2", value: "Menulis" },
      { key: "3", value: "Menggambar" },
    ];

    const updateOrang = ({ navigation }) => {
      const fileName = image.uri.split("/").pop();
      const fileType = fileName.split(".").pop();
      const allHobi = hobi.toString();
      let formData = new FormData();
      if (!image) {
        alert("Image Harus di Upload");
      } else {
        formData.append("nama", nama);
        formData.append("nohp", nohp);
        formData.append("gender", gender);
        formData.append("jenjang", jenjang);
        formData.append("hobi", allHobi);
        formData.append("file", {
          uri: image.uri,
          name: fileName,
          type: "image/" + fileType,
        });
        formData.append("alamat", alamat);
      }
      fetch(`http://192.168.43.197:5000/orang/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      alert("Data telah update");
      setNama("");
      setGender("");
      setNohp("");
      setHobi([]);
      setJenjang("");
      setImage(null);
      setAlamat("");
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

    useEffect(() => {}, []);

    return (
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Update Siswa</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Nama Lengkap</FormControl.Label>
                <Input onChangeText={setNama} value={nama} />
              </FormControl>
              <FormControl>
                <FormControl.Label>No hp</FormControl.Label>
                <Input onChangeText={setNohp} value={nohp} />
              </FormControl>

              <FormControl>
                <FormControl.Label>Gender</FormControl.Label>
                <Radio.Group
                  name="myRadioGroup"
                  value={gender}
                  onChange={(nextValue) => {
                    setGender(nextValue);
                  }}
                >
                  <Radio value="Pria" my="1">
                    Pria
                  </Radio>
                  <Radio value="Wanita" my="1">
                    Wanita
                  </Radio>
                </Radio.Group>
              </FormControl>
              <FormControl>
                <FormControl.Label>Jenjang</FormControl.Label>
                <SelectList
                  setSelected={(val) => setJenjang(val)}
                  data={dataJenjang}
                  save="value"
                  defaultOption={dataJenjang.find(
                    ({ value }) => value == jenjang
                  )}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Hobi</FormControl.Label>
                <MultipleSelectList
                  setSelected={(val) => setHobi(val)}
                  data={dataHobi}
                  save="value"
                  onSelect={() => alert(hobi)}
                  label="Categories"
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Masukkan foto</FormControl.Label>
                <Button onPress={pickImage}>Pilih gambar</Button>
                {!image ? (
                  <Center mt="3">
                    <Image
                      source={{ uri: gamBar }}
                      style={{ width: 230, height: 200 }}
                    />
                  </Center>
                ) : (
                  <Center mt="3">
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 230, height: 200 }}
                    />
                  </Center>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>Alamat</FormControl.Label>
                <Input onChangeText={setAlamat} value={alamat} />
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
                <Heading size="xs" ml="-1">
                  Nama
                </Heading>
                <Heading size="sm" ml="-1" fontSize={18}>
                  {nama}
                </Heading>
                <Heading size="xs" ml="-1">
                  No Hp
                </Heading>
                <Heading size="sm" ml="-1" fontSize={18}>
                  {nohp}
                </Heading>
                <Heading size="xs" ml="-1">
                  Gender
                </Heading>
                <Heading size="sm" ml="-1" fontSize={18}>
                  {gender}
                </Heading>
                <Heading size="xs" ml="-1">
                  Jenjang
                </Heading>
                <Heading size="sm" ml="-1" fontSize={18}>
                  {jenjang}
                </Heading>
                <Heading size="xs" ml="-1">
                  Hobi
                </Heading>
                <Heading size="sm" ml="-1" fontSize={18}>
                  {hobi}
                </Heading>
                <Heading size="xs" ml="-1">
                  Alamat
                </Heading>
                <Heading size="sm" ml="-1" fontSize={18}>
                  {alamat}
                </Heading>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <ModalUpdate
          name={nama}
          jk={gender}
          noHp={nohp}
          alaMat={alamat}
          jenJang={jenjang}
          gamBar={poto}
        />
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
