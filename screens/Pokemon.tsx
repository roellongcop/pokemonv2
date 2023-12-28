import {Image, StyleSheet, Text, View} from "react-native";
import Skeleton from "../components/Skeleton";
import {PokemonDetail} from "../types";
import {useFetch} from "../hooks/useFetch";
import {usePokemonImage} from "../hooks/usePokemonImage";
import {usePokemonBackground} from "../hooks/usePokemonBackground";

interface Props {
  name: string;
}

function Pokemon({route}) {
  const {name} = route.params satisfies Props;
  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);
  const imageSource = usePokemonImage(pokemon);
  const backgroundSource = usePokemonBackground(pokemon);

  if (pokemon === null) return (
    <Skeleton/>
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={backgroundSource}
      />
      <Image
        style={styles.image}
        source={imageSource}
      />
      <Text>{pokemon.name}</Text>
      <Text >{pokemon.types[0].type.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
  imageBackground: {
    alignSelf: "flex-start",
    width: "100%",
    resizeMode: "contain"
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default Pokemon;