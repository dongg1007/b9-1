import 'react-native-gesture-handler';
import React, { useState, createContext, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ---------------- CONTEXT ----------------
const AuthContext = createContext();

// ---------------- DATA (ẢNH) ----------------
const data = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1601924582975-7e6c1c4c6c5b'
  },
  {
    id: '2',
    name: 'Burger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349'
  },
  {
    id: '3',
    name: 'Steak',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092'
  }
];

// ---------------- LOGIN SCREEN ----------------
function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn(email, password)}
      >
        <Text style={{ color: '#fff' }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------- HOME (EXPLORER) ----------------
function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={styles.foodName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

// ---------------- ACCOUNT SCREEN ----------------
function AccountScreen() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name}</Text>
      <Text>Mobile Developer</Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={{ color: '#fff' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------- NAVIGATION ----------------
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explorer" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// ---------------- APP ----------------
export default function App() {
  const [user, setUser] = useState(null);

  const authContext = {
    user,
    signIn: (email, password) => {
      setUser({ name: email }); // nhập gì hiện đó
    },
    signOut: () => setUser(null),
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user == null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Main" component={MainTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// ---------------- STYLE ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },

  // 👇 Explorer UI
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 18,
    marginTop: 5,
  },
});