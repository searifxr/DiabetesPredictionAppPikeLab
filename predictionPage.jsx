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



export default function Predictions() {
    const backdrop = require('./assets/Background.jpg')
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
    //___________________________________________________//
    //___________________________________________________//
    const [weight, setWeight] = useState(null);
    const [weightKG, setWeightKG] = useState(null);
    const [isMetric, setIsMetric] = useState(false);
    const [height, setHeight] = useState(null);
    const [heightCM, setHeightCM] = useState(null);
    const [bloodGroup, setBloodGroup] = useState(null);
    const [bloodSugar, setBloodSugar] = useState('');
    const [HbA1c, setHbA1c] = useState('');
    const [BP, setBP] = useState('')
    //___________________________________________________//
    //___________________________________________________//
    const [SwitchToPicker, setSwitchToPicker] = useState(true);
    const [switchToFile, setSwitchToFile] = useState(false);
    const [dieases, setDiseases] = useState(null);
    const [geneticReport, setGeneticReport] = useState(null);
    const [relation, setRelation] = useState([]);
    const [ageAtDiagnosis, setAgeAtDiagnosis]=useState('')
    //___________________________________________________//
    const [PhysicalActivity, setPhysicalActivity] = useState(null);
    const [Diet, setDiet] = useState(null);
    const [healthConditions, setHealthConditions] = useState([]);
    const [otherCondition, setOtherCondition] = useState('');
    const [habits, setHabits] = useState([])
    const [alcohol, setAlcohol] = useState([])
    const [stress, setStress] = useState(null)
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
    const calculateBMI = (weight, height) => {
        if (weight <= 0 || height <= 0) {
            return "Invalid input";
        }
        
        let weightInKg = weight;
        let heightInMeters = height / 100;
        
        if (!isMetric) {
            weightInKg = weight * 0.453592; // Convert lbs to kg
            heightInMeters = (height * 2.54) / 100; // Convert inches to meters
        }
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        return bmi.toFixed(2); 
    };
    //__//
    const BMI = calculateBMI(weightKG, heightCM);
    const BMIinImperalismUnits = calculateBMI(weight, height);
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
        if(weight && height && bloodGroup && bloodSugar && BP && HbA1c)
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
//____________________________________________//

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
                                placeholder='Sex? (Gender)'
                                placeholderTextColor='#0ebeeb'
                                value={sex}
                                onChangeText={setSex}
                            />
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
                                        <Text style={style.showText}>BMI: {BMIinImperalismUnits}</Text>
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

                                <TextInput
                                    style={[style.input, style.placeholderText]}
                                    placeholder='Enter your most recent blood sugar level(mg/dL):'
                                    keyboardType='numeric'
                                    value={bloodSugar}
                                    onChangeText={(text) => setBloodSugar(text)}

                                />
                                <Text style={style.subText}>Reference Ranges: (Below input for guidance)</Text>
                                <Text style={style.subText}>Normal: Less than 100 mg/dL</Text>
                                <Text style={style.subText}>Prediabetes: 100-125 mg/dL</Text>
                                <Text style={style.subText}>Diabetes: 126 mg/dL or higher</Text>

                                <Text style={style.subTitle}>HbA1c (%) 🧪</Text>
                                <TextInput
                                    style={[style.input, style.placeholderText]}
                                    placeholder='Enter your last HbA1c test result (if available):'
                                    placeholderTextColor='#0ebeeb'
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
                            selected={PhysicalActivity === "Option 1"}
                            onPress={() => setPhysicalActivity("Option 1")}
                          />
                        
                       <RadioButton
                            label="🚶Light active(walking 1-2 times a week)"
                            selected={PhysicalActivity === "Option 2"}
                            onPress={() => setPhysicalActivity("Option 2")}
                          />
                       <RadioButton
                            label="🏃Moderately Active (Regular exercise)  "
                            selected={PhysicalActivity === "Option 3"}
                            onPress={() => setPhysicalActivity("Option 3")}
                          />
                          <RadioButton
                            label="💪 Highly Active (Daily exercise or sports)"
                            selected={PhysicalActivity === "Option 4"}
                            onPress={() => setPhysicalActivity("Option 4")}
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
                            selected={Diet === "Hight in processed food"}
                            onPress={() => setDiet("Hight in processed food")}
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
                                     onChangeText={setOtherCondition}
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
                        <TouchableOpacity style={style.submission}>
                            <Text>Next</Text>
                        </TouchableOpacity>
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
      }
    
})