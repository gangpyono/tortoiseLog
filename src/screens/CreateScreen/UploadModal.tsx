import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../../theme/style';

interface Props {
  visible: boolean;
  onClose: () => void;
  onLaunchCamera: () => void;
  onLaunchImageLibrary: () => void;
}

export default function UploadModal({
  visible,
  onLaunchCamera,
  onLaunchImageLibrary,
  onClose,
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}>
      <Pressable style={styles.mask} onPress={onClose}>
        <View style={styles.block}>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Icon name="camera-alt" size={32} style={styles.icon} />
            <Text style={styles.text}>카메라로 촬영하기</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Icon name="photo" size={32} style={styles.icon} />
            <Text style={styles.text}>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    backgroundColor: color.white,
    width: 300,
    borderRadius: 4,
  },
  actionButton: {
    flexDirection: 'row',
    padding: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});
