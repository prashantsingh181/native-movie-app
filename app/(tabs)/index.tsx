import AppLayout from "@/components/app-layout";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import TrendingCard from "@/components/trending-card";
import { icons } from "@/constants";
import useFetch from "@/hooks/useFetch";
import apiService from "@/services/api/apiService";
import { getTrendingMovies } from "@/services/api/appwrite";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => apiService.fetchMovies());

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  let content;
  if (moviesLoading || trendingMoviesLoading) {
    content = (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.activityIndicator}
      />
    );
  } else if (moviesError || trendingMoviesError) {
    content = (
      <Text
        style={{
          color: "rgb(239, 68, 68)",
          marginBlock: 12,
          paddingInline: 20,
        }}
      >
        Error: {moviesError?.message || trendingMoviesError?.message}
      </Text>
    );
  } else {
    content = (
      <View style={styles.moviesContainer}>
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for movies..."
          as="button"
        />
        {trendingMovies && trendingMovies.length > 0 && (
          <View style={styles.trendingMoviesContainer}>
            <Text style={styles.trendingMoviesTitle}>Trending Movies</Text>
            <FlatList
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
              keyExtractor={(item) => item.movie_id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        <>
          <Text style={styles.movieHeading}>Latest Movies</Text>
          <FlatList
            data={movies}
            renderItem={({ item: movie }) => <MovieCard movie={movie} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              gap: 20,
              marginBlock: 10,
            }}
            style={{ marginTop: 8, paddingBottom: 100 }}
            scrollEnabled={false}
          />
        </>
      </View>
    );
  }

  return (
    <AppLayout>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 40 }}
      >
        <Image source={icons.logo} style={styles.logo} />
        {content}
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 40,
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  activityIndicator: {
    marginTop: 40,
    alignSelf: "center",
  },
  trendingMoviesContainer: {
    marginTop: 40,
  },
  trendingMoviesTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "bold",
  },
  moviesContainer: {
    marginTop: 20,
    flex: 1,
  },
  movieHeading: {
    color: "white",
    fontSize: 18,
    lineHeight: 28,
    marginTop: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
});
