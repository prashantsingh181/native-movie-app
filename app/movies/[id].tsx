import MovieInfo from "@/components/movie-info";
import { colors, icons } from "@/constants";
import useFetch from "@/hooks/useFetch";
import apiService from "@/services/api/apiService";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie } = useFetch(() =>
    apiService.fetchMovieDetails(id as string),
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            style={{ width: "100%", height: 500 }}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <View style={styles.dateRuntimeContainer}>
            <Text style={{ color: colors.light[200], fontSize: 14 }}>
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text style={{ color: colors.light[200], fontSize: 14 }}>
              {movie?.runtime}m
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={{ width: 16, height: 16 }} />
            <Text style={styles.rating}>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text style={{ color: colors.light[200], fontSize: 14 }}>
              ({movie?.vote_count} {movie?.vote_count === 1 ? "vote" : "votes"})
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((genre) => genre.name).join(" - ")}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <MovieInfo
              label="Budget"
              value={`$${Math.round((movie?.budget ?? 0) / 1000000)} M`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round((movie?.revenue ?? 0) / 1000000)} M`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies
              .map((company) => company.name)
              .join(" - ")}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <Image source={icons.arrow} style={styles.backImage} tintColor="#fff" />
        <Text style={styles.backText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: { color: "white", fontWeight: "bold", fontSize: 20 },
  dateRuntimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    columnGap: 4,
    marginTop: 8,
    borderRadius: 6,
  },
  rating: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },
  backImage: {
    height: 20,
    width: 20,
    marginTop: 2,
    marginRight: 4,
    transform: [{ rotate: "180deg" }],
  },
  backText: {
    color: "white",
    fontWeight: "semibold",
  },
});
