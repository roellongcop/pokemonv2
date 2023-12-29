import {Image, ImageBackground, StyleSheet, View} from "react-native";
import Skeleton from "../components/Skeleton";
import {PokemonDetail} from "../types/pokemon";
import {useFetch} from "../hooks/useFetch";
import {getPokemonBackground} from "../utilities/getPokemonBackground";
import {useEffect} from "react";
import {NavigationType} from "../types/NavigationType";
import {useNavigation} from "@react-navigation/native";

interface Props {
  name: string;
}

function Pokemon({name}: Props) {
  const navigation: NavigationType = useNavigation();
  const {data: pokemon} = useFetch<PokemonDetail>(`pokemon/${name}`);

  useEffect(() => {
    navigation.setOptions({headerTitle: name});
  }, [navigation]);

  if (pokemon === null) return (
    <Skeleton/>
  );

  const backgroundSource = getPokemonBackground(pokemon.types[0].type.name);
  const gallery: string[] = [
    pokemon.sprites.other.dream_world.front_default,
    pokemon.sprites.other.dream_world.front_female,
    pokemon.sprites.other.home.front_female,
    pokemon.sprites.other.home.front_shiny,
    pokemon.sprites.other.home.front_shiny_female,
    pokemon.sprites.other["official-artwork"].front_default,
    pokemon.sprites.other["official-artwork"].front_shiny,
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundSource}
        resizeMode="cover"
        style={styles.imageBackground}
        imageStyle={styles.imageBackgroundImageStyle}
      >
      <View style={styles.mainImageContainer}>
        <Image
          style={styles.image}
          source={{uri: pokemon.sprites.other.home.front_default}}
        />
      </View>
      </ImageBackground>
      <View style={styles.galleryContainer}>
        {gallery.map((uri: string, index: number) => uri && uri.endsWith('.png') && (
          <Image
            key={`pokemon-${pokemon.name}-galley-${index.toString()}`}
            style={styles.gallery}
            source={{uri}}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    display: "flex",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100
  },
  gallery: {
    width: 100,
    height: 100
  },
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
  imageBackgroundImageStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageBackground: {
    width: "100%",
    height: 200,
  },
  image: {
    marginTop: "5%",
    width: 250,
    height: 250,
  },
});

export default Pokemon;