import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  placeholder?: string;
  onPress?: () => void;
  as?: "input" | "button";
}

const SearchBar = ({
  placeholder = "Search...",
  onPress,
  as = "input",
  ...props
}: SearchBarProps) => {
  return (
    <View style={styles.searchContainer}>
      <Image
        source={icons.search}
        style={styles.searchIcon}
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        onPress={onPress}
        editable={as === "input"}
        {...props}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark[200],
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchIcon: {
    height: 20,
    width: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "white",
    padding: 0,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
