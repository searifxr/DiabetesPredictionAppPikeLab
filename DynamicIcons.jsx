
import React, {useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';

export default function DynamicIcons({name, size, defaultColor, SelectedColor, style, onPress, navigateTo, currentRoute,}) {
    const [isSelected, setIsSelected] = useState(false)
    const navigation = useNavigation();
    useEffect(() => {
        if (currentRoute === navigateTo) {
          setIsSelected(true);
        } else {
          setIsSelected(false);
        }
      }, [currentRoute, navigateTo]);
    
    const handlePress = () => {
        setIsSelected(!isSelected)
        if(onPress)
        {
            onPress();
        }
        if(navigateTo)
        {
            navigation.navigate(navigateTo);
        }
    }
    
    return (
        <TouchableOpacity style = {[styles.iconContainer, style]} onPress={handlePress}>
            <MaterialCommunityIcons
            name = {name}
            size = {size || 24}
            color = {defaultColor}
            />
        </TouchableOpacity>
    );
    
}
const styles = StyleSheet.create({
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
});