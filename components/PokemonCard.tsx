import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {memo} from "react";
import {PokemonDetail, Stat} from "../types";
import Skeleton from "./Skeleton";
import {useFetch} from "../hooks/useFetch";
import {usePokemonImage} from "../hooks/usePokemonImage";
import {usePokemonBackground} from "../hooks/usePokemonBackground";

interface Props {
  name: string;
  onClick: (name: string) => void;
}

function PokemonCard({name, onClick}: Props) {
  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);
  const imageSource = usePokemonImage(pokemon);
  const backgroundSource = usePokemonBackground(pokemon);
  const renderStats = ({item}: {item: Stat}) => {
    if (item.stat.name === "special-attack") return;
    if (item.stat.name === "special-defense") return;
    return (
      <Text style={styles.stats}>
        {item.stat.name}: {item.base_stat}
      </Text>
    )
  };

  if (pokemon === null) return (
    <Skeleton show={true} style={[styles.skeletonStyle]}/>
  );

  return (
    <TouchableOpacity style={styles.container} onPress={() => onClick(pokemon.name)}>
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
            <FlatList
              data={pokemon.stats}
              renderItem={renderStats}
              keyExtractor={(_, index) => `pokemon-stat-${index.toString()}`}
            />
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
    marginVertical: 5,
    height: 112,
    borderRadius: 10,
    justifyContent: "center",
    width: "48%",
    marginHorizontal: "1%"
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
    width: "48%",
    height: 130,
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

export default memo(PokemonCard);