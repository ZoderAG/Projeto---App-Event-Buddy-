# 📱 Event Buddy

> Aplicação mobile multiplataforma feita em **React Native (Expo)** que permite explorar, guardar e participar em eventos locais.

## 📌 Objetivo

O projeto **Event Buddy** foi desenvolvido com o objetivo de criar uma aplicação intuitiva e funcional onde utilizadores podem:

- Explorar eventos locais (concertos, workshops, feiras, etc.)
- Visualizar os detalhes dos eventos
- Participar ou cancelar a participação em eventos
- Marcar eventos como favoritos
- Consultar perfil e eventos guardados
- Ver a localização no mapa interativo

---

## 🚀 Tecnologias e Ferramentas

- **React Native** (Expo)
- **Firebase Authentication** (login/registo)
- **Firebase Firestore** (dados dos eventos)
- **React Navigation** (Stack + Bottom Tabs)
- **Context API** (gestão de autenticação)
- **react-native-maps** (visualização no mapa)

---

## 📂 Estrutura de Pastas

.
├── App.js
├── MainTabs.js
├── firebaseConfig.js
├── context/
│ └── AuthContext.js
├── screens/
│ ├── Home.js
│ ├── Login.js
│ ├── Signup.js
│ ├── Favorites.js
│ └── Profile.js
├── styles/
│ ├── styles.js
│ └── appStyles.js
└── assets/


---

## 🔐 Funcionalidades de Autenticação

- Registo e login com e-mail e password
- Logout com limpeza de sessão
- Persistência de sessão automática via Firebase

---

## 📅 Funcionalidades Principais

### 🏠 Home
- Lista de eventos ordenada por data
- Cards com imagem, título, data e botão para ver detalhes

### 📄 Detalhes do Evento
- Imagem destacada, descrição, local, data
- Botões para **Participar/Cancelar** e **Favoritar/Remover**
- Número de participantes visível
- Abertura de mapa com a localização

### ⭐ Favoritos
- Lista personalizada de eventos guardados pelo utilizador autenticado

### 👤 Perfil
- Dados da conta (e-mail)
- Botão para logout

---

## 📡 Firestore Estrutura Recomendada

### events/
```json
eventId: {
  title: "Rock in Rio",
  description: "Festival de música em Lisboa.",
  datetime: "2025-07-21T19:00:00",
  location: {
    latitude: 38.790007,
    longitude: -9.094306
  },
  imageUrl: "https://...",
  participants: ["uid1", "uid2"],
  favorites: ["uid3"]
}

users/
uid1: {
  favorites: [eventId1, eventId3],
  participations: [eventId2]
}


