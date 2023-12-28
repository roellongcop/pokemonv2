import {BaseType, PokemonList} from "../types";
import {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, View} from "react-native";
import PokemonCard from "../components/PokemonCard";
import {Screens} from "../constants/screens";
import {useFetch} from "../hooks/useFetch";
import {get} from "../utilities/api";

function Pokemons({navigation}) {
  const {data} = useFetch<PokemonList>('pokemon');
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);
  const renderFooter = useCallback(() => {
    if (!pokemonList?.next) return;
    return (
      <View>
        <Button
          disabled={loadingMore}
          onPress={loadMore}
          title={"Load More"}
        />
      </View>
    );
  }, [loadingMore, pokemonList?.next]);
  const renderItem = ({item}: {item: BaseType}) => {
    return (
      <PokemonCard
        name={item.name}
        onClick={(name: string) => navigation.navigate(Screens.Pokemon, {name})}
      />
    )
  };

  useEffect(() => {
    if (!data) return;
    setPokemonList(data);
  }, [data]);

  async function loadMore() {
    if (!pokemonList?.next) return;
    setLoadingMore(true);
    const {count, next, previous, results} = await get<PokemonList>(pokemonList.next);
    setPokemonList((prev: PokemonList) => {
      const newData: BaseType[] = prev ? [...prev.results, ...results]: results;
      return {
        count,
        next,
        previous,
        results: newData
      }
    });
    setLoadingMore(false);
  }

  if (pokemonList === null) return (
    <View style={styles.container}>
      <ActivityIndicator/>
    </View>
  );

  return (
    <FlatList
      data={pokemonList.results}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={renderFooter}
    />
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

export default Pokemons;
