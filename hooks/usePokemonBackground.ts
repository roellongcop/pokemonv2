import {useEffect, useState} from "react";
import {ImageSourcePropType} from "react-native";
import {PokemonDetail} from "../types";
import normal from "assets/normal.png";
import fighting from "assets/fighting.png";
import water from "assets/water.png";
import fire from "assets/fire.png";
import grass from "assets/grass.png";
import bug from "assets/bug.png";

export function usePokemonBackground(pokemon: PokemonDetail) {
  const [backgroundSource, setBackgroundSource] = useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    if (!pokemon) return;
    const background = getPokemonBackground(pokemon.types[0].type.name);
    setBackgroundSource(background);
  }, [pokemon?.types[0].type.name]);

  function getPokemonBackground(type: string) {
    switch (type) {
      case "normal":
        return normal;
      case "fighting":
      case "ghost":
      case "unknown":
        return fighting;
      case "water":
      case "flying":
      case "electric":
      case "ice":
        return water;
      case "fire":
      case "steel":
      case "dragon":
        return fire;
      case "grass":
      case "psychic":
      case "fairy":
        return grass;
      case "bug":
      case "poison":
      case "ground":
      case "rock":
      case "shadow":
      case "dark":
        return bug;
      default:
        return water;
    }
  }

  return backgroundSource;
}