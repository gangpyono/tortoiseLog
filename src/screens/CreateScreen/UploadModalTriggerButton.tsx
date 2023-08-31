import React from 'react';
import {
  ActionSheetIOS,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UploadModal from './UploadModal';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';

interface Props {
  onUpload: (assetList: Asset[]) => void;
  title: string;
}

const imagePickerOption = {
  mediaType: 'photo',
  maxWith: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
} as const;

export default function UploadModalTriggerButton({title, onUpload}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const onPickImage = (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }

    if (res.assets) {
      onUpload(res.assets);
    }
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  const onPress = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);

      return;
    }

    // ios 시뮬레이터에선 카메라,사진첩 동작 확인 불가(실제 기기에서 해봐야함)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          return;
        }

        if (buttonIndex === 1) {
          return;
        }
      },
    );
  };

  return (
    <View style={styles.block}>
      <UploadModal // android 환경
        visible={modalVisible}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
        onClose={() => setModalVisible(false)}
      />
      <Pressable style={styles.imageUpload} onPress={onPress}>
        <Icon name="camera-alt" size={32} />
        <Text>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  imageUpload: {
    padding: 12,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 8,
  },
});
