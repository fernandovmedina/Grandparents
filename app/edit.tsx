import { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Person, persons, savePersonsToStorage } from '@/constants/Person';

export default function Edit() {
  const route = useRoute();
  const navigation = useNavigation();
  const { person } = route.params as { person: Person };

  const [image, setImage] = useState<string>(person.src);
  const [phone, setPhone] = useState<string>(person.phone);

  const updatePerson = () => {
    const index = persons.findIndex(p => p.id === person.id);
    if (index !== -1) {
      persons[index].src = image;
      persons[index].phone = phone;
      savePersonsToStorage();
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TextInput
          style={styles.textInput}
          placeholder='Image URL'
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Type phone number'
          value={phone}
          keyboardType='numeric'
          onChangeText={setPhone}
        />
        <TouchableOpacity onPress={updatePerson} style={styles.btn}>
          <Text style={styles.btnText}>ACTUALIZAR</Text>
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
  form: {
    width: '80%',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
});
