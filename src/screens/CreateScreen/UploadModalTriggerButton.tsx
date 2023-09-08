import React from 'react';
import {
  ActionSheetIOS,
  Image,
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
} from 'react-native-image-picker';

interface Props {
  onUpload: (uri: string) => void;
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
  const [imageUri, setImageUri] = useState('');

  const onPickImage = (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }

    if (res.assets && res.assets[0].uri) {
      onUpload(res.assets[0].uri);
      setImageUri(res.assets[0].uri);
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

  const imageComponent = imageUri ? (
    <Image style={styles.circle} source={{uri: imageUri}} />
  ) : (
    <View style={[styles.circle, styles.center]}>
      <Icon name="camera-alt" size={32} />
      <Text>{title}</Text>
    </View>
  );

  return (
    <View>
      {Platform.OS === 'android' && (
        <UploadModal
          visible={modalVisible}
          onLaunchCamera={onLaunchCamera}
          onLaunchImageLibrary={onLaunchImageLibrary}
          onClose={() => setModalVisible(false)}
        />
      )}

      <Pressable onPress={onPress}>
        <View style={styles.center}>{imageComponent}</View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imageUpload: {
    padding: 12,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 8,
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
