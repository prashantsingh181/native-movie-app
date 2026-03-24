import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import apiService from "@/services/api/apiService";
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
  console.log("Movies data:", movies);
  console.log("Movies loading:", moviesLoading);

  let content;
  if (moviesLoading) {
    content = (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.activityIndicator}
      />
    );
  } else if (moviesError) {
    content = <Text>Error: {moviesError.message}</Text>;
  } else {
    content = (
      <View style={styles.moviesContainer}>
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for movies..."
          as="button"
        />
        <>
          <Text style={styles.movieHeading}>Latest Movies</Text>
          <FlatList
            data={movies}
            renderItem={({ item: movie }) => <MovieCard movie={movie} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            style={{ marginTop: 8, paddingBottom: 128 }}
            scrollEnabled={false}
          />
        </>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.image} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 40 }}
      >
        <Image source={icons.logo} style={styles.logo} />
        {content}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  image: {
    position: "absolute",
    width: "100%",
  },
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
