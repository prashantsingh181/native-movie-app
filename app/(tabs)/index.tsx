import SearchBar from "@/components/search-bar";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.image} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 40 }}
      >
        <Image source={icons.logo} style={styles.logo} />
        <View>
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for movies..."
            as="button"
          />
        </View>
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
});
