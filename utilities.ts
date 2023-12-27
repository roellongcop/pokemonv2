import normal from "assets/normal.png";
import water from "assets/water.png";
import fighting from "assets/fighting.png";
import fire from "assets/fire.png";
import grass from "assets/grass.png";
import bug from "assets/bug.png";

export function getPokemonBackground(type: string) {
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