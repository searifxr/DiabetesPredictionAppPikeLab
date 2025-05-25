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
//import {API_URL} from "@env"  /* not working for some reason */



export default function Predictions() {
    const backdrop = require('./assets/Background.jpg')
    const editIcon = require('./assets/EditIcon.png')
    const ProfileIcon = require('./assets/Person ICON.png')

    //BMI
    const BMI_underweight = require('./assets/BMI icon Underweight.png');
    const BMI_Healthy = require('./assets/BMI icon Healthy.png');
    const BMI_Overweight = require('./assets/BMI icon Overweight.png');
    const BMI_Obese = require('./assets/BMI icon Obese.png')
    const BmiRange = {
        child: {underweight: 14, healthy: 18.4, overweight: 21, obese: 25},
        teen:  { underweight: 16, healthy: 22.9, overweight: 27, obese: 32 },
        adult: { underweight: 18.5, healthy: 24.9, overweight: 29.9, obese: 35 },
        senior: { underweight: 19, healthy: 25, overweight: 30, obese: 36 }
    }
    //Weight
    const WeightKGImage = require('./assets/Weight KG.png')
    const WeightLBSImage = require('./assets/Weight LBS.png')

    //Height
    const Height = require('./assets/Person Height.png')

    //blud
    const BloodTypeA = require('./assets/Blood type A.png') 
    const BloodTypeApos = require('./assets/Blood type A+.png')
    const BloodTypeAB = require('./assets/Blood type AB-.png')
    const BloodTypeABpos = require('./assets/Blood type AB+.png')
    const BLoodTypeB = require('./assets/Blood type B-.png');
    const BLoodTypeBpos = require('./assets/Blood type B+.png');
    const BloodTypeO = require('./assets/Blood type O-.png')
    const BloodTypeOpos = require('./assets/Blood type O+.png')

    //HbA1c
    const HbA1c_optimal = require('./assets/HbA1c optimal.png');
    const HbA1c_Elevated = require('./assets/HbA1c Elevated.png');
    const HbA1c_High = require('./assets/HbA1c High.png')

    //Blud sugar
    const BloodSugarRange = {
        NormalMinimum: {fasting: 80, AfterEating:170, ThreeHoursAfter:120},
        NormalMaximum: {fasting: 100, AfterEating:200, ThreeHoursAfter:140},
        PrediabeticMinimum: {fasting: 101, AfterEating:190, ThreeHoursAfter:141},
        PrediabeticMaximum: {fasting: 125, AfterEating:230, ThreeHoursAfter:160}
        
    }

    const Prediabetic = require('./assets/BloodSugarHigh.png');
    const Diabetic = require('./assets/BloodSugarDiabetic.png');
    const Normal = require('./assets/BloodSugarNormal.png');
    const LowSugar = require('./assets/BloodSugarLow.png')

    const NormalBP = require('./assets/BPnormal.png')
    const ElevatedBP = require('./assets/BPelevated.png')

    // const combinationImages = {
    //     'Parents': require('./assets/parents.png'),
    //     'Grandparents': require('./assets/grandparents.png'),
    //     'Siblings': require('./assets/siblings.png'),
    //     'Parents,Grandparents': require('./assets/parents_and_grandparents.png'),
    //     'Parents,Siblings': require('./assets/parents_and_siblings.png'),
    //     'Grandparents,Siblings': require('./assets/grandparents_and_siblings.png'),
    //     'Parents,Grandparents,Siblings': require('./assets/all_family.png'),
    //     'None': require('./assets/no_family.png'),
    // };
    //______________________________________________________//
    const [currentScreen, setCurrentScreen] = useState('home');
    const [Is_Loading, setIs_Loading] = useState(false);
    const navigation = useNavigation()
    //______________________________________________________//
    //______________________________________________________//
    const loadingMessages = ['loading...','loading....','loading.','loading..','loading...','loading....','loading....','Loading...']
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
    //_____________________________________________________//
    //_____________________________________________________//
    const [fullName, setFullName]= useState('')
    const [DoB, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const[sex, setSex]= useState('');
    const[Nationality, setNationality] = useState('');
    const[email, setEmail] = useState(''); //one or the other
    const [phoneNumber, setPhoneNumber] = useState(''); //one or the other
    const [message, setMessage] = useState('');
    const [preganices, setPreganices] = useState(0);
    //___________________________________________________//
    //___________________________________________________//
    const [weight, setWeight] = useState(null);
    const [weightKG, setWeightKG] = useState(null);
    const [isMetric, setIsMetric] = useState(false);
    const [height, setHeight] = useState(null);
    const [heightCM, setHeightCM] = useState(null);
    const [bloodGroup, setBloodGroup] = useState(null);
    const [bloodSugar, setBloodSugar] = useState('');
    const [bloodSugarTime, setBloodSugarTime] = useState('');
    const [HbA1c, setHbA1c] = useState('');
    const [BP, setBP] = useState('')
    const [BMI, setBMI] = useState(null)
    const [BMIimperial, setBMIimperial] = useState(null)
    //___________________________________________________//
    //___________________________________________________//
    const [SwitchToPicker, setSwitchToPicker] = useState(true);
    const [switchToFile, setSwitchToFile] = useState(false);
    const [dieases, setDiseases] = useState(null);
    const [geneticReport, setGeneticReport] = useState(null);
    const [relation, setRelation] = useState([]);
    const [ageAtDiagnosis, setAgeAtDiagnosis]=useState('')
    const [pedigree, setPedigreeScore] = useState(null);
    //___________________________________________________//
    const [PhysicalActivity, setPhysicalActivity] = useState(null);
    const [Diet, setDiet] = useState(null);
    const [healthConditions, setHealthConditions] = useState([]);
    const [otherCondition, setOtherCondition] = useState('');
    const [habits, setHabits] = useState([])
    const [alcohol, setAlcohol] = useState([])
    const [stress, setStress] = useState(null)
    //______________________________________________________//
    const [finalScreen, setFinalScreen] = useState('First');
    //_____________________________________________________//
    const ConversionData = (size) => {
        if( 1 > size/1024)
        {
            return `${size} Bytes`
        }
        else if(1 > size/(1024*1024))
        {
            return `${(size/1024).toFixed(2)} KB`
        }
        else
        {
            return `${(size/(1024*1024)).toFixed(2)} MB`
        }
    }
    //_________________________________________//
    const calculateBMI = (weight, height, DoB) => {
        if (weight <= 0 || height <= 0) {
            return { bmi: "Invalid input", age: "Invalid input" };
        }
    
        // Calculate age based on DoB
        const today = new Date().toDateString();
        const birthDate = new Date(DoB);
        let age = new Date(today).getFullYear() - birthDate.getFullYear();
    
        const monthDiff = new Date(today).getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date(today).getDate() < birthDate.getDate())) {
            age--;
        }
    
        let weightInKg = weight;
        let heightInMeters = height / 100;
    
        if (!isMetric) {
            weightInKg = weight * 0.453592; // Convert lbs to kg
            heightInMeters = (height * 2.54) / 100; // Convert inches to meters
        }
    
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        setBMI(bmi.toFixed(1));
        return {
            bmi: bmi.toFixed(1),
            age: age
        };
    };

    
    
    //__//
    useEffect(() => {
        if(isMetric){
            const { bmi, age } = calculateBMI(weightKG, heightCM, DoB);
            setBMI(bmi)
        }
        else{
        const { bmi: bmiImperial, age: ageImperial } = calculateBMI(weight, height, DoB);
        
        setBMIimperial(bmiImperial)
        }
    }, [weightKG, heightCM, height, weight, DoB])
    //__//
    useEffect(() => {
        const systolic = FindSystolic(BP);
        const diastolic = FindDiastolic(BP);
      
        if (systolic >= 180 && diastolic >= 120) {
          setCurrentScreen('EmergencyBP');
        }
      }, [BP]); 
    //__//

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
    
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        // Adjust age if the birth date hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age;
    };

    const getAgeGroup = (age) => {
        if (age < 12) return 'child';
        if (age >= 12 && age <= 19) return 'teen';
        if (age >= 20 && age <= 64) return 'adult';
        return 'senior';  // 65+
    };
    const age = calculateAge(DoB);
    const ageGroup = getAgeGroup(age);
    const range = BmiRange[ageGroup];
    const underweightLimit = Number(range.underweight);
    const healthyLimit = Number(range.healthy);

    //__//
    const formatBPInput = (text) => {
        text = text.replace(/[^0-9]/g, '');
        let parts = text.split('/');
        let systolic = parts[0] || ''; 
        let diastolic = parts[1] || '';

       
        if (systolic.length > 3) {
            systolic = systolic.slice(0, 3);
            diastolic = text.slice(3); 
        }
    
        setBP(diastolic ? `${systolic}/${diastolic}` : systolic); 
    };
    const FindSystolic = (BPtext) => {
        const parts = BPtext.split('/');
        const Systolic = parts[0] || ''
        return parseInt(Systolic, 10);
    }
    const FindDiastolic = (BPtext) => {
        const parts = BPtext.split('/');
        const Diastolic = parts[1] || ''
        return parseInt(Diastolic, 10);
    }
    //__//
    const ScreenChangeFromHome = () => {
        if(fullName && DoB && sex && Nationality)
        {
            if(email || phoneNumber)
            {
                setMessage('');
                loading('HealthMetrics')
                
            }
            else {
                setMessage("Didn't add a phone number or Email");
            }
        }
        else{
            setMessage('Not all parts of the form are filled')
        }
    }
    //__//
    const ScreenChangeFromMetrics = () => {
        setMessage(" ");
        if(weight || weightKG && height || heightCM && bloodGroup && bloodSugar && BP && HbA1c)
        {
            loading('History')
        }
        else{
            setMessage('Not all parts of the form are filled')
        }
    }
    //__//
    const ScreenChangeFromHistory = () => {
        setMessage(" ");
        if(relation || geneticReport)
        {
            loading('Habits')
        }
        else{
            setMessage('some of the parts of the form are not filled')
        }
    }
    //____//
    const ScreenChangeFromHabits = () =>
    {
        setMessage(" ")
        if(PhysicalActivity && Diet && healthConditions && habits && alcohol && stress)
        {
            loading('Final')
        }
        else{
            setMessage("some parts of the form are not filled")
        }
    }
    //_____________________________//

    const loading = (screen) => {
        setIs_Loading(true);
        
        for(let i = 0; i < loadingMessages.length; i++)
        {
            setTimeout(() => {
                setLoadingMessage(loadingMessages[i]);
            }, i * 500);
        }
        setTimeout( () => {
            setCurrentScreen(screen);
            setIs_Loading(false);
        }, 3000)
        
    };
    //___________________________________________//
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || DoB;
        setShowDatePicker(true);
        setDob(currentDate);
    }
