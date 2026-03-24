import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: Readonly<MovieCardProps>) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
        />
        <Text style={styles.cardTitle} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Image source={icons.star} style={styles.starIcon} />
          <Text style={styles.rating}>
            {Math.round(movie.vote_average / 2)}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{movie.release_date?.split("-")[0]}</Text>
          {/* <Text style={styles.movieText}>Movie</Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
const styles = StyleSheet.create({
  cardContainer: {
    width: "45%",
  },
  cardImage: {
    width: "100%",
    height: 208,
    borderRadius: 8,
    resizeMode: "cover",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  rating: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 12,
    color: colors.light[300],
    marginTop: 4,
    fontWeight: "medium",
  },
  movieText: {
    fontSize: 12,
    fontWeight: "medium",
    color: colors.light[300],
    textTransform: "uppercase",
  },
});
