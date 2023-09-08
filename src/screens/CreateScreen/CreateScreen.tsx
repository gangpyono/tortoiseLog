import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {color, spacing} from '../../theme/style';
import UploadModalTriggerButton from './UploadModalTriggerButton';
import RadioGroup from '../../components/Radio';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {}

export default function CreateScreen({}: Props) {
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.form}>
        <UploadModalTriggerButton title="개체사진 업로드" onUpload={() => {}} />

        <RadioGroup
          row
          options={[
            {id: '1', label: '유'},
            {id: '2', label: '무'},
          ]}
          onPress={a => {
            console.log('a :>> ', a);
          }}
        />

        <DateTimePickerModal
          onConfirm={() => {}}
          onCancel={() => {}}
          mode="date"
          isVisible={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: color.white,
  },
  form: {
    paddingHorizontal: spacing.Horizontal,
  },
});
