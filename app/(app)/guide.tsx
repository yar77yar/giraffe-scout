import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Pressable,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import { router } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const stories = [
  {
    uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZ0NnZhNnpwdTB2dDF4MTZnbWdobjFueWFwcW1wbGZhd29xNzgwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cCuBNLbZqclxkpWyby/giphy.gif",
    duration: 5,
  },
  {
    uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg",
    duration: 2,
  },
  {
    uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjNpYzE2aGQzZmdvaWVjZ2c3c3JmdHdmODViZHdybnkzMmVsamd6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GRSnxyhJnPsaQy9YLn/giphy.gif",
    duration: 5,
  },
  // {
  //   uri: require("../../assets/images/menu/guid-back.png"),
  //   duration: 5,
  // },
];

export default function IgStories() {
  const insets = useSafeAreaInsets();

  const [storyIndex, setStoryIndex] = useState(0);
  const [storyHistory, setStoryHistory] = useState(0);

  const progress = useSharedValue(0); // 0 -> 1

  const story = stories[storyIndex];

  const imgRef = useRef<Image>(null);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: stories[storyIndex].duration * 1000,
      easing: Easing.linear,
    });
  }, [storyIndex]);

  const goToPrevStory = () => {
    setStoryIndex((index) => {
      if (index === 0) {
        return 0;
      }
      if (storyHistory !== stories.length - 1) {
        setStoryHistory((prev) => prev - 1);
      }
      return index - 1;
    });
  };

  const goToNextStory = () => {
    setStoryIndex((index) => {
      if (index === stories.length - 1) {
        return stories.length - 1;
      }

      if (storyHistory !== stories.length - 1) {
        setStoryHistory((prev) => prev + 1);
      }

      return index + 1;
    });
  };

  useAnimatedReaction(
    () => progress.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue && currentValue === 1) {
        runOnJS(goToNextStory)();
      }
    }
  );

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <SafeAreaView style={{ ...styles.container, marginTop: insets.top }}>
      <View style={styles.storyContainer}>
        <Image source={{ uri: story.uri }} style={styles.image} ref={imgRef} />

        <Pressable style={styles.navPressable} onPress={goToPrevStory} />

        <Pressable
          style={[styles.navPressable, { right: 0 }]}
          onPress={goToNextStory}
        />

        <View style={styles.header}>
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.indicatorRow}>
            {stories.map((story, index) => (
              <View key={Math.random()} style={styles.indicatorBG}>
                <Animated.View
                  style={[
                    styles.indicator,
                    index === storyIndex && indicatorAnimatedStyle,
                    index > storyIndex && { width: 0 },
                    index < storyIndex && { width: "100%" },
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      </View>

      <Pressable style={styles.closeGuide} onPress={() => router.back()}>
        <EvilIcons name="close" size={24} color="black" />
      </Pressable>

      {stories.length - 1 === storyHistory && (
        <View style={styles.okGuideButton}>
          <Button title="Все понятно" onPress={() => router.back()} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  storyContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  header: {
    position: "absolute",
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: "100%",
    padding: 20,
    paddingTop: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    borderRadius: 50,
    color: "white",
  },
  navPressable: {
    position: "absolute",
    width: "30%",
    height: "100%",
  },

  indicatorRow: {
    gap: 5,
    flexDirection: "row",
    marginBottom: 20,
  },

  indicatorBG: {
    flex: 1,
    height: 3,
    backgroundColor: "gray",
    borderRadius: 10,
    overflow: "hidden",
  },
  indicator: {
    backgroundColor: "white",
    height: "100%",
  },

  closeGuide: {
    // display: "flex",
    position: "absolute",
    borderRadius: 50,
    padding: 8,
    top: 40,
    // left: 0,
    right: 25,
    // bottom: 0,
    backgroundColor: "#fff",
  },

  okGuideButton: {
    position: "absolute",
    borderRadius: 50,
    padding: 8,
    // top: 0,
    left: 0,
    right: 0,
    bottom: 15,
  },
});
