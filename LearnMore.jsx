import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import DynamicIcons from './DynamicIcons';
import { useNavigation } from '@react-navigation/native';

export default function LearnMorePage() {
    const navigation = useNavigation();

    return(
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.TitleText}>Here is more Info about us</Text>
            <DynamicIcons 
                name='backburger'
                size={24}
                defaultColor='white'
                SelectedColor='#0062ff'
                style={styles.backButton}
                onPress={() => navigation.navigate('WelcomeScreen')}
            />
        <Text style={styles.aBunchOfText}>
            The Heredity 4 Me app is designed to help users understand their risk for various health conditions 
            based on their family history. By providing details about the health of close family members, users
            can get a clearer picture of how their genetics might influence their health. The app uses this family
            health information to predict the likelihood of developing certain diseases. It offers simple, easy-to-understand
            guidance and suggestions to help users take care of their health. By tracking hereditary patterns, the app helps 
            users make informed decisions about lifestyle changes, early screenings, and preventive measures to reduce their 
            health risks. With a focus on personalized advice, Heredity 4 Me empowers users to take proactive steps in maintaining 
            their health and well-being, all through the power of understanding their family's health history.
        </Text>
      </View> 
      <View style={styles.QANDA}>
        <Text style={styles.TitleText}>Q&A</Text>
        <Text style={styles.QANDA_Question}>What is Heredity 4 Me?</Text>
        <Text style={styles.aBunchOfText}>Q: What does the Heredity 4 Me app do? 
        A: Heredity 4 Me helps you understand your health risks based on your family history. 
        By inputting details about your family members' health, the app predicts the likelihood 
        of you developing certain diseases and offers suggestions for prevention.
        </Text>
      </View>
      <View style={styles.QANDA}>
        <Text style={styles.QANDA_Question}> How does the app work?</Text>
        <Text style={styles.answers}>Q: How do I use the Heredity 4 Me app?
        A: To use the app, simply input health information about your close family members. 
        The app then analyzes your family history and provides insights into your genetic health risks, 
        offering advice on lifestyle changes and preventive measures.
        </Text>
      </View>
      <View style={styles.QANDA}>
        <Text style={styles.QANDA_Question}> What kind of health risks can the app predict?</Text>
        <Text style={styles.answers}>Q: Can the app tell me if I'm at risk for specific health conditions?
        A: Yes, the app can predict the likelihood of various diseases based on your family’s health history. 
        It provides insights into conditions like heart disease, diabetes, and other hereditary health risks.
        </Text>
      </View>
      <View style={styles.QANDA}>
        <Text style={styles.QANDA_Question}>Can I use the app if I don't have any family history of health problems?</Text>
        <Text style={styles.answers}>Q: What if my family has no history of health issues?</Text>
        <Text style={styles.answers}>A: Even if your family doesn’t have a history of health problems, the app can still provide valuable insights and guidance on maintaining a healthy lifestyle. It can help track preventive measures and encourage healthy habits.</Text>
      </View>
      <View style={styles.QANDA}>
        <Text style={styles.QANDA_Question}>How accurate are the predictions?</Text>
        <Text style={styles.answers}>Q: How reliable are the health risk predictions made by the app?</Text>
        <Text style={styles.answers}>A: The predictions are based on family history, but they are not guaranteed to be fully accurate. The app provides general guidance to help you make informed decisions about your health and take preventive steps.</Text>
      </View>
      <View style={styles.QANDA}>
        <Text style={styles.QANDA_Question}> Can I update my family health information later?</Text>
        <Text style={styles.answers}>Q: Can I edit or update the health data I input into the app?</Text>
        <Text style={styles.answers}>A: Yes, you can update your family’s health history anytime. The app allows you to make changes to the information to keep it up to date and refine the health risk predictions.</Text>
      </View>
      <View style={styles.QANDA}>
        <Text style={styles.QANDA_Question}> What should I do with the information provided by the app?</Text>
        <Text style={styles.answers}>Q: How do I use the advice and insights the app provides?</Text>
        <Text style={styles.answers}>A: The app offers lifestyle suggestions, early screening tips, and preventive measures to help you stay healthy. It's important to consult with a healthcare professional for personalized advice based on your family health history.</Text>
      </View>
      <View style={styles.QANDA}>
        <Text style={styles.QANDA_Question}> Can I share my health information with others?</Text>
        <Text style={styles.answers}>Q: Can I share the health predictions and advice from the app with my doctor?</Text>
        <Text style={styles.answers}>A: Yes, you can share the information from the app with your doctor. It's a good idea to discuss the insights with them to get professional medical advice tailored to your needs.</Text>
      </View>
      </ScrollView> 
    );
}
const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'black',
        },
        innerContainer:{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 30,
        },
        TitleText: {
          fontSize: 40,
          fontFamily: 'Comic sans',
          textAlign:'center',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 10,
        },
        backButton: {
            position: 'absolute',
            top: 10,
            left: 10
        },
        aBunchOfText:{
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 18,
            marginBottom: 10,
        },
        QANDA:{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 50,
        },
        QANDA_Question:{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight:'bold',
            color:'white',
            textAlign: 'left'
        },
        answers:{
            alignItems: 'center',
            color: 'white',
            textAlign: 'left',
            fontWeight: '500',
            fontSize: 18,
            marginBottom: 10,
        },

});