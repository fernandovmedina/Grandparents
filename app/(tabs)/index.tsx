import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Person, persons, savePersonsToStorage, loadPersonsFromStorage } from '@/constants/Person';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router";

export default function HomeScreen() {
  const [editingMode, setEditingMode] = useState(false);
  const [deletingMode, setDeletingMode] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadPersonsFromStorage();
  }, []);

  const makeCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const toggleEditingMode = () => {
    setEditingMode(prev => !prev);
    setDeletingMode(false);
  };

  const toggleDeletingMode = () => {
    setDeletingMode(prev => !prev);
    setEditingMode(false);
  };

  const deletePerson = (item: Person) => {
    const updatedPersons = persons.filter(person => person.id !== item.id);
    persons.length = 0;
    persons.push(...updatedPersons);
    savePersonsToStorage();
  };

  const editPerson = (item: Person) => {
    navigation.navigate('edit', { person: item });
  };

  const renderItem = ({ item }: { item: Person }) => (
    <View style={styles.personContainer}>
      {editingMode && (
        <TouchableOpacity style={styles.editButton} onPress={() => editPerson(item)}>
          <Text style={styles.editButtonText}>EDIT</Text>
        </TouchableOpacity>
      )}
      {deletingMode && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deletePerson(item)}>
          <Text style={styles.deleteButtonText}>DELETE</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.imageContainer} onPress={() => makeCall(item.phone)}>
        <Image source={{ uri: item.src }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );

  const numColumns = 3;

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
        <View style={styles.iconContainer}>
          <Link href="/add" asChild>
            <TouchableOpacity>
              <FontAwesome6 name="add" size={24} color="green" />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={toggleEditingMode}>
            <FontAwesome5 name="edit" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDeletingMode}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={persons}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatListContainer: {
    alignItems: 'center',
  },
  personContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 140,
    height: 140,
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 35,
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
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
});
