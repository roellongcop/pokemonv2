import {useEffect, useState} from "react";
import {ImageSourcePropType} from "react-native";
import {PokemonDetail} from "../types";

export function usePokemonImage(pokemon: PokemonDetail) {
  const [imageSource, setImageSource] = useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    setImageSource({uri: pokemon?.sprites.other.home.front_default})
  }, [pokemon?.sprites.other.home.front_default]);

  return imageSource;
}