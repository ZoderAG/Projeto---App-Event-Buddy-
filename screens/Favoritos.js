import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { firebase, firestore } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { homeStyles } from "../styles/styles";
import MapView, { Marker } from "react-native-maps";

export default function Favoritos() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore
      .collection("users")
      .doc(user.uid)
      .collection("favorites")
      .onSnapshot(
        snapshot => {
          const favs = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            const location = data.location;
            const parsedLocation =
              location && location.latitude && location.longitude
                ? location
                : location && location._lat && location._long
                  ? { latitude: location._lat, longitude: location._long }
                  : null;

            favs.push({ id: doc.id, ...data, location: parsedLocation });
          });
          setFavorites(favs);
          setLoading(false);
        },
        error => {
          console.log("Erro ao buscar favoritos:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user]);

  const openMap = location => {
    if (location && location.latitude && location.longitude) {
      setSelectedLocation(location);
      setModalVisible(true);
    } else {
      Alert.alert("Localização indisponível", "Este evento não possui coordenadas válidas.");
    }
  };

  const removeFavorite = eventId => {
    Alert.alert(
      "Remover Favorito",
      "Tem certeza que deseja remover este evento dos favoritos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore
                .collection("users")
                .doc(user.uid)
                .collection("favorites")
                .doc(eventId)
                .delete();

              await firestore
                .collection("Events")
                .doc(eventId)
                .update({
                  favorites: firebase.firestore.FieldValue.arrayRemove(user.uid),
                });

              setFavorites(prev => prev.filter(event => event.id !== eventId));
              console.log("Evento removido dos favoritos.");
            } catch (error) {
              console.log("Erro ao remover favorito:", error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={homeStyles.container}>
        <Text>Carregando favoritos...</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={homeStyles.container}>
        <Text>Nenhum favorito ainda.</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Meus Favoritos</Text>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1 }}>
          {selectedLocation && (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={selectedLocation} title="Local do Evento" />
            </MapView>
          )}
          <Button title="Fechar Mapa" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={homeStyles.card}>
            <TouchableOpacity onPress={() => openMap(item.location)}>
              <Image source={{ uri: item.imageUrl }} style={homeStyles.image} />
            </TouchableOpacity>

            <Text style={homeStyles.eventTitle}>{item.title}</Text>
            <Text>{new Date(item.datetime).toLocaleString()}</Text>

            {item.location?.latitude && item.location?.longitude && (
              <Text>
                Coordenadas: {item.location.latitude.toFixed(5)}, {item.location.longitude.toFixed(5)}
              </Text>
            )}

            <Button
              title="Remover dos Favoritos"
              color="#FF3B30"
              onPress={() => removeFavorite(item.id)}
            />
          </View>
        )}
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
