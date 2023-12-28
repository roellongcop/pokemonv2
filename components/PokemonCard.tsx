import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {memo} from "react";
import {PokemonDetail, Stat} from "../types/pokemon";
import Skeleton from "./Skeleton";
import {useFetch} from "../hooks/useFetch";
import {getPokemonBackground} from "../utilities/getPokemonBackground";
import {useNavigation} from "@react-navigation/native";
import {Screens} from "../constants/screens";
import {NavigationType} from "../types/NavigationType";

interface Props {
  name: string;
}

function PokemonCard({name}: Props) {
  const navigation: NavigationType = useNavigation();
  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);

  function onPress() {
    navigation.navigate(Screens.Pokemon, {name: pokemon.name});
  }

  if (pokemon === null) return (
    <Skeleton show={true} style={[styles.skeletonStyle]}/>
  );

  const backgroundSource = getPokemonBackground(pokemon.types[0].type.name);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
            {pokemon.stats.map(({stat, base_stat}: Stat, index: number) => {
              if (stat.name === "special-attack") return;
              if (stat.name === "special-defense") return;
              return (
                <Text style={styles.stats} key={`pokemon-${pokemon.name}-stat-${index.toString()}`}>
                  {stat.name}: {base_stat}
                </Text>
              )
            })}
          </View>
          <View>
            <Image
              style={styles.image}
              source={{uri: pokemon.sprites.other.home.front_default}}
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