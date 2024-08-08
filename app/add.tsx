import { useState } from 'react';
import { Image, View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Person, persons, savePersonsToStorage } from "@/constants/Person";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router";

export default function Add() {
  const [image, setImage] = useState<any>(null);
  const [phone, setPhone] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const savePerson = () => {
    if (image && phone) {
      const person: Person = new Person(persons.length + 1, image, phone);
      persons.push(person);
      savePersonsToStorage();
      setImage(null);
      setPhone('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
      <View style={styles.textContainer}>
        <Link href="/(tabs)" asChild>
          <TouchableOpacity>
            <Entypo name="home" size={24} color="black" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.btn}>
            <Text style={styles.btnText}>SELECCIONA UNA IMAGEN</Text>
          </TouchableOpacity>
          {image && (
            <TouchableOpacity onPress={removeImage} style={styles.btn}>
              <Text style={styles.btnText}>ELIMINAR IMAGEN</Text>
            </TouchableOpacity>
          )}
        </View>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TextInput 
          style={styles.textInput} 
          placeholder='Type phone number' 
          value={phone}
          keyboardType='numeric'
          onChangeText={setPhone} 
        />
        {phone && <Text>{phone}</Text>}
        <TouchableOpacity onPress={savePerson} style={styles.btn}>
          <Text style={styles.btnText}>GUARDAR</Text>  
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textBold: {
    fontWeight: "900",
    fontSize: 18,
  },
  text: {
    color: "black",
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  textInput: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    color: "black",
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  flexContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
