import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import Modal from '../../components/Modal';

interface ModalTriggerButtonProps {
  title: string;
  description: string;
  onOk: () => void;
  okTitle: string;
}

export default function ModalTriggerButton({
  title,
  okTitle,
  description,
  onOk,
}: ModalTriggerButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible && (
        <Modal
          description={description}
          onClose={() => setModalVisible(false)}
          onOk={() => onOk()}
          okTitle={okTitle}
        />
      )}
      <CustomButton title={title} onPress={() => setModalVisible(true)} />
    </>
  );
}
