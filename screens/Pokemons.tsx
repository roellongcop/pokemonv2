import {get, useFetch} from "../hooks";
import {BaseType, PokemonList} from "../types";
import {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, View} from "react-native";
import MainContainer from "../components/MainContainer";
import PokemonCard from "../components/PokemonCard";

function Pokemons() {
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
  const renderItem = ({item, index}: {item: BaseType, index: number}) => {
    return <PokemonCard name={item.name} key={index.toString()} />;
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
    <MainContainer>
      <FlatList
        data={pokemonList.results}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={renderFooter}
      />
    </MainContainer>
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
