// src/components/ControlButton.js
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const ControlButton = ({ title, onPress, icon, color = '#3498db', style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ControlButton;
