import { colors, icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const profile = () => {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        gap: 20,
      }}
    >
      <Image
        source={icons.person}
        style={{ height: 40, width: 40 }}
        tintColor="#fff"
      />
      <Text
        style={{ color: colors.light[200], fontSize: 18, fontWeight: "bold" }}
      >
        Profile
      </Text>
    </View>
  );
};

export default profile;
