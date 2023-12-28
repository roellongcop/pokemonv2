import {Image, StyleSheet, Text, View} from "react-native";
import Skeleton from "../components/Skeleton";
import {PokemonDetail} from "../types/pokemon";
import {useFetch} from "../hooks/useFetch";
import {getPokemonBackground} from "../utilities/getPokemonBackground";
import {useEffect} from "react";

interface Props {
  name: string;
}

function Pokemon({route, navigation}) {
  const {name} = route.params satisfies Props;
  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);

  useEffect(() => {
    navigation.setOptions({headerTitle: name});
  }, [navigation]);

  if (pokemon === null) return (
    <Skeleton/>
  );

  const backgroundSource = getPokemonBackground(pokemon.types[0].type.name);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={backgroundSource}
      />
      <View style={styles.mainImageContainer}>
        <Image
          style={styles.image}
          source={{uri: pokemon.sprites.other.home.front_default}}
        />
      </View>
      <Text>{pokemon.name}</Text>
      <Text >{pokemon.types[0].type.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    resizeMode: "cover",
    height: "25%",
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    marginTop: "5%",
    width: 250,
    height: 250,
  },
});

export default Pokemon;