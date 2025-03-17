import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, selected && styles.selected]}>
        {selected && <View style={styles.innerSquare} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: '#0ebeeb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4, // Square shape for checkbox
  },
  selected: {
    backgroundColor: '#0ebeeb', // Change background color when selected
  },
  innerSquare: {
    height: 16,
    width: 16,
    backgroundColor: '#ffffff', // Inner color for selected state
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Checkbox;