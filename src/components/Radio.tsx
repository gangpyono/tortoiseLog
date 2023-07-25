import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

interface RadioProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

function Radio({label, selected, onSelect}: RadioProps) {
  return (
    <Pressable onPress={onSelect} style={styles.radio}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text>{label}</Text>
    </Pressable>
  );
}

export type RadioOptionType = {
  id: string;
  label: string;
};
interface RadioGroupProps {
  options: RadioOptionType[];
  onPress: (target: RadioOptionType) => void;
}
function RadioGroup({options, onPress}: RadioGroupProps) {
  const [selectedOption, setSelectedOption] = useState(options[0].id);

  const handleRadioPress = (id: string) => {
    setSelectedOption(id);
    if (onPress) {
      const selected = options.find(option => option.id === id);
      if (selected) {
        onPress(selected);
      }
    }
  };

  return (
    <View>
      {options.map(option => (
        <Radio
          key={option.id}
          label={option.label}
          selected={option.id === selectedOption}
          onSelect={() => handleRadioPress(option.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});

export default RadioGroup;
