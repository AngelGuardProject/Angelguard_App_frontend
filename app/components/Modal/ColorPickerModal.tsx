import React from 'react';
import {Modal, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

interface ColorPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  visible,
  onClose,
  onColorSelect,
}) => {
  const colors = [
    '#FF0000',
    '#FFA6A6',
    '#FFD9D9',
    '#F0F0F0',
    '#FFE090',
    '#FEFFC3',
    '#FFF4D6',
    '#FFDFFD',
    '#E2AFFF',
    '#E8DBFF',
    '#C7F2FF',
    '#9EB6FF',
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>color custom</Text>
          <View style={styles.colorPickerContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorBox, {backgroundColor: color}]}
                onPress={() => onColorSelect(color)}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '90%',
    height: '30%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    color: '#a6a6a6',
    marginBottom: 20,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorBox: {
    width: '22%',
    height: 40,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ColorPickerModal;
