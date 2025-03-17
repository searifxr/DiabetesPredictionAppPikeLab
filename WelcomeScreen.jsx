import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Easing } from 'react-native-reanimated';
import SplitText from './SplitText';
import ShinyText from './ShinyText';


const MiddlePic = require('./assets/diabetes.png')

export default function WelcomeScreen() {
  const navigation = useNavigation()
  const [condition, setCondition] = useState(false);
  const AnimationFinish = () => {
      setCondition(true);
  }

  // useEffect(() => {
  //   if (condition) {
  //     return;
  //   }
  // }, [condition]);

  return (
    <View style={styles.container}>   
      <SplitText
        text='Welcome'
        style={styles.TitleText}
        delay={150}
        animationFrom={{ opacity: 0, translateY: 50 }}
        animationTo={{ opacity: 1, translateY: 0 }}
        easing={Easing.out(Easing.cubic)}
        onLetterAnimationComplete={AnimationFinish}
      />
      { condition && (
            <>
            <Text style={styles.subtitleText}>MySugarCare is an app designed to predict and assess the risk of getting Diabetes.</Text>
            <TouchableOpacity style={styles.learnmoreButton} onPress={() => navigation.navigate('LearnMorePage')}>
              <Text style={styles.button_text}>Learn more</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.getStartedWithButton} onPress={() => navigation.navigate('Predictions')}>
              { /* <Text style={styles.button_text2}>Get started with predictions</Text> */ }
              <ShinyText text="Get started with predictions" disabled={false} speed={3} style={styles.button_text2}/>
            </TouchableOpacity>
            <Image source={MiddlePic} style={styles.middlePic} resizeMode="contain"/>
            <StatusBar style="auto" />
          </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d6ed1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleText: {
    fontSize: 40,
    fontFamily: 'Comic sans',
    textAlign:'center',
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 50,
  },
  subtitleText: {
    marginBottom: 550,
    fontSize: 20,
    fontFamily: 'Comic Sans MS',
    textAlign: 'center',
    fontWeight: '400',
    color: 'white'
  },
  box1Titlebox: {
    position: 'absolute',
    bottom: 300,
    width: 100,
    height: 60,
    backgroundColor: '#06023b',
  },
  middlePic:{
    position:'absolute',
    height: 200,
    width: 200,
    top: 340,
    alignItems: 'center',
  },
  learnmoreButton:{
    position: 'absolute',
    top: 280,
  },
  button_text:{
    color: 'orange',
    fontSize: 18
  },
  button_text2:{
    color: 'white',
    fontSize: 18,
    fontWeight:'bold'
  },
  getStartedWithButton:{
    position: 'absolute',
    bottom: '150',
    backgroundColor:'#121214',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  footer:{
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#121214',
    height: 80,
    width: 395, 
    borderRadius: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footerButtons:{
    paddingHorizontal: 15,
  }
});
