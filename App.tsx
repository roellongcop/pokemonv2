import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Pokemon from "./screens/Pokemon";
import Pokemons from "./screens/Pokemons";
import {Screens} from "./constants/screens";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.Pokemons}
          component={Pokemons}
          options={{title: 'Pokemon List'}}
        />
        <Stack.Screen name={Screens.Pokemon} component={Pokemon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;