import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

export default function Empty() {
  return (
    <View style={styles.block}>
      <Text style={styles.description}>등록된 개체가 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: 'blue',
  },
});
