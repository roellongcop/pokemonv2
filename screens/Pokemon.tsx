import {Image, ImageBackground, StyleSheet, Text} from "react-native";
import Skeleton from "../components/Skeleton";
import {PokemonDetail} from "../types";
import {useFetch} from "../hooks/useFetch";
import {usePokemonImage} from "../hooks/usePokemonImage";
import {usePokemonBackground} from "../hooks/usePokemonBackground";

interface Props {
  name: string;
}

function Pokemon({name}: Props) {
  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);
  const imageSource = usePokemonImage(pokemon);
  const backgroundSource = usePokemonBackground(pokemon);

  if (pokemon === null) return (
    <Skeleton show={true} style={{}}/>
  );

  return (
    <ImageBackground
      source={backgroundSource}
      resizeMode="cover"
    >
      <Image
        style={styles.image}
        source={imageSource}
      />
      <Text>{pokemon.name}</Text>
      <Text >{pokemon.types[0].type.name}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
});

export default Pokemon;