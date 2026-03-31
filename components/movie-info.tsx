import { colors } from "@/constants";
import { StyleSheet, Text, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: Readonly<MovieInfoProps>) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "N/A"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
  },
  label: {
    color: colors.light[200],
    fontSize: 14,
  },
  value: {
    color: colors.light[100],
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default MovieInfo;
