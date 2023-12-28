import {Image, StyleSheet, Text, View} from "react-native";
import Skeleton from "../components/Skeleton";
import {PokemonDetail} from "../types/pokemon";
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
      <View style={styles.mainImageContainer}>
        <Image
          style={styles.image}
          source={imageSource}
        />
      </View>
      <Text>{pokemon.name}</Text>
      <Text >{pokemon.types[0].type.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    resizeMode: "cover",
    height: "25%",
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    marginTop: "5%",
    width: 250,
    height: 250,
  },
});

export default Pokemon;