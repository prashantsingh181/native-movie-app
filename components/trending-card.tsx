import { colors, images } from "@/constants";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

export default function TrendingCard({ movie, index }: TrendingCardProps) {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity style={styles.cardContainer}>
        <Image
          source={{ uri: movie.poster_url }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.rankContainer}>
          <MaskedView
            maskElement={<Text style={styles.rank}>{index + 1}</Text>}
          >
            <Image
              source={images.rankingGradient}
              style={{ height: 56, width: 56 }}
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 140,
    position: "relative",
    paddingLeft: 20,
  },
  image: {
    width: 140,
    height: 210,
    borderRadius: 8,
  },
  rankContainer: {
    position: "absolute",
    bottom: 36,
    left: -10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: "50%",
  },
  rank: {
    fontWeight: "bold",
    color: "white",
    fontSize: 60,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.light[200],
    marginTop: 8,
  },
});
