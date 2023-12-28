import {useFetch} from "../hooks";
import {useEffect, useState} from "react";
import {Image, ImageBackground, ImageSourcePropType, StyleSheet, Text} from "react-native";
import Skeleton from "../components/Skeleton";
import {getPokemonBackground} from "../utilities";
import {PokemonDetail} from "../types";

interface Props {
  name: string;
}

function Pokemon({name}: Props) {
  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);
  const [imageSource, setImageSource] = useState<ImageSourcePropType | null>(null);
  const [backgroundSource, setBackgroundSource] = useState<ImageSourcePropType | null>(null);


  useEffect(() => {
    if (!pokemon) return;
    setImageSource({uri: pokemon.sprites.other.home.front_default})
  }, [pokemon?.sprites.other.home.front_default]);

  useEffect(() => {
    if (!pokemon) return;
    const background = getPokemonBackground(pokemon.types[0].type.name);
    setBackgroundSource(background);
  }, [pokemon?.types[0].type.name]);

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