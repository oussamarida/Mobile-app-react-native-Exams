import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './page/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashbord from './page/dashboard';
import Calendary from './page/calender';
import Scannercode from './page/test/scanner';
import Profile from './page/Profileupdate';
import Etudiant from './page/Etudiant';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home', headerShown: false}}          
        />
         <Stack.Screen
          name="Dashbord"
          component={Dashbord}
          options={{title: 'dashbord', headerShown: false}}          
        />
          <Stack.Screen
          name="Calendary"
          component={Calendary}
          options={{title: 'Calendar'}}          
        />
            <Stack.Screen
          name="Scannercode"
          component={Scannercode}
          options={{title: 'Scannercode'}}          
        />
          <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}          
        />
           <Stack.Screen
          name="Etudiant"
          component={Etudiant}
          options={{title: 'Etudiant'}}          
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
