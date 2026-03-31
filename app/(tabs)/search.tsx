import AppLayout from "@/components/app-layout";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { colors, icons } from "@/constants";
import useFetch from "@/hooks/useFetch";
import apiService from "@/services/api/apiService";
import { updateSearchTerm } from "@/services/api/appwrite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset,
  } = useFetch(
    () => apiService.fetchMovies({ query: searchTerm.trim() }),
    false,
  );

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchTerm.trim()) {
        await refetchMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    if (movies && movies[0]) {
      updateSearchTerm(searchTerm, movies[0]);
    }
  }, [movies]);

  return (
    <AppLayout>
      <View>
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
            marginBlock: 10,
          }}
          style={styles.moviesList}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <>
              <View style={styles.logoContainer}>
                <Image source={icons.logo} style={styles.logo} />
              </View>
              <View style={styles.searchBarContainer}>
                <SearchBar
                  placeholder="Search for movies..."
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </View>
              {moviesLoading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={{ marginBlock: 12 }}
                />
              )}
              {moviesError && (
                <Text
                  style={{
                    color: "rgb(239, 68, 68)",
                    marginBlock: 12,
                    paddingInline: 20,
                  }}
                >
                  Error loading movies: {moviesError.message}
                </Text>
              )}

              {!moviesLoading &&
                !moviesError &&
                !!searchTerm.trim() &&
                movies &&
                movies.length > 0 && (
                  <Text style={styles.searchText}>
                    Search Results for{" "}
                    <Text style={styles.searchTerm}>{searchTerm}</Text>
                  </Text>
                )}
            </>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchTerm.trim()
                    ? "No movies found matching your search."
                    : "Start typing to search for movies."}
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </AppLayout>
  );
};

export default Search;

const styles = StyleSheet.create({
  moviesList: {
    paddingInline: 20,
    marginBottom: 100,
  },
  logoContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 80,
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 40,
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  searchBarContainer: {
    marginBlock: 20,
  },

  searchText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  searchTerm: {
    color: colors.accent,
  },
  emptyContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: "center",
    color: colors.light[300],
  },
});
