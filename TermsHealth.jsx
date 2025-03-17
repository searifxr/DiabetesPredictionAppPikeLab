import { StatusBar } from 'expo-status-bar';
import React, { useRef, useDebugValue, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, Alert, TouchableOpacity, ActivityIndicator, Switch, input, ImageBackground} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import VectorPngIcons from './VectorPngIcons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import RadioButton from './RadioButton';
import Checkbox from './CheckBox';

export default function TermsHealth() {
    
    const backdrop = require('./assets/Background.jpg')

    return(
        
        <ImageBackground source={backdrop} style={style.backgroundImage}>
            <ScrollView contentContainerStyle={style.formContainer} showsVerticalScrollIndicator={false}>
                <Text style={style.subHeadingText}>Hypertension</Text>
                <Text style={style.subTitle}>Definition: A condition where blood pressure levels are consistently too high, increasing the risk of heart disease, stroke, and other complications.</Text>

                <Text style={style.subHeadingText}>High Cholesterol</Text> 
                <Text style={style.subTitle}>Definition: A condition where high levels of bad cholesterol (LDL) and low levels of good cholesterol (HDL) increase the risk of heart disease.</Text>

                <Text style={style.subHeadingText}>Prediabetes</Text>
                <Text style={style.subTitle}>Definition: A condition where blood sugar levels are higher than normal but not yet high enough to be diagnosed as type 2 diabetes.</Text>

                <Text style={style.subHeadingText}>Polycystic Ovary Syndrome (PCOS)</Text>
                <Text style={style.subTitle}>Definition: A hormonal disorder that affects women, leading to irregular periods, ovarian cysts, and increased androgen levels.</Text>

                <Text style={style.subHeadingText}>Tip!</Text>
                <Text style={style.subTitle}>Swipe from left to right to exit this page.</Text>
                <Text style={style.subTitle}>"--&gt;"</Text>
                <Text style={style.subTitle}>This direction showed above</Text>
            </ScrollView> 
       </ImageBackground>
        
    )
    }

    const style = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
          subHeadingText: {
            color: '#0ebeeb',
            fontSize: 50,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            marginLeft: 10,
            paddingTop: 20,
          },
          backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        subTitle: {
            color: '#0ebeeb',
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            paddingTop: 20,
            
        },
        formContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            paddingBottom: 300,
        },
    })