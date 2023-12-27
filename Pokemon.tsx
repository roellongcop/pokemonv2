import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {memo, useEffect, useState} from "react";
import useFetch from "./useFetch";
import {PokemonDetail, Stat} from "./types";
import Skeleton from "./Skeleton";

interface Props {
  name: string;
}

function Pokemon({name}: Props) {

  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(require("./assets/icon.png"));
  const [backgroundSource, setBackgroundSource] = useState<ImageSourcePropType>(require("./assets/water.png"));

  useEffect(() => {
    if (!pokemon) return;
    setImageSource({uri: pokemon.sprites.other.home.front_default})
  }, [pokemon?.sprites.other.home.front_default]);

  useEffect(() => {
    if (!pokemon) return;
    const type = pokemon.types[0].type.name;

    switch (type) {
      case "normal":
        setBackgroundSource(require("./assets/normal.png"));
        break;
      case "fighting":
      case "ghost":
      case "unknown":
        setBackgroundSource(require("./assets/fighting.png"));
        break;
      case "water":
      case "flying":
      case "electric":
      case "ice":
        setBackgroundSource(require("./assets/water.png"));
        break;
      case "fire":
      case "steel":
      case "dragon":
        setBackgroundSource(require("./assets/fire.png"));
        break;
      case "grass":
      case "psychic":
      case "fairy":
        setBackgroundSource(require("./assets/grass.png"));
        break;
      case "bug":
      case "poison":
      case "ground":
      case "rock":
      case "shadow":
      case "dark":
        setBackgroundSource(require("./assets/bug.png"));
        break;
      default:
        setBackgroundSource(require("./assets/water.png"));
        break;
    }
  }, [pokemon?.types[0].type.name]);

  if (pokemon === null) return (
    <Skeleton show={true} style={[styles.container, styles.skeletonStyle]}/>
  );

  const renderStats = ({stat, base_stat}: Stat, index: number) => {
    if (stat.name == "special-attack") return;
    if (stat.name == "special-defense") return;
    return (
      <Text key={index.toString()} style={styles.stats}>
        {stat.name}: {base_stat}
      </Text>
    );
  };

  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={backgroundSource}
        resizeMode="cover"
        style={styles.imageBackgroundStyle}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.headContainer}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View>
            {pokemon.stats.map((stat: Stat, index) => renderStats(stat, index))}
          </View>
          <View>
            <Image
              style={styles.image}
              source={imageSource}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  skeletonStyle: {
    marginBottom: 15,
    height: 112
  },
  imageStyle: {
    borderRadius: 10
  },
  imageBackgroundStyle: {
    padding: 5
  },
  image: {
    width: 80,
    height: 80,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: -3,
    width: "48%", // Adjust the width as needed
    height: 130, // Adjust the height as needed
  },
  headContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  type: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  stats: {
    fontSize: 11,
  },
});

export default memo(Pokemon)