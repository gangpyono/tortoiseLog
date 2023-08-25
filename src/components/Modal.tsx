import React from 'react';
import {
  View,
  Modal as ReactNativeModal,
  Alert,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {color} from '../theme/style';

interface Props {
  onClose: () => void;
  onOk: () => void;
  okTitle: string;
  description: string;
}

export default function Modal({onClose, onOk, okTitle, description}: Props) {
  return (
    <>
      <ReactNativeModal
        animationType="fade"
        transparent
        visible
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          onClose();
        }}>
        <View style={styles.mask}>
          <View style={[styles.block]}>
            <Text style={styles.modalText}>{description}</Text>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.okButton]}
                onPress={() => onOk()}>
                <Text style={styles.textStyle}>{okTitle}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.closeButton]}
                onPress={() => onClose()}>
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
}

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  block: {
    marginTop: -200,
    backgroundColor: color.white,
    borderRadius: 20,
    padding: 28,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonWrapper: {
    gap: 8,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },
  okButton: {backgroundColor: '#2196F3'},
  closeButton: {backgroundColor: '#F194FF'},
  textStyle: {
    color: color.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
});
