import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import useFetch from "./useFetch";
import Pokemon from "./Pokemon";
import {BaseType, PokemonList} from "./types";

export default function App() {
  const {data: pokemonList} = useFetch<PokemonList>('pokemon');

  if (pokemonList === null) return (
    <View style={styles.container}>
      <ActivityIndicator/>
    </View>
  );

  const renderItem = ({item, index}: {item: BaseType, index: number}) => {
    return <Pokemon name={item.name} key={index} />;
  };

  return (
    <SafeAreaView style={{paddingTop: 50, paddingHorizontal: 10}}>
      <FlatList
        data={pokemonList.results}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: "100%",
    padding: 10,
  },
});
