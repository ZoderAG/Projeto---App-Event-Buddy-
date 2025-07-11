import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import firebase from "firebase";
import { firestore } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { homeStyles } from "../styles/styles";
import MapView, { Marker } from "react-native-maps";

export default function Home() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("Events")
      .orderBy("datetime")
      .onSnapshot(
        (snapshot) => {
          const eventsData = snapshot.docs.map((doc) => {
            const data = doc.data();
            const location = data.location;
            const parsedLocation =
              location?.latitude && location?.longitude
                ? location
                : location?._lat && location?._long
                ? { latitude: location._lat, longitude: location._long }
                : null;

            return { id: doc.id, ...data, location: parsedLocation };
          });

          setEvents(eventsData);
          setLoading(false);
        },
        (error) => {
          console.log("Erro ao buscar eventos:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const openMap = (location) => {
    if (location?.latitude && location?.longitude) {
      setSelectedLocation(location);
      setModalVisible(true);
    } else {
      Alert.alert("Localização indisponível", "Este evento não possui coordenadas válidas.");
    }
  };

  const handleParticipation = async (event, isParticipating) => {
    try {
      const eventRef = firestore.collection("Events").doc(event.id);
      const participantRef = firestore
        .collection("users")
        .doc(user.uid)
        .collection("participants")
        .doc(event.id);

      if (isParticipating) {
        await eventRef.update({
          participants: firebase.firestore.FieldValue.arrayRemove(user.uid),
        });
        await participantRef.delete();
      } else {
        await eventRef.update({
          participants: firebase.firestore.FieldValue.arrayUnion(user.uid),
        });
        await participantRef.set(event);
      }
    } catch (error) {
      console.error("Erro ao atualizar participação:", error);
    }
  };

  const participate = (event) => {
    const isParticipating = event.participants?.includes(user.uid) ?? false;

    Alert.alert(
      "Confirmação",
      isParticipating
        ? "Deseja cancelar a participação?"
        : "Deseja participar neste evento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: isParticipating ? "Desistir" : "Participar",
          style: isParticipating ? "destructive" : "default",
          onPress: () => handleParticipation(event, isParticipating),
        },
      ]
    );
  };

  const toggleFavorite = async (event) => {
    const isFavorite = event.favorites?.includes(user.uid) ?? false;
    const eventRef = firestore.collection("Events").doc(event.id);
    const favoriteRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("favorites")
      .doc(event.id);

    try {
      if (isFavorite) {
        Alert.alert("Remover Favorito", "Deseja remover este evento dos favoritos?", [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Remover",
            onPress: async () => {
              await eventRef.update({
                favorites: firebase.firestore.FieldValue.arrayRemove(user.uid),
              });
              await favoriteRef.delete();
            },
            style: "destructive",
          },
        ]);
      } else {
        await eventRef.update({
          favorites: firebase.firestore.FieldValue.arrayUnion(user.uid),
        });
        await favoriteRef.set(event);
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  if (loading) {
    return (
      <View style={homeStyles.container}>
        <Text>A carregar eventos...</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Eventos</Text>

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
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isParticipating = item.participants?.includes(user?.uid);
          const isFavorite = item.favorites?.includes(user?.uid);

          return (
            <View style={homeStyles.card}>
              <TouchableOpacity onPress={() => openMap(item.location)}>
                <Image source={{ uri: item.imageUrl }} style={homeStyles.image} resizeMode="cover" />
              </TouchableOpacity>

              <Text style={homeStyles.eventTitle}>{item.title}</Text>
              <Text>{new Date(item.datetime).toLocaleString()}</Text>

              {item.location?.latitude && item.location?.longitude && (
                <Text>
                  Coordenadas: {item.location.latitude.toFixed(5)}, {item.location.longitude.toFixed(5)}
                </Text>
              )}

              <Text>Participantes: {item.participants?.length ?? 0}</Text>

              <Button
                title={isParticipating ? "Cancelar Participação" : "Participar"}
                color={isParticipating ? "#FF3B30" : "#0A84FF"}
                onPress={() => participate(item)}
              />

              <Button
                title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                color={isFavorite ? "#FF3B30" : "#0A84FF"}
                onPress={() => toggleFavorite(item)}
              />
            </View>
          );
        }}
      />

      <Button title="Logout" onPress={logout} />
    </View>
  );
}
