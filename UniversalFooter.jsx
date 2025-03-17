import React from 'react';
import { View, StyleSheet } from 'react-native';
import DynamicIcons from './DynamicIcons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function UniversalFooter() {
    const route = useRoute
    return(
      <View style={styles.footer}>
    <DynamicIcons
        name = "book"
        size = {55}
        defaultColor = '#6f7173'
        SelectedColor = 'orange'
        style = {styles.footerButtons}
        navigateTo={'EduResources'}
        currentRoute={route.name}
    />
    <DynamicIcons
        name = "google-analytics"
        size = {55}
        defaultColor = '#6f7173'
        SelectedColor = 'orange'
        style = {styles.footerButtons}
        currentRoute={route.name}
    />
    <DynamicIcons
        name = "account-settings"
        size = {55}
        defaultColor = '#6f7173'
        SelectedColor = 'orange'
        style = {styles.footerButtons}
        currentRoute={route.name}
    />
      </View>
    );
}
const styles = StyleSheet.create({
    footer: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#121214',
      height: 80,
      width: '100%', 
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    footerButtons: {
      marginHorizontal: 20, 
    },
  });