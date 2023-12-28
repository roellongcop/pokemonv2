import {SafeAreaView, StyleSheet} from 'react-native';
import * as React from "react";

interface Props {
  children: React.ReactNode;
}
export default function MainContainer({children}: Props) {
  return (
    <SafeAreaView style={styles.safearea}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    paddingTop: 50,
    paddingHorizontal: 10
  },
});
