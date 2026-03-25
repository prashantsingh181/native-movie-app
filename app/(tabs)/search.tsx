import AppLayout from "@/components/app-layout";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFetch";
import apiService from "@/services/api/apiService";
import React, { useEffect, useRef, useState } from "react";
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
  const debounceRef = useRef<number | null>(null);
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
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (searchTerm.trim()) {
      debounceRef.current = setTimeout(() => {
        refetchMovies();
      }, 500);
    } else {
      reset();
    }
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

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