//_______________________________________//
    const FileUpload = async() => {
       try {
        const upload = await DocumentPicker.getDocumentAsync({
            multiple: true
        });

        if(upload && upload.assets && upload.assets.length>0) {
            setGeneticReport(upload.assets);
            setMessage('Files uploaded')
        }
        else{
            setMessage('No file selected')
        }

       }
       catch(error){
            setMessage('Error: ', error)
            
       }
    }
//_______________________________________________________//
const toggleOption = (option) => {
    setHealthConditions((prevSelectedOptions) => {
        if(prevSelectedOptions.includes('none'))
        {
          return prevSelectedOptions.includes("none") ? [] : ["none"];
        }
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);  // Deselect option
      } else {
        return [...prevSelectedOptions, option];  // Select option
      }
    });
  };
//__________________________________________________________________//
  const toggleOption2 = (option) => {
    setHabits((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);  // Deselect option
      } else {
        return [...prevSelectedOptions, option];  // Select option
      }
    });
  };
  const toggleOptionForAlcohol = (option) => {
    setAlcohol((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);  // Deselect option
      } else {
        return [...prevSelectedOptions, option];  // Select option
      }
    });
  };
  const toggleOptionForRelation = (option) => {
    setRelation((prevSelectedOptions) => {
      if(prevSelectedOptions.includes('Has no family members with diabetes'))
      {
        return prevSelectedOptions.includes("Has no family members with diabetes") ? [] : ["Has no family members with diabetes"];
      }
    //   else
    //   {
    //     if (prevSelectedOptions.includes("none")){
    //         return [option];
    //     }
    //   }
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);  // Deselect option
      } else {
        return [...prevSelectedOptions, option];  // Select option
      }
    });
  };

  //______________________________//
  const CheckBloodSugar  = (value, period) => {
    if(value < BloodSugarRange.NormalMinimum[period])
    {
        return "Low Sugar"
    }
    else if(value >= BloodSugarRange.NormalMinimum[period] && value <= BloodSugarRange.NormalMaximum[period])
    {
        return "Normal";
    }
    else if(value >= BloodSugarRange.PrediabeticMinimum[period] && value <= BloodSugarRange.PrediabeticMaximum[period])
    {
        return "Prediabetic";
    }
    return "Diabetic"
  }

  const BloodSugaa = CheckBloodSugar(bloodSugar, bloodSugarTime);
//____________________________________________//

// Add this function to your component
const calculatePedigreeFunction = (relation) => {
    // Assign weights to family members
    const weights = {
        'Has Parents (Mother/Father) with diabetes': 0.5, // Higher weight for parents
        'Has Siblings (Brother/Sister) with diabetes': 0.3, // Moderate weight for siblings
        'Has Grandparents (Maternal/Paternal) with diabetes': 0.2, // Lower weight for grandparents
        'Has no family members with diabetes': 0 // No contribution if no family history
    };

    // Calculate the pedigree score
    let score = 0;
    relation.forEach((relative) => {
        score += weights[relative] || 0; // Add weight if the relative is selected
    });

    // Normalize the score (optional, to keep it between 0 and 1)
    score = Math.min(score, 1);

    return score;
};

