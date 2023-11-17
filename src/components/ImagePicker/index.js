import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const ImagePicker = ({ isVisible, onClose, onGalleryPress, onCameraPress }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesomeIcon icon={faCircleXmark} size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onGalleryPress}>
            <Text style={styles.buttonText}>Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCameraPress}>
            <Text style={styles.buttonText}>Câmera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    width: 280,
    paddingTop: 40,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    marginVertical: 10,
    borderRadius: 22,
    width: '100%',
    height: 52,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
  closeButton: {
    color: 'black',
    fontSize: 13,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ImagePicker;
