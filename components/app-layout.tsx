import { colors, images } from "@/constants";
import { Image, StyleSheet, View } from "react-native";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.image} />
      {children}
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
});
