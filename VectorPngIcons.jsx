
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function VectorPngIcons({name, size, style, color}) {
    return (
            <MaterialCommunityIcons
            name = {name}
            size = {size || 24}
            color={color || 'black'}
            style={[styles.iconContainer, style]}
            />

    );
    
}
const styles = StyleSheet.create({
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
});