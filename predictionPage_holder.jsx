import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Alert, TouchableOpacity, Switch, input} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import VectorPngIcons from './VectorPngIcons';
import * as DocumentPicker from 'expo-document-picker';

export default function Predictions() {
    const [fullName, setFullName] = useState('');
    const [DoB, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [sex, setSex] = useState('');
    const [Nationality, setNationality] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [weight, setWeight] = useState(0);
    const [heightInFeet, setHeightInFeet] = useState(0)
    const [heightInInches, setHeightInInches] = useState(0);
    const [bloodGroup, setBloodGroup] = useState('Select blood type')
    const [showFamilyDisease, setShowFamilyDisease] = useState(false);
    const [diseases, setDiseases] = useState('');
    const [relation, setRelation] = useState('');
    const [ageOfDiagnosis, setAgeOfDiagnosis] = useState('');
    const [chronicDisease, setChronicDisease] = useState('');
    const [Surgery, setSurgery] = useState('');
    const [medication, setMedication] = useState('');
    const [Allergy, setAllergy] = useState('');
    const [smoking, setSmoking] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [diet, setDiet] = useState('');
    const [physical, setPhyiscal] = useState('');
    const [selfConditions, setSelfConditions] = useState('');
    const [geneticReport, setGeneticReport] = useState(null);
    const [message, setMessage] = useState('');
    


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


    const Alert_Fullname = () => {
        Alert.alert(
            "Full Name?",
            "This feild is important as we need to put a name for the data you are about to provide",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }
    const Alert_DoB = () => {
        Alert.alert(
            "Date of Birth?",
            "This feild is required as your age does play a significant role in the risk of getting certain diseases",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }
    const Alert_Gender = () => {
        Alert.alert(
            "Gender?",
            "This feild is required as your gender is REALLY important in figuring out if you carry them or have them",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }
    const Alert_Race = () => {
        Alert.alert(
            "Race?",
            "This feild is optional, but it is very useful to determine if you fit the demographic of some diseases. But if you wish to not say, that is fine",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }

    const Alert_email = () => {
        Alert.alert(
            "Why my contact info",
            "If you want all the info sent to you, we need your contact info.",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }

    const Alert_weight = () => {
        Alert.alert(
            "Why my weight?",
            "Your weight plays a huge role in how much at risk you are to certain disease",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }
    const Alert_History = () => {
        Alert.alert(
            "Why my Family history?",
            "If certain dieases runs in your family, we advise you to click yes as this can help us see how much you are susceptible to diesease; including this one..",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }

    const Alert_height = () => {
        Alert.alert(
            "Why my Height?",
            "Your height also plays a role in wheter or not you get certain disease... \nFirst slider is ft\nSecond slider is inches",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }
    const Alert_Surgery = () => {
        Alert.alert(
            "Previous surgeries/treatment?",
            "Please provide the surgery(s) you have had in the past.. Please add none if you don't have any",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }
    const Alert_Medication = () => {
        Alert.alert(
            "Medications?",
            "If you are prescribed on current Medication please input them here. If not add none",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    } 
    const Alert_Allergy = () => {
        Alert.alert(
            "Allergies?",
            "If you have any allegries please state them here. Say 'not that I know of' if you don't have any",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    }
    const Alert_Condition = () => {
        Alert.alert(
            "Known hereditary conditions?",
            "If you have any known hereditary conditions please list them here. Say 'none' if you don't have any",
            [
                {
                    text: "Got it!"
                }
            ]
        );
    } 
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || DoB;
        setShowDatePicker(true);
        setDob(currentDate);
    }
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
            age--; 
        }
    
        return age;
    };
    //_____________________________
    const age = calculateAge(DoB); 
    //_____________________________

    const BMI = (LBS, heightFT, heightIN) =>
    {
        const heightInches = heightFT * 12 + heightIN; 
        const heightMeters = heightInches * 0.0254;
        const weightKg = LBS * 0.453592;
        
        return (weightKg / Math.pow(heightMeters, 2)).toFixed(2)
    }

    //_______________________________________
    const bmi = BMI(weight, heightInFeet, heightInInches);
    //_______________________________________

    const toggleSwitch = () => setShowFamilyDisease((previousState) => !previousState)

    
    return(
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
            <Text style={styles.SubheadingText}>Personal Info</Text>
        <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder='Please type your full name'
                placeholderTextColor='white'
                value={fullName}
                onChange={setFullName}
            />
                <TouchableOpacity style={styles.helpButton} onPress={Alert_Fullname}>
                    <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
        </View>    
        <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder='DoB (MM/DD/YY)'
                placeholderTextColor='white'
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
            <TouchableOpacity style={styles.helpButton} onPress={Alert_DoB}>
                    <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
        </View>
            <Text style={styles.ageText}>Age: {age}</Text>
        <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder='Sex? (Gender)'
                    placeholderTextColor='white'
                    value={sex}
                    onChange={setSex}
                />
                <TouchableOpacity style={styles.helpButton} onPress={Alert_Gender}>
                    <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
        </View>  
        <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder='Race/nationality? (optional)'
                    placeholderTextColor='white'
                    value={Nationality}
                    onChange={setNationality}
                />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_Race}>
                    <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
            <Text style={styles.SubheadingText}>Contact Info (optional)</Text>
        <View style={styles.row}>
            <TextInput 
                style={styles.input}
                placeholder='Enter email Address'
                placeholderTextColor='white'
                value={email}
                onChange={setEmail}
            />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_email}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TextInput 
                style={styles.input}
                placeholder='Enter phone number'
                placeholderTextColor='white'
                value={phoneNumber}
                onChange={setPhoneNumber}
            />
        </View>
        <Text style={styles.SubheadingText}>Health Metrics</Text>
        <Text style={styles.SubheadingText}>Weight</Text>
        <View style={styles.row}>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={400}
                step={1}
                value={weight}
                onValueChange={setWeight}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#fff"
                thumbStyle={styles.thumbStyle}
                trackStyle={styles.trackStyle}
            />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_weight}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.ageText}>Weight: {weight} LBS</Text>

        <Text style={styles.SubheadingText}>Height</Text>
        <View style={styles.row}>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={8}
                step={1}
                value={heightInFeet}
                onValueChange={setHeightInFeet}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#fff"
                thumbStyle={styles.thumbStyle}
                trackStyle={styles.trackStyle}
            />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_height}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={11}
                step={1}
                value={heightInInches}
                onValueChange={setHeightInInches}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#fff"
                thumbStyle={styles.thumbStyle}
                trackStyle={styles.trackStyle}
            />
        </View>
        <Text style={styles.ageText}>Your height: {heightInFeet}ft, {heightInInches}in</Text>
        <Text style={styles.ageText}>Your BMI: {bmi}</Text>
        <Text style={styles.SubheadingText}>Blood group</Text>
            <View>
                <Picker style={styles.picker} selectedValue={bloodGroup} onValueChange={setBloodGroup}>
                    <Picker.Item label='Select Blood group' value="Select blood type"/>
                    <Picker.Item label='A+' value='A+'/>
                    <Picker.Item label='A-' value='A-'/>
                    <Picker.Item label='B+' value='B+'/>
                    <Picker.Item label='B-' value='B-'/>
                    <Picker.Item label='AB+' value='AB+'/>
                    <Picker.Item label='AB-' value='AB-'/>
                    <Picker.Item label='O+' value='O+'/>
                    <Picker.Item label='O-' value='O-'/>
                </Picker>
        </View>
        <Text style={styles.SubheadingText}>History of family diseases?</Text>
        <View style={styles.row}>
            <View style={styles.switch}>
            <Switch 
                 trackColor={{ false: '#767577', true: '#23a128' }}
                 thumbColor={showFamilyDisease ? '#babfba' : '#f4f3f4'}
                 onValueChange={toggleSwitch}
                 value={showFamilyDisease}
            />
            </View>
            <TouchableOpacity style={styles.helpButton} onPress={Alert_History}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        {showFamilyDisease && (
            <>
                <View style={styles.row}>
                <TextInput 
                    style={styles.input}
                    placeholder='Enter family dieases (seperate by ",")'
                    placeholderTextColor='white'
                    value={diseases}
                    onChange={setDiseases}
                />
            </View>
            <Picker style={styles.picker} selectedValue={relation} onValueChange={setRelation}>
                    <Picker.Item label='Select the relation' value="Family"/>
                    <Picker.Item label='close family only' value='close family only'/>
                    <Picker.Item label='close family and cousins' value='close family and cousins'/>
                    <Picker.Item label='Distant' value='Distant'/>
                    <Picker.Item label='Mom and dad' value='Mom and dad'/>
                    <Picker.Item label='Siblings' value='Siblings'/>
                    <Picker.Item label='Grandparents' value='Grandparents'/>
                    <Picker.Item label="Mom's side" value="Mom's side"/>
                    <Picker.Item label="Dad's side" value="Dad's side"/>
                </Picker>
                <View style={styles.row}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Age of Diagnosis (best guess is ok)'
                        placeholderTextColor='white'
                        value={ageOfDiagnosis}
                        onChange={setAgeOfDiagnosis}
                    />
                </View>
            </>
        )}
        <Text style={styles.SubheadingText}>Personal Medical History</Text>
        <View style={styles.row}>
            <TextInput 
                style={styles.input}
                placeholder='Add chronic disease (add none if not)'
                placeholderTextColor='white'
                value={chronicDisease}
                onChange={setChronicDisease}
            />
        </View>
        <View style={styles.row}>
            <TextInput 
                style={styles.input}
                placeholder='Pevious surgies/treatments'
                placeholderTextColor='white'
                value={Surgery}
                onChange={setSurgery}
            />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_Surgery}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TextInput 
                style={styles.input}
                placeholder='On medication right now?'
                placeholderTextColor='white'
                value={medication}
                onChange={setMedication}
            />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_Medication}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TextInput 
                style={styles.input}
                placeholder='Do you have any allegries?'
                placeholderTextColor='white'
                value={Allergy}
                onChange={setAllergy}
            />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_Allergy}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.SubheadingText}>Life style info</Text>
        <Picker style={styles.picker} selectedValue={smoking} onValueChange={setSmoking}>
            <Picker.Item label='Smoking Habits ' value="Smoking Habits "/>
            <Picker.Item label='Never' value='Never'/>
            <Picker.Item label='Sometimes' value='Sometime'/>
            <Picker.Item label='Frequently' value='Frequently'/>
        </Picker>
        <Picker style={styles.picker} selectedValue={alcohol} onValueChange={setAlcohol}>
            <Picker.Item label='Alcohol Consumption' value="Alcohol Consumption"/>
            <Picker.Item label='Never' value='Never'/>
            <Picker.Item label='Sometimes' value='Sometime'/>
            <Picker.Item label='Frequently' value='Frequently'/>
        </Picker>
        <Picker style={styles.picker} selectedValue={diet} onValueChange={setDiet}>
            <Picker.Item label='Diet' value="Diet"/>
            <Picker.Item label='Vegeterain' value='Vegeterian'/>
            <Picker.Item label='Non-vegeterain' value='Non-vegeterain'/>
            <Picker.Item label='Both Veg and Non veg' value='Both'/>
            <Picker.Item label='Vegan' value='Vegan'/>
            <Picker.Item label='Other' value='other'/>
        </Picker>
        <Picker style={styles.picker} selectedValue={physical} onValueChange={setPhyiscal}>
            <Picker.Item label='Physical Activity' value="Physical Activity"/>
            <Picker.Item label='Active' value='Active'/>
            <Picker.Item label='Moderate' value='Moderate'/>
            <Picker.Item label='Sedentary' value='Sedentary'/>
        </Picker>
        <Text style={styles.SubheadingText}>Genetic side of you</Text>
        <View style={styles.row}>
            <TextInput 
                style={styles.input}
                placeholder='Any conditions you have?'
                placeholderTextColor='white'
                value={selfConditions}
                onChange={setSelfConditions}
            />
            <TouchableOpacity style={styles.helpButton} onPress={Alert_Condition}>
                <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.SubheadingText}>Genetic report(upload if you have taken it)</Text>
        {geneticReport ? (
            <View style={styles.fileUpload}>
            {geneticReport.map((file, index) =>
                <>
                    <Text key={index} style={styles.uploadText}>{file.name ? `File ${index + 1}: ${file.name}`:`File ${index+1}: unknown`}</Text>
                    <Text key={index+100} style={styles.uploadText}>{file.size ? `File ${index+ 1} size: ${file.size}`:`File ${index+1} size: unknown`}</Text>
                </> 
            )}
            </View>
            ) : (
            <>
                <TouchableOpacity style={styles.fileUpload} onPress={FileUpload}>
                <VectorPngIcons
                    name='file-upload'
                    color='white'
                    size={100}
                    style={styles.VectorPng}
                />
                </TouchableOpacity>
            </>
       )}
       <Text style={styles.SubheadingText}>{message}</Text>

       {/* TODO:
                - Set up a button that transfers all the data to the backend
                */}
    </View>
    </ScrollView>
    );
}
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 60
    },
    container: {
        flex: 1,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'left',
        
    },
    SubheadingText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingTop: 50,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: '#333',
        color: '#fff',
        marginBottom: 20,
        width: 280,
        marginRight: 10,
    },
    slider: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#333',
        justifyContent: 'center',
        marginBottom: 20,
        width: 300,
        marginLeft: 30
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
    helpButton: {
        backgroundColor: '#333',
        width: 20,
        height: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },    
    helpButtonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    ageText: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
    },
    picker: {
        height: 50,
        color: '#fff',
        marginBottom: 90,
        paddingBottom:150,
        marginRight:10
    },
    switch:{
        marginLeft: 135,
        paddingBottom: 40,
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
        marginTop:30,
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
    }
});