import {Animated, StyleProp, StyleSheet, View} from "react-native";
import * as React from "react";
import {memo} from "react";

interface Props {
  style?: StyleProp<any>;
  show: boolean;
  children?: React.ReactNode;
  height?: number | string;
  width?: number | string;
}
function Skeleton(props: Props) {
  const {style = {}, show = false, children, height = "100%", width = "100%"} = props;

  const animatedValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  });

  if (!show) return children;

  return (
    <View style={[styles.container, {height: height, width: width}, style]}>
      <Animated.View style={[styles.skeleton, {transform: [{translateX}]}]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: '30%',
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skeleton: {
    height: '100%',
    width: '50%',
    backgroundColor: '#F2F8FC',
    position: 'absolute',
  },
});

export default memo(Skeleton);