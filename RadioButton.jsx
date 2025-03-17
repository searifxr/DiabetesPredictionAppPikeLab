import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const RadioButton = ({ selected, onPress, label, style }) => {
  return (
    <View style={[styles.radioButtonContainer, style]}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        <View style={[styles.radioCircle, selected && styles.selected]}>
          {selected && <View style={styles.innerCircle} />}
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5, // Adds spacing between buttons
  },
  radioButton: {
    padding: 10, // Adds tap target for better usability
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0ebeeb",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    borderColor: "#0ebeeb",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#0ebeeb",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000", // Ensure text color is visible
  },
});

export default RadioButton;
