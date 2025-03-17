import { createStackNavigator } from '@react-navigation/stack'
import { TransitionPresets } from '@react-navigation/stack';
import UniversalFooter from './UniversalFooter';
import WelcomeScreen from './WelcomeScreen';
import LearnMorePage from './LearnMore';
import Predictions from './predictionPage';
import EduResources from './EducationalResources';
import TermsHealth from './TermsHealth';
const stack = createStackNavigator();

export default function Navigator () {
    return(
        <>
        <stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false, ...TransitionPresets.SlideFromRightIOS,}}>
            <stack.Screen name='WelcomeScreen' component={WelcomeScreen}/>
            <stack.Screen name='LearnMorePage' component={LearnMorePage}/>
            <stack.Screen name='Predictions' component={Predictions}/>
            <stack.Screen name='EduResources' component={EduResources}/>
            <stack.Screen name='TermsHealth' component={TermsHealth}/>
        </stack.Navigator>
        <UniversalFooter/>
        </>
    )
}