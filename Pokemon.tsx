import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {memo, useEffect, useState} from "react";
import {useFetch} from "./hooks";
import {PokemonDetail, Stat} from "./types";
import Skeleton from "./Skeleton";
import {getPokemonBackground} from "./utilities";

function Pokemon({name}: Pick<PokemonDetail, "name">) {
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