import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

interface PetListProps {
  pets: {id: number; name: string; adoptionDate: string; weight: number}[];
}

export default function PetList({pets}: PetListProps) {
  const demensions = useWindowDimensions();
  const size = (demensions.width - 12) / 2;

  return (
    <FlatList
      numColumns={2}
      style={styles.block}
      data={pets}
      renderItem={({item}) => (
        <View style={[styles.itemBlock, {width: size, height: size * 1.5}]}>
          <Image
            style={{width: size, height: size}}
            source={require('../assets/images/circle.png')}
            resizeMode="contain"
          />
          <View>
            <Text>{item.name}</Text>
            <Text>{item.adoptionDate}</Text>
            <Text>최근 몸무게: {item.weight}g</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  itemBlock: {margin: 3, flex: 1},
  imageBlock: {},
});