// Example usage
useEffect(() => {
    const pedigreeScore = calculatePedigreeFunction(relation);
    setPedigreeScore(pedigreeScore);
}, [relation]);

    return(
        <View style={style.container}>
        <ImageBackground source={backdrop} style={style.backgroundImage}>
        {/* Loading container */}
        {Is_Loading ? (
            <>
                <View style={style.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffff" />
                    <Text style={style.loadingText}>{loadingMessage}</Text>
                </View>
            </>
        ):(
            <>
                {
                    currentScreen === 'EmergencyBP' && (
                        <>
                            <View style={style.container}>
                                <Text style={{fontSize: 20, color:"white"}}>Call 911 Immediately</Text>
                                <Text style={{fontSize: 15, color:"white"}}>The Blood Pressure you enetered is in a dangerous level</Text>
                                <Text style={{fontSize: 15, color:"white"}}>Click this button incase you entered it wrong</Text>
                                <Text style={{fontSize: 15, color:"white"}}>BP:{BP}</Text>
                                <TouchableOpacity style={style.submission} onPress={() => {
                                    setCurrentScreen("HealthMetrics")
                                    formatBPInput("12080")
                                }}>

                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }
                {currentScreen === 'home' && (
                    <>
                        <View style={style.wrapper}>
                        <ScrollView contentContainerStyle={style.formContainer} showsVerticalScrollIndicator={false}>
                            <Text style={style.subHeadingText}>Personal Info</Text>
                            <TextInput
                                style={style.input}
                                placeholder='Full name'
                                placeholderTextColor='#0ebeeb'
                                value={fullName}
                                onChangeText={setFullName}
                            />
                            <TextInput
                                style={style.input}
                                placeholder='DoB (MM/DD/YY)'
                                placeholderTextColor='#0ebeeb'
                                value={DoB.toLocaleDateString()}
                                onFocus={() => setShowDatePicker(true)}
                                editable={true}
                            />
                            {/* Component to actually input date */}
                            {showDatePicker && (
                                <DateTimePicker
                                    value={DoB}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <TextInput
                                style={style.input}
                                placeholder='Sex? (m/f)'
                                placeholderTextColor='#0ebeeb'
                                value={sex}
                                onChangeText={setSex}
                                maxLength={1}
                            />
                            {
                                sex.toLowerCase === 'female'|| sex.toLowerCase === 'woman' || sex.toLowerCase === 'f' && (
                                    <>
                                        <TextInput
                                            style={style.input}
                                            placeholder='Number of preganices'
                                            placeholderTextColor='#0ebeeb'
                                            keyboardType='numeric'
                                            value={preganices}
                                            onChangeText={setPreganices}
                                        />
                                    </>
                                )
                            }
                            <TextInput
                                style={style.input}
                                placeholder='Ethnicity'
                                placeholderTextColor='#0ebeeb'
                                value={Nationality}
                                onChangeText={setNationality}
                            />
                            <TextInput 
                                style={style.input}
                                placeholder='Enter email Address'
                                placeholderTextColor='#0ebeeb'
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput 
                                style={style.input}
                                placeholder='Enter phone number'
                                placeholderTextColor='#0ebeeb'
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                            <TouchableOpacity style={style.submission} onPress={ () => ScreenChangeFromHome()}>
                                <Text>Next</Text>
                            </TouchableOpacity>
                            <Text style={style.Message}>{message}</Text>
                        </ScrollView>
                        </View>
                    </>
                )}
                {
                    currentScreen == 'HealthMetrics' && (
                        <>
                            <ScrollView contentContainerStyle={style.formContainer} showsVerticalScrollIndicator={false}>
                                <Text style={style.subHeadingText}>Your Health Metrics</Text>
                                <Text style={style.subText}>Your health data helps us provide a more personalized risk assessment. Please enter your latest measurements.</Text>
                                <Text style={style.subTitle}>Body Mass Index (BMI) ⚖️</Text>
                                <Text style={style.subText}>Enter your weight and height:</Text>
                                {
                                    !isMetric ? (
                                        <>
                                        <TextInput style={style.inputMetrics}
                                         placeholder='0 LBS'
                                         keyboardType='numeric'
                                         placeholderTextColor='rgba(14, 191, 235, 0.33)'
                                         value={weight}
                                         onChangeText={setWeight}
                                        />
                                        <Text style={style.showText}>Weight: {weight} Lbs</Text>
                                        <TextInput style={style.inputMetrics}
                                         placeholder='0 inches'
                                         keyboardType='numeric'
                                         placeholderTextColor='rgba(14, 191, 235, 0.33)'
                                         value={height}
                                         onChangeText={setHeight}
                                        />
                                        <Text style={style.showText}>Inches: {height}</Text>
                                        <TouchableOpacity style={style.converterButton} onPress={() => setIsMetric(true)}>
                                            <Text>Metric</Text>
                                        </TouchableOpacity>
                                        </>
                                    ) :
                                    (
                                        <>
                                        
                                        <TextInput style={style.inputMetrics}
                                         placeholder='0 KG'
                                         keyboardType='numeric'
                                         placeholderTextColor='rgba(14, 191, 235, 0.33)'
                                         value={weightKG}
                                         onChangeText={setWeightKG}
                                        />
                                        <Text style={style.showText}>Weight: {weightKG} KGs</Text>
                                        <TextInput style={style.inputMetrics}
                                         placeholder='0 centimeters'
                                         keyboardType='numeric'
                                         placeholderTextColor='rgba(14, 191, 235, 0.33)'
                                         value={heightCM}
                                         onChangeText={setHeightCM}
                                        />
                                        <Text style={style.showText}>Centimeters: {heightCM}</Text>
                                        <TouchableOpacity style={style.converterButton} onPress={() => setIsMetric(false)}>
                                            <Text>Imperial</Text>
                                        </TouchableOpacity>
                                        </>
                                    )

                                }
                                { isMetric ? (

                                        <Text style={style.showText}>BMI: {BMI}</Text>
                                    ): (
                                        <Text style={style.showText}>BMI: {BMIimperial}</Text>
                                    )
                                }
                                <Text style={style.subTitle}>Blood Group</Text>
                                    <Picker
                                        selectedValue={bloodGroup}
                                        onValueChange={(itemValue) => setBloodGroup(itemValue)}
                                        style={style.picker}
                                        itemStyle={style.pickerItem}
                                    >
                                        <Picker.Item label="Select Blood Group" value="" />
                                        <Picker.Item label="A+" value="A+" />
                                        <Picker.Item label="A-" value="A-" />
                                        <Picker.Item label="B+" value="B+" />
                                        <Picker.Item label="B-" value="B-" />
                                        <Picker.Item label="AB+" value="AB+" />
                                        <Picker.Item label="AB-" value="AB-" />
                                        <Picker.Item label="O+" value="O+" />
                                        <Picker.Item label="O-" value="O-" />
                                    </Picker>
                                <Text style={style.showText}>Selected Blood Group: {bloodGroup}</Text>

                                <Text style={style.subTitle}>Blood Sugar Levels (mg/dL) 🩸</Text>


                                {/* Make sure to ask if they were fasting or eating or not eating */}
                                <TextInput
                                    style={[style.input, style.placeholderText]}
                                    placeholder='Enter your most recent blood sugar level(mg/dL):'
                                    keyboardType='numeric'
                                    value={bloodSugar}
                                    onChangeText={(text) => setBloodSugar(text)}
                                    maxLength={3}

                                />
                                {
                                  bloodSugar && (
                                    <>
                                    <View>
                                        <RadioButton
                                        label="Before eating/fasting"
                                        selected={bloodSugarTime === "fasting"}
                                        onPress={() => setBloodSugarTime("fasting")}
                                        />
                                        <RadioButton
                                        label="Just finished eating"
                                        selected={bloodSugarTime === "AfterEating"}
                                        onPress={() => setBloodSugarTime("AfterEating")}
                                        />
                                        <RadioButton
                                        label="a few hours after my meal"
                                        selected={bloodSugarTime === "ThreeHoursAfter"}
                                        onPress={() => setBloodSugarTime("ThreeHoursAfter")}
                                        />
                                    </View>
                                    </>
                                  )  
                                }
                                
                                <Text style={style.subText}>(Vlaues change depending on the period)</Text>
                                <Text style={style.subText}>The period (i.e fasting, after a meal, etc.) when blood sugar was recorded is crucial information</Text>

                                <Text style={style.subTitle}>HbA1c (%) 🧪</Text>
                                <TextInput
                                    style={[style.input, style.placeholderText]}
                                    placeholder='Enter your last HbA1c test result (if available):'
                                    placeholderTextColor='#0ebeeb'
                                    keyboardType='numeric'
                                    maxLength={3}
                                    value={HbA1c}
                                    onChangeText={(text) => setHbA1c(text)}

                                />
                                <Text style={style.subText}>Reference Ranges: (Below input for guidance)</Text>
                                <Text style={style.subText}>Normal: Below 5.7%</Text>
                                <Text style={style.subText}>Prediabetes: 5.7% - 6.4%</Text>
                                <Text style={style.subText}>Diabetes: 6.5% or higher</Text>

                                <Text style={style.subTitle}>Blood Pressure (mmHg) 🩺</Text>

                                <TextInput
                                    style={[style.input, style.placeholderText]}
                                    placeholder='Enter your most recent blood pressure reading:'
                                    placeholderTextColor='#0ebeeb'
                                    keyboardType='numeric'
                                    value={BP}
                                    onChangeText={(text) => formatBPInput(text)}
                                    maxLength={7}
                                />
                                {
                                    FindSystolic(BP) >= 180 || FindDiastolic(BP) >= 120 && (
                                        <>
                                            <TouchableOpacity onPress={() => setCurrentScreen("Emer")}></TouchableOpacity>
                                        </>
                                    )
                                }
                                <Text style={style.subText}>Reference Ranges: (Below input for guidance)</Text>
                                <Text style={style.subText}>Normal: Less than 120/80 mmHg</Text>
                                <Text style={style.subText}>Hypertension: 130/80 mmHg or higher</Text>
                                {/*                                         construction                             */}
                                <TouchableOpacity style={style.submission} onPress={ () => ScreenChangeFromMetrics()}>
                                    <Text>Next</Text>
                                </TouchableOpacity>
                                <Text style={style.Message}>{message}</Text>
                            </ScrollView>
                        </>
                    )
                }
                {
                    currentScreen === 'History' && (
                        <>
                            <ScrollView contentContainerStyle={style.formContainer} showsVerticalScrollIndicator={false}>
                                <Text style={style.subHeadingText}>Family History of Diabetes</Text>
                                <Text style={style.subText}>Diabetes can run in families. Please let us know if any of your close relatives have had diabetes.</Text>
                                <View style={style.row}>
                                    <TouchableOpacity style={style.optionsToHistory} onPress={() => {setSwitchToPicker(true); setSwitchToFile(false);}}>
                                        <Text>Manual</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.optionsToHistory} onPress={() => {setSwitchToPicker(false); setSwitchToFile(true);}}>
                                        <Text>File</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    SwitchToPicker && (
                                        <>  
                                            
                                            <Text style={style.subText}>Select family members who already have diabetes</Text>
                                            {/* <View style={style.row2}>
                                                <TouchableOpacity style={style.RelationsNum}>
                                                    <Text>1</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.RelationsNum}>
                                                    <Text>2</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.RelationsNum}>
                                                    <Text>3</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.RelationsNum}>
                                                    <Text>4</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={style.RelationsNum}>
                                                    <Text>4+</Text>
                                                </TouchableOpacity>
                                            </View> 
                                                
                                                This is redacted to far, keep this just incase for future
                                            */}
                                                {/* <Picker
                                                    selectedValue={relation}
                                                    onValueChange={(itemValue) => setRelation(itemValue)}
                                                    style={style.picker}
                                                    itemStyle={style.pickerItem}
                                                >
                                                    <Picker.Item label="Select Relation" value="" />
                                                    <Picker.Item label="close family" value="close family only" />
                                                    <Picker.Item label="extended family " value="extended family only" />
                                                    <Picker.Item label="distant " value="distant family only" />
                                                    <Picker.Item label="close and extended" value="close and extended families only" />
                                                    <Picker.Item label="distant and extended" value="distant and extended families only" />
                                                    <Picker.Item label="close and distant" value="close and distant family only" />
                                                    <Picker.Item label="Scattered" value="Scattered through out all types, ext., close, and distant " />
                                            </Picker> */}
                                            <View>
                                            <Checkbox
                                              label="Parents (Mother/Father)"
                                              selected={relation.includes('Has Parents (Mother/Father) with diabetes')}
                                              onPress={() => toggleOptionForRelation('Has Parents (Mother/Father) with diabetes')}
                                            />
                                            <Checkbox
                                              label="Siblings (Brother/Sister)"
                                              selected={relation.includes('Has Siblings (Brother/Sister) with diabetes')}
                                              onPress={() => toggleOptionForRelation('Has Siblings (Brother/Sister) with diabetes')}
                                            />
                                            <Checkbox
                                              label="Grandparents (Maternal/Paternal)"
                                              selected={relation.includes('Has Grandparents (Maternal/Paternal) with diabetes')}
                                              onPress={() => toggleOptionForRelation('Has Grandparents (Maternal/Paternal) with diabetes')}
                                            />
                                            <Checkbox
                                              label="None"
                                              selected={relation.includes('Has no family members with diabetes')}
                                              onPress={() => toggleOptionForRelation('Has no family members with diabetes')}
                                            />
                                            </View>
                                            {   !relation.includes('Has no family members with diabetes') && relation.length !== 0 && (
                                                <>
                                                    <Text style={style.subText}>Additional Details</Text>
                                                    <TextInput
                                                        style={[style.otherInput, style.placeholderText]}
                                                        placeholder='At what age was your relative diagnosed?'
                                                        placeholderTextColor='#0ebeeb'
                                                        value={ageAtDiagnosis}
                                                        onChangeText={setAgeAtDiagnosis}
                                                    />
                                                </>
                                                )
                                            }
                                        </>
                                    ) 
                                }
                                {
                                    switchToFile && (
                                        <>
                                        {geneticReport ? (
                                            <View>
                                            <Text style={style.subTitle}>If possible, add genetic reports of your family members</Text>
                                            <TouchableOpacity style={style.fileUpload} onPress={FileUpload}>
                                             {geneticReport.map((file, index) =>
                                                 <>
                                                     <Text key={index} style={style.uploadText}>{file.name ? `File ${index + 1}: ${file.name}`:`File ${index+1}: unknown`}</Text>
                                                     <Text style={style.uploadText}>{file.size ? `size: ${ConversionData(file.size)}`:`size: unknown`}</Text>
                                                 </> 
                                             )}
                                             </TouchableOpacity>
                                             </View>
                                             ) : (
                                             <>
                                                 <TouchableOpacity style={style.fileUpload} onPress={FileUpload}>
                                                 <VectorPngIcons
                                                     name='file-upload'
                                                     color='white'
                                                     size={100}
                                                     style={style.VectorPng}
                                                 />
                                                 </TouchableOpacity>
                                             </>
                                        )}
                                        </>
                                    )
                                }
                                <TouchableOpacity style={style.submission} onPress={() => ScreenChangeFromHistory()}>
                                    <Text>Next➡</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </>
                    )
                }
                {   
                    currentScreen === 'Habits' && (
                    <>
                        <ScrollView contentContainerStyle={style.formContainer} showsVerticalScrollIndicator={false}>
                        <Text style={style.subHeadingText}>About you</Text>
                        <Text style={style.subTitle}>Physical activity</Text>
                        
                        <View style={style.radioButtonContainer}>
                        <RadioButton
                            label="🏠Sedetary (Little to no physical activity)"
                            selected={PhysicalActivity === "Sedetary (Little to no physical activity)"}
                            onPress={() => setPhysicalActivity("Sedetary (Little to no physical activity)")}
                          />
                        
                       <RadioButton
                            label="🚶Light active(walking 1-2 times a week)"
                            selected={PhysicalActivity === "Light active(walking 1-2 times a week)"}
                            onPress={() => setPhysicalActivity("Light active(walking 1-2 times a week)")}
                          />
                       <RadioButton
                            label="🏃Moderately Active (Regular exercise)  "
                            selected={PhysicalActivity === "Moderately Active (Regular exercise)"}
                            onPress={() => setPhysicalActivity("Moderately Active (Regular exercise)")}
                          />
                          <RadioButton
                            label="💪 Highly Active (Daily exercise or sports)"
                            selected={PhysicalActivity === "Highly Active (Daily exercise or sports)"}
                            onPress={() => setPhysicalActivity("Highly Active (Daily exercise or sports)")}
                          />
                        </View>

                        <Text style={style.subTitle}>Dietary Habits</Text>

                        <View style={style.radioButtonContainer}>
                        <RadioButton
                            label="🍕 High in sugar"
                            selected={Diet === "High sugar"}
                            onPress={() => setDiet("High sugar")}
                          />
                        
                       <RadioButton
                            label="🍔 High in processed food"
                            selected={Diet === "High in processed food"}
                            onPress={() => setDiet("High in processed food")}
                          />
                       <RadioButton
                            label="🥗 Balanced diet"
                            selected={Diet === "balanced diet"}
                            onPress={() => setDiet("balanced diet")}
                          />
                          <RadioButton
                            label="🥩High protein-based " 
                            selected={Diet === "High protein-based"}
                            onPress={() => setDiet("High protein-based")}
                          />
                          <RadioButton
                            label="🌱 Vegetarian / Vegan" 
                            selected={Diet === "Veg/vegan"}
                            onPress={() => setDiet("Veg/vegan")}
                          />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.subTitle}>Health Conditions</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('TermsHealth')}>
                                <Text>ℹ️</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.radioButtonContainer}>
                        <Checkbox
                          label="None"
                          selected={healthConditions.includes('none')}
                          onPress={() => toggleOption('none')}
                        />
                        <Checkbox
                          label="Hypertension"
                          selected={healthConditions.includes('Has Hypertension')}
                          onPress={() => toggleOption('Has Hypertension')}
                        />
                        <Checkbox
                          label="High cholesterol"
                          selected={healthConditions.includes('Has High cholesterol')}
                          onPress={() => toggleOption('Has High cholesterol')}
                        />
                        <Checkbox
                          label="Prediabetes"
                          selected={healthConditions.includes('Has Prediabetes')}
                          onPress={() => toggleOption('Has Prediabetes')}
                        />
                        <Checkbox
                          label="Polycystic ovary syndrome (PCOS)"
                          selected={healthConditions.includes('Has PCOS or Polycystic ovary syndrome')}
                          onPress={() => toggleOption('Has PCOS or Polycystic ovary syndrome')}
                        />
                        
                        <Checkbox
                          label="Other"
                          selected={healthConditions.includes('other')}
                          onPress={() => toggleOption('other')}
                        />
                        {
                            healthConditions.includes('other') && (
                                <>
                                    <TextInput style={style.otherInput}
                                     placeholder='include others'
                                     placeholderTextColor='#0ebeeb'
                                     value={otherCondition}
                                     onChangeText={healthConditions.includes(setOtherCondition)}
                                    />
                                </>
                            )
                        }
                        </View>

                        <Text style={style.subTitle}>Smoking and Alcohol Consumption</Text>
                        
                        <View>
                        <Checkbox
                          label="🚬 Yes I do smoking"
                          selected={habits.includes('Yes I smoke')}
                          onPress={() => toggleOption2('Yes I smoke')}
                        />
                        <Checkbox
                          label="🍺 Yes I have alcohol consumption:"
                          selected={habits.includes('Yes I drink Alcohol')}
                          onPress={() => toggleOption2('Yes I drink Alcohol')}
                        />
                        {
                            habits.includes('Yes I drink Alcohol') && (
                                <>
                                    <Checkbox
                                      label="🥂 Occasionally"
                                      selected={alcohol.includes('Occasionally')}
                                      onPress={() => toggleOptionForAlcohol('Occasionally')}
                                    />
                                    <Checkbox
                                      label="🥴 Frequently"
                                      selected={alcohol.includes('Frequently')}
                                      onPress={() => toggleOptionForAlcohol('Frequently')}
                                    />
                                    <Checkbox
                                      label="🍾 Only in social events"
                                      selected={alcohol.includes('Only in social events')}
                                      onPress={() => toggleOptionForAlcohol('Only in social events')}
                                    />
                                    <Checkbox
                                      label="🤕 Alcoholic"
                                      selected={alcohol.includes('Alcoholic')}
                                      onPress={() => toggleOptionForAlcohol('Alcoholic')}
                                    />
                                </>
                            )
                        }
                        <Checkbox
                          label="Neither"
                          selected={habits.includes("I don't smoke nor drink")}
                          onPress={() => toggleOption2("I don't smoke nor drink")}
                        />
                        </View>

                        <Text style={style.subTitle}>Stress Levels</Text>

                        <View style={style.radioButtonContainer}>
                        <RadioButton
                            label="😌 Low"
                            selected={stress === "Has low stress"}
                            onPress={() => setStress("Has low stress")}
                          />
                        <RadioButton
                            label="😐 Moderate"
                            selected={stress === " Has Moderate stress"}
                            onPress={() => setStress(" Has Moderate stress")}
                          />
                        <RadioButton
                            label="😟 High"
                            selected={stress === "Has High Stress"}
                            onPress={() => setStress("Has High Stress")}
                          />
                        </View>
                        <TouchableOpacity style={style.submission} onPress={() => ScreenChangeFromHabits()}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                        <Text style={style.Message}>{message}</Text>
                        </ScrollView>
                    </>
                    )
                }
                {
                    currentScreen === 'Final' && (
                        <>
                            <ScrollView contentContainerStyle={style.formContainer} showsVerticalScrollIndicator={false}>
                                <Text style={style.subHeadingText}>Review Your Information</Text>
                                <Text style={style.subText}>You're almost there!</Text>
                                { finalScreen === 'First' && 
                                    (
                                        <>
                                            <View style={style.HeaderRow}>
                                                
                                                <View style={style.row3}>
                                                    <Image source={ProfileIcon} style={style.ProfileIcon} resizeMode="contain"/>
                                                    <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
                                                        <Image source={editIcon} style={style.editIconStyle}></Image>
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={style.boxText}>Personal info</Text>
                                                <Text style={style.boxText2}>Full name: {fullName || 'Not stated'}</Text>
                                                <Text style={style.boxText2}>Gender: {sex || 'Not stated'}</Text>
                                                <Text style={style.boxText2}>Date of Birth: {DoB instanceof Date && !isNaN(DoB.getTime()) && DoB.toDateString() !== new Date().toDateString() ? DoB.toDateString() : 'Not stated'}</Text>
                                                <Text style={style.boxText2}>Nationality: {Nationality || 'Not stated'}</Text>
                                                <Text style={style.boxText2}>Email: {email || 'Not given'}</Text>
                                                <Text style={style.boxText2}>Phone Number: {phoneNumber || 'Not given'}</Text>

                                                <Text style={style.boxText3}>If the information above is not correct please edit it</Text>

                                                
                                            </View>
                                            <TouchableOpacity style={style.submission} onPress={() => setFinalScreen('Second')}>
                                                <Text>Next</Text>
                                            </TouchableOpacity>
                                        </>
                                    )
                                    }
                                    {/* Bru                                  */}
                                    {
                                    finalScreen === 'Second' && (
                                            <>
                                                <ScrollView contentContainerStyle={style.formContainer} showsVerticalScrollIndicator={false}>
                                                    {/* ADD DYNAMIC AND COOL STUFF */}
                                                    <View style={style.BMIbox}>
                                                        <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>

                                                        <Text style={style.BoxText_1}>Body Mass Index</Text>
                                                        { !isMetric ? (
                                                                <>
                                                                    {BMIimperial < underweightLimit && (
                                                                        <>
                                                                            <Image source={BMI_underweight} style={style.BMI}/>
                                                                        </>
                                                                    )}
                                                                    {
                                                                        BMIimperial >= underweightLimit && BMIimperial <= healthyLimit && (
                                                                            <>
                                                                                <Image source={BMI_Healthy}  style={style.BMI}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                    {
                                                                        BMIimperial > Number(range.healthy) && BMIimperial <= Number(range.overweight) && (
                                                                            <>
                                                                                <Image source={BMI_Overweight} style={style.BMI}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                    {
                                                                        BMIimperial >  Number(range.overweight) && (
                                                                            <>
                                                                                <Image source={BMI_Obese} style={style.BMI}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                </>
                                                            ) : ( 
                                                                <>
                                                                    {BMI < underweightLimit && (
                                                                        <>
                                                                            <Image source={BMI_underweight} style={style.BMI}/>
                                                                        </>
                                                                    )}
                                                                    {
                                                                        BMI >= underweightLimit && BMI <= healthyLimit && (
                                                                            <>
                                                                                <Image source={BMI_Healthy}  style={style.BMI}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                    {
                                                                        BMI > Number(range.healthy) && BMI <= Number(range.overweight) && (
                                                                            <>
                                                                                <Image source={BMI_Overweight} style={style.BMI}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                    {
                                                                        BMI >  Number(range.overweight) && (
                                                                            <>
                                                                                <Image source={BMI_Obese} style={style.BMI}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        { isMetric ? (
                                                            <>
                                                                {BMI < underweightLimit && (
                                                                    <>
                                                                        <Text style={style.BMITextUnderweight}>BMI: {BMI  || 'Not given'}</Text>
                                                                        
                                                                    </>
                                                                )}
                                                                {
                                                                    BMI >= underweightLimit && BMI <= healthyLimit && (
                                                                        <> 
                                                                            <Text style={style.BMITextHealthy}>BMI: {BMI  || 'Not given'}</Text>
                                                                        
                                                                      </>
                                                                    )
                                                                }
                                                                {
                                                                    BMI > Number(range.healthy) && BMI <= Number(range.overweight) && (
                                                                        <>
                                                                            <Text style={style.BMITextOverweight}>BMI: {BMI  || 'Not given'}</Text>
                                                                            
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    BMI >  Number(range.overweight) && (
                                                                        <>
                                                                            <Text style={style.BMITextObese}>BMI: {BMI  || 'Not given'}</Text>
                                                                            
                                                                    </>
                                                                    )
                                                                }
                                                            </>
                                                            ):(
                                                                <>
                                                                {BMIimperial < underweightLimit && (
                                                                    <> 
                                                                        <Text style={style.BMITextUnderweight}>BMI: {BMIimperial  || 'Not given'}</Text>
                                                                        
                                                                    </>
                                                                )}
                                                                {
                                                                    BMIimperial >= underweightLimit && BMIimperial <= healthyLimit && (
                                                                        <> 
                                                                            <Text style={style.BMITextHealthy}>BMI: {BMIimperial  || 'Not given'}</Text>
                                                                            
                                                                      </>
                                                                    )
                                                                }
                                                                {
                                                                    BMIimperial > Number(range.healthy) && BMIimperial <= Number(range.overweight) && (
                                                                        <>
                                                                            <Text style={style.BMITextOverweight}>BMI: {BMIimperial  || 'Not given'}</Text>
                                                                            
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    BMIimperial >  Number(range.overweight) && (
                                                                        <>
                                                                            <Text style={style.BMITextObese}>BMI: {BMIimperial  || 'Not given'}</Text>
                                                                            
                                                                    </>
                                                                    )
                                                                }
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </View>
                                                    <View style={style.Weightbox}>
                                                        <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>

                                                        <Text style={style.BoxText_1}>Weight</Text>
                                                        {
                                                            isMetric ? (
                                                                <>
                                                                    <Image source={WeightKGImage} style={style.weight} resizeMode='contain'/>
                                                                    <Text style={style.weightText}>Weight: {weightKG || 'No weight given'} Kgs</Text>
                                                                </>
                                                            ):(
                                                                <>
                                                                    <Image source={WeightLBSImage} style={style.weight} resizeMode='contain'/>
                                                                    <Text style={style.weightText}>Weight: {weight || 'No weight given'} lbs</Text>
                                                                </>
                                                            )
                                                        }
                                                    </View>

                                                    <View style={style.BMIbox}>
                                                        <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>
                                                        
                                                        <Text style={style.BoxText_1}>Height</Text>
                                                        <View style={style.row3}>
                                                            <Image source={Height} style={style.Height} resizeMode='contain'/>
                                                            {!isMetric ? (
                                                                <Text style={style.HeightText}>{height || 'Not given'} inches</Text>
                                                            ):(
                                                                <Text style={style.HeightText}>{heightCM || 'Not given'}centimeters</Text>   
                                                            )}
                                                        </View>
                                                    </View>
                                                    
                                                    <View style={style.Weightbox}>
                                                        <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>
                                                        <Text style={style.BoxText_1}>Blood Group</Text>
                                                        {/*"A+"
                                                           "A-"
                                                           "B+"
                                                           "B-"
                                                           ="AB
                                                           ="AB
                                                           "O+"
                                                           "O-" */}
                                                           {
                                                            bloodGroup === "A+" && (
                                                                <>
                                                                    <Image source={BloodTypeApos} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                           {
                                                            bloodGroup === "A-" && (
                                                                <>
                                                                    <Image source={BloodTypeA} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                           {
                                                            bloodGroup === "B+" && (
                                                                <>
                                                                    <Image source={BLoodTypeBpos} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                           {
                                                            bloodGroup === "B-" && (
                                                                <>
                                                                    <Image source={BLoodTypeB} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                           {
                                                            bloodGroup === "AB-" && (
                                                                <>
                                                                    <Image source={BloodTypeAB} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                           {
                                                            bloodGroup === "AB+" && (
                                                                <>
                                                                    <Image source={BloodTypeABpos} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                           {
                                                            bloodGroup === "O-" && (
                                                                <>
                                                                    <Image source={BloodTypeO} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                           {
                                                            bloodGroup === "O+" && (
                                                                <>
                                                                    <Image source={BloodTypeOpos} style={style.BMI} resizeMode='contain'/>
                                                                </>
                                                            )
                                                           }
                                                    </View>
                                                    <View style={style.BMIbox}>
                                                        <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>
                                                        <Text style={style.BoxText_1}>HbA1c</Text>
                                                        {
                                                            HbA1c < 5.7 && (
                                                                <>
                                                                    <Image source={HbA1c_optimal} style={style.HbA1c} resizeMode = 'contain'/>
                                                                    <Text style={style.HbA1c_optimal}>{HbA1c}%</Text>
                                                                </>
                                                                )
                                                        }
                                                        {
                                                            HbA1c >= 5.7 && HbA1c <= 6.4 && (
                                                                <>
                                                                    <Image source={HbA1c_Elevated} style={style.HbA1c} resizeMode = 'contain'/>
                                                                    <Text style={style.HbA1c_Elevated}>{HbA1c}%</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            HbA1c > 6.4 && (
                                                                <>
                                                                    <Image source={HbA1c_High} style={style.HbA1c} resizeMode = 'contain'/>
                                                                    <Text style={style.HbA1c_High}>{HbA1c}%</Text>
                                                                </>
                                                                )
                                                        }
                                                    </View>
                                                    <View style={style.Weightbox}>
                                                        <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>
                                                        <Text style={style.BoxText_1}>Blood sugar levels</Text>
                                                        {
                                                            BloodSugaa === 'Normal' && (
                                                                <>
                                                                    <Image source={Normal} style={style.HbA1c} resizeMode='contain'/>
                                                                    <Text style={HbA1c}>Blood sugar status seems to be in a </Text>
                                                                    <Text style={HbA1c}>normal state</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            BloodSugaa === 'Prediabetic' && (
                                                                <>
                                                                    <Image source={Prediabetic} style={style.HbA1c} resizeMode='contain'/>
                                                                    <Text style={HbA1c}>Blood sugar status seems to be in a </Text>
                                                                    <Text style={HbA1c}>prediabetic state</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            BloodSugaa === 'Diabetic' && (
                                                                <>
                                                                    <Image source={Diabetic} style={style.HbA1c} resizeMode='contain'/>
                                                                    <Text style={HbA1c}>Blood sugar status seems to be in a </Text>
                                                                    <Text style={HbA1c}>diabetic state</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            BloodSugaa === 'Low Sugar' && (
                                                                <>
                                                                    <Image source={LowSugar} style={style.HbA1c} resizeMode='contain'/>
                                                                    <Text style={HbA1c}>Blood sugar status seems to be in a </Text>
                                                                    <Text style={HbA1c}>low sugar state</Text>
                                                                </>
                                                            )
                                                        }
                                                    </View>
                                                    <View style={style.BMIbox}>
                                                        <Text style={style.BoxText_1}>Blood Pressure</Text>
                                                        {
                                                            FindSystolic(BP) < 120 && FindDiastolic(BP) < 80 && (
                                                                <>
                                                                    <Image source={NormalBP} style={style.HbA1c}/>
                                                                    <Text>Your blood pressure is normal</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            FindSystolic(BP) >= 120 && FindSystolic(BP) <= 129 && FindDiastolic(BP) < 80 && (
                                                                <>
                                                                    <Image source={ElevatedBP} style={style.HbA1c}/>
                                                                    <Text>Your blood pressure is elevated</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            FindSystolic(BP) === 120 && FindDiastolic(BP) === 80 && (
                                                                <>
                                                                    <Image source={NormalBP} style={style.HbA1c}/>
                                                                    <Text>Your blood pressure is normal</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            FindSystolic(BP) >= 130 && FindSystolic(BP) <= 139 || FindDiastolic(BP) > 80 && FindDiastolic(BP) <= 89 && (
                                                                <>
                                                                   
                                                                    <Image source={Prediabetic} style={style.HbA1c}/> 
                                                                    <Text style={HbA1c}>Blood pressure is high!</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            FindSystolic(BP) >= 140 && FindDiastolic(BP) >= 90 && (
                                                                <>
                                                                    <Image source={Prediabetic} style={style.HbA1c}/> 
                                                                    <Text>You are in a dangerous state</Text>
                                                                </>
                                                            )
                                                        }
                                                    </View>
                                                    {/* Fix metric side of BMI, add the % after H1aBc or what ever, 
                                                        create visuals for them: BP
                                                    */}
                                                    <TouchableOpacity style={style.submission} onPress={() => setFinalScreen('Third')}>
                                                        <Text>Next</Text>
                                                    </TouchableOpacity>
                                                </ScrollView>
                                            </>
                                    )
                                    }
                                    {
                                        finalScreen === 'Third' && (
                                            <>
                                            <View style={style.HeaderRow}>
                                              <Text style={style.boxText}>Family History of Diabetes</Text>
                                                                                                                              
                                              {/* Check if "None" is selected */}
                                              {relation.includes('Has no family members with diabetes') ? (
                                                <View style={style.textContainer}>
                                                  <Text style={style.boxText2}>No family members with diabetes</Text>
                                                </View>
                                              ) : (
                                                // Map through the selected family members
                                                relation.map((member, index) => (
                                                  <View key={index} style={{justifyContent: "center", alignItems:"center"}}>
                                                    <Text style={style.boxText2}>
                                                      {member.replace('Has ', '').replace(' with diabetes', '')}
                                                    </Text>
                                                  </View>
                                                ))
                                              )}
                                            </View>
                                            <TouchableOpacity style={style.submission} onPress={() => setFinalScreen('Fourth')}>
                                              <Text>Next</Text>
                                            </TouchableOpacity>
                                            </>
                                        )
                                    }
                                    {
                                        finalScreen === 'Fourth' && (
                                            <>
                                                <View style={style.BMIbox}>
                                                        <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>
                                                        <Text style={style.BoxText_1}>Physical Activity</Text>
                                                        {
                                                            PhysicalActivity === 'Sedetary (Little to no physical activity)' && (
                                                                <>
                                                                    <Text style={style.ImageText}>🏠</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            PhysicalActivity === 'Light active(walking 1-2 times a week)' && (
                                                                <>
                                                                    <Text style={style.ImageText}>🚶</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            PhysicalActivity === 'Moderately Active (Regular exercise)' && (
                                                                <>
                                                                    <Text style={style.ImageText}>🏃</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            PhysicalActivity === 'Highly Active (Daily exercise or sports)' && (
                                                                <Text style={style.ImageText}>💪</Text>
                                                            )
                                                        }
                                                        <Text>{PhysicalActivity}</Text>
                                                </View>

                                                <View style={style.Weightbox}>
                                                <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                            <Image source={editIcon}style={style.editIconStyle2}/>
                                                        </TouchableOpacity>
                                                        <Text style={style.BoxText_1}>Diet</Text>
                                                        {
                                                            Diet === 'balanced diet' && (
                                                                <>
                                                                    <Text style={style.ImageText}>🥗</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            Diet === 'High sugar' && (
                                                                <>
                                                                    <Text style={style.ImageText}>🍕</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            Diet === 'High in processed food' && (
                                                                <>
                                                                    <Text style={style.ImageText}>🍔</Text>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            Diet === 'High protein-based' && (
                                                                <Text style={style.ImageText}>🥩</Text>
                                                            )
                                                        }
                                                        {
                                                            Diet === 'Veg/vegan' && (
                                                                <Text style={style.ImageText}>🌱</Text>
                                                            )
                                                        }
                                                        <Text>{Diet}</Text>
                                                </View>

                                                <View style={style.BMIbox}>
                                                    <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                        <Image source={editIcon}style={style.editIconStyle2}/>
                                                    </TouchableOpacity>
                                                    <Text style={style.BoxText_1}>Health Conditions</Text>
                                                    {healthConditions.includes('none') ? (
                                                        <View style={style.textContainer}>
                                                          <Text style={style.boxText2}>No Health Conditions</Text>
                                                        </View>
                                                    ) : (
                                                      // Map through the selected family members
                                                      healthConditions.map((member, index) => (
                                                        <View key={index} style={{justifyContent: "center", alignItems:"center"}}>
                                                          <Text style={style.boxText2}>
                                                            {member.replace('Has ', '')}
                                                          </Text>
                                                        </View>
                                                      ))
                                                    )}
                                                </View>

                                                <View style={style.Weightbox}>
                                                    <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                        <Image source={editIcon} style={style.editIconStyle2} />
                                                    </TouchableOpacity>
                                                    <Text style={style.BoxText_1}>Smoking and Alcohol Consumption</Text>
                                                    {
                                                        habits.includes("Yes I smoke") && (
                                                            <Text style={style.boxText2}>🚬 Smokes</Text>
                                                        )
                                                    }
                                                    {
                                                        habits.includes("Yes I drink Alcohol") && (
                                                            <>
                                                                <Text style={style.boxText2}>🍺 Drinks Alcohol</Text>
                                                                {alcohol.map((type, index) => (
                                                                    <Text key={index} style={style.boxText2}>{type}</Text>
                                                                ))}
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        habits.includes("I don't smoke nor drink") && (
                                                            <Text style={style.boxText2}>Neither smokes nor drinks</Text>
                                                        )
                                                    }
                                                </View>
                                                <View style={style.BMIbox}>
                                                    <TouchableOpacity style={style.iconContainer} OnPress={() => "PlaceHolder"}>
                                                        <Image source={editIcon}style={style.editIconStyle2}/>
                                                    </TouchableOpacity>
                                                    <Text style={style.BoxText_1}>Stress levels</Text>
                                                    {
                                                        stress === "Has low stress" && (
                                                            <Text style={style.ImageText}>😌</Text>
                                                        )
                                                    }
                                                    {
                                                        stress === " Has Moderate stress" && (
                                                            <Text style={style.ImageText}>😐</Text>
                                                        )
                                                    }
                                                    {
                                                        stress === "Has High stress" && (
                                                            <Text style={style.ImageText}>😞</Text>
                                                        )
                                                    }
                                                </View>
                                                <TouchableOpacity style={style.submission} onPress={async () => {
                                                        const UserData = {                           
                                                            Pregnancies: Number(preganices) || 0,
                                                            Glucose: Number(bloodSugar) || 0,
                                                            BloodPressure: Number(FindSystolic(BP)) || 0,
                                                            SkinThickness: 20, 
                                                            Insulin: 85,       
                                                            BMI: isMetric ? Number(BMI) : Number(BMIimperial),
                                                            DiabetesPedigreeFunction: Number(pedigree) || 0,
                                                            Age: calculateAge(DoB)
                                                        };

                                                        try {
                                                            setIs_Loading(true);
                                                            const API_URL = 'https://medrlx-diabetes-api.onrender.com'
                                                            const response = await fetch(`${API_URL}/api/predict`, {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify(UserData),
                                                            });
                                                            const result = await response.json();
                                                            setIs_Loading(false);

                                                            if (result.prediction !== undefined) {
                                                                Alert.alert(
                                                                    result.prediction === 1 ? "Diabetes Risk" : "Low Diabetes Risk",
                                                                    `Probability: ${(result.probability * 100).toFixed(2)}%\n\n${result.feedback ? result.feedback.join('\n') : ''}`,
                                                                    [
                                                                        {
                                                                            text: "Understood",
                                                                            onPress: () => {
                                                                                navigation.navigate('WelcomeScreen');
                                                                            }
                                                                        }
                                                                    ]
                                                                );
                                                            } 
                                                            else {
                                                                Alert.alert("Error", "No prediction received from server.");
                                                            }
                                                        }
                                                        catch (error) {
                                                            setIs_Loading(false);
                                                            Alert.alert("Error", `Failed to connect to the server. \n   ${error.message}`);
                                                        }
                                                    }
                                                }>
                                                    <Text>Submit</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }
                                
                            </ScrollView>
                        </>
                    )
                }
            </>
        )}
        </ImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'rgb(126, 16, 16)'
    },
      loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 20,
        color: '#ffff',
      },
      subHeadingText: {
        color: '#0ebeeb',
        fontSize: 45,
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
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#0ebeeb',
        marginBottom: 20,
        width: 338,
        marginleft: 10,
        fontSize: 25,
        marginTop: 25,
    },
    inputMetrics: {
        height: 50,
        borderBottomWidth: 3,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#0ebeeb',
        marginBottom: 20,
        width: 338,
        marginleft: 10,
        fontSize: 25,
        marginTop: 25,
        borderBottomColor: '#0ebeeb',
        textAlign: 'center'
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingBottom: 300,
    },
    wrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submission: {
        marginTop: 50,
        width: 200,
        height: 40,
        backgroundColor:'rgba(86, 73, 73, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
   
    },
    Message: {
        color: 'rgb(219, 66, 66)',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginLeft: 10,
        paddingTop: 100,
      },
    slider: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 15,
      backgroundColor: 'rgba(113, 111, 111, 0.49)',
      justifyContent: 'center',
      marginBottom: 20,
      width: 300,
      marginTop: 20
    },
    thumbStyle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    trackStyle: {
        height: 8,
        borderRadius: 4,
    },
    subTitle: {
        color: '#0ebeeb',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingTop: 20,
        
      },
      showText: {
        color: '#0ebeeb',
        fontSize: 18,
        marginTop: 10,
        marginRight: 180
    },
    converterButton: {
        height: 30,
        width: 100,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 190,
        marginTop: -25,
        borderWidth:3,
        borderColor: 'rgba(113, 111, 111, 0.49)'
    },
    picker: {
        marginTop: -50,
        width: '100%', 
    },
    pickerItem:{
        color: 'rgb(14, 191, 235)',
    },
    recordButton: {
        padding: 15,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(100, 99, 99, 0.48)',
        borderRadius: 120,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
      },
      optionsToHistory: {
        width: 120,
        alignItems: 'center',
        borderRadius: 120,
        backgroundColor: 'rgba(100, 99, 99, 0.48)',
        justifyContent: 'center',
        height: 50,
        marginBottom: 20,
      },
      row: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
      },
      input2: {
        height: 120,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#0ebeeb',
        marginBottom: 20,
        width: 338,
        marginleft: 10,
        fontSize: 25,
        marginTop: 15,
    },
    fileUpload:{
        width: 340,
        height:250,
        backgroundColor:'#333',
        marginLeft: 10,
        paddingBottom:50,
        borderColor: '#ddd',
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:100,
        borderWidth:2,
    },
    VectorPng:{
        marginTop:50,
    },
    uploadText:{
        color:'white',
        fontWeight:'black',
        fontSize: 10,
        padding: 2,
        textAlign:'left',
    },
    RelationsNum: {
        width: 50,
        alignItems: 'center',
        backgroundColor: 'rgb(14, 191, 235)',
        justifyContent: 'center',
        height: 50,
        borderRadius: 120,
    },
    row2: {
    marginTop: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  radioButtonContainer: {
    
  },
  row3:{
    flexDirection: 'row',             
    alignItems: 'center',        
    justifyContent: 'space-between',  
    width: '90%', 
  },
  otherInput: {
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#0ebeeb',
    marginBottom: 20,
    width: 338,
    marginleft: 10,
    fontSize: 25,
    marginTop: 25,
    borderWidth: 2,
  },
    subText: {
      color: '#0ebeeb',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      paddingBottom:30
    },
      placeholderText: {
        fontSize: 12
      },
    HeaderRow: {
      backgroundColor: 'rgba(11, 187, 231, 0.61)',
      width: 370,
      height: 500,
      borderRadius:30,
      borderBottomWidth: 8,
      borderTopWidth: 8,
      justifyContent:'flex-start',
      alignItems:'center',
      padding:0,
      margin:10,
      justifyContent: 'space-between',
    },
    iconContainer: {
        alignItems: 'flex-end'            
    },
      boxText:{
        fontFamily: 'monospace',
        textAlign:'center',
        fontSize: 30,
        marginTop:10,
        flex:1
      },
      boxText2:{
        fontFamily: 'monospace',
        fontSize: 20,
        marginLeft:10,
        marginBottom:30
      },
      boxText3:{
        fontFamily: 'monospace',
        fontSize: 14,
        marginTop:40,
        marginLeft:10,
      },
      editIconStyle:{
        width:20,
        height:20,
        // marginLeft:230,
        marginTop:9
      },
      textContainer: {
        // flex: 1,                         
        alignItems: 'center'     
    },
    ProfileIcon: {
        width: 40,
        height: 40,
        flex: 1,
        
    },

    //Real fun stuff
    BMIbox:{
        width: 280,
        height: 270,
        backgroundColor: 'rgba(11, 187, 231, 0.61)' ,
        marginRight:120,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 15,
        marginTop: 20,
    },
    BMI:{
        width: 250,
        height: 250,
        flex:1
    },
    BMIText: {
        fontSize: 25,
        
    },
    editIconStyle2:{
        width:20,
        height:20,
        marginLeft:240,
        marginTop:9
    },
    BoxText_1:{
      fontSize: 30,
    },
    BMITextUnderweight: {
      marginBottom: 30,
      fontSize: 25,
      color:'rgb(5, 105, 48)'
    },
    BMITextHealthy: {
        marginBottom: 30,
        fontSize: 25,
        color:'rgb(14, 200, 94)'
    },
    BMITextOverweight: {
        marginBottom: 30,
        fontSize: 25,
        color:'rgb(209, 170, 12)'
    },
    BMITextObese: {
        marginBottom: 30,
        fontSize: 25,
        color:'rgb(222, 18, 18)'
    },
    Weightbox:{
        width: 280,
        height: 270,
        backgroundColor: 'rgba(11, 187, 231, 0.61)' ,
        marginLeft:120,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 15,
        marginTop: 20,
    },
    weight:{
        width: 170,
        height: 170,
        flex:1
    },
    weightText: {
        fontSize: 30
    },
    Height: {
        width: 170,
        height: 170,
        marginBottom:40
    },
    HeightText:{
        marginRight:200,
        marginBottom:40
    },
    HbA1c:{
        width: 260,
        height: 260,
        flex:1
    },
    HbA1c_Elevated: {
        marginBottom: 10,
        fontSize: 25,
        color:'rgb(209, 170, 12)'
    },
    HbA1c_High: {
        marginBottom: 10,
        fontSize: 25,
        color:'rgb(14, 200, 94)'
    },
    HbA1c_High: {
        marginBottom: 10,
        fontSize: 25,
        color:'rgb(222, 18, 18)'
    },
    ImageText: {
        fontSize: 170
    },
})