import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import {
    Image,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const tabBarHeight = 52;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: { width: "100%", height: "100%" },
        tabBarButton: ({ children, onPress, onLongPress }) => (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress ?? undefined}
            style={{ flex: 1 }}
          >
            <View
              style={{
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
              }}
            >
              {children}
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon={icons.home} text="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon={icons.search} text="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon={icons.save} text="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon={icons.person} text="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

interface TabbarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  text: string;
}

function TabbarIcon({ focused, icon, text }: Readonly<TabbarIconProps>) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={styles.tabIconBackground}
      >
        <Image
          source={icon}
          style={{ tintColor: colors.primary }}
          tintColor="#151312"
        />
        <Text style={styles.tabIconText}>{text}</Text>
      </ImageBackground>
    );
  } else {
    return (
      <View>
        <Image source={icon} tintColor="#a8b5db" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    marginBottom: 36,
    marginHorizontal: 10,
    height: tabBarHeight,
    backgroundColor: "#0F0D23",
    borderRadius: 50,
    position: "absolute",
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarItem: {
    height: tabBarHeight,
  },
  tabIconBackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 50,
    width: "100%",
    height: tabBarHeight,
    overflow: "hidden",
  },
  tabIconText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "600",
  },
});
