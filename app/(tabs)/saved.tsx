import { colors } from "@/constants";
import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const saved = () => {
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
        source={icons.save}
        style={{ height: 40, width: 40 }}
        tintColor="#fff"
      />
      <Text
        style={{ color: colors.light[200], fontSize: 18, fontWeight: "bold" }}
      >
        Saved
      </Text>
    </View>
  );
};

export default saved;
