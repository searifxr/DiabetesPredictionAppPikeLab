import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking} from 'react-native';
import DynamicIcons from './DynamicIcons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function EduResources(){
    const openURL = (url) => {
        Linking.openURL(url);
    }
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.TitleText}>Educational resources</Text>
                <Text style={styles.subtitleText}>Prevention of diabetes</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.mayoclinic.org/diseases-conditions/type-2-diabetes/in-depth/diabetes-prevention/art-20047639')}>
                        <Image
                            source={{uri: 'https://logowik.com/content/uploads/images/mayo-clinic.jpg'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Diabetes prevention: 5 tips for taking control</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://diabetesjournals.org/care/article/45/Supplement_1/S39/138909/3-Prevention-or-Delay-of-Type-2-Diabetes-and')}>
                        <Image
                            source={{uri: 'https://play-lh.googleusercontent.com/CNPmKP7vOtgLQtRXQATC3MR57-71k1BP8nWsXSI3CPostTmUE73-MZEJCcsd9JzGIn0=w526-h296-rw'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Prevention or Delay of Type 2 Diabetes and Associated Comorbidities: Standards of Medical Care in Diabetes—2022</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.who.int/news-room/fact-sheets/detail/diabetes')}>
                        <Image
                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7S9jzpbnYnHVRzfmZvDQ9m0LyUojatLxMCA&s'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Diabetes:{'\n'}scroll down to the prevention section</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://academic.oup.com/aje/article/191/3/472/6419772?login=false')}>
                        <Image
                            source={{uri: 'https://i.ytimg.com/vi/irilfp5h72M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDnKKyGQ2OwDF9PJofKNK6qbi3C_w'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Type 2 Diabetes–Prevention Diet and All-Cause and Cause-Specific Mortality: A Prospective Study</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={()=> openURL('https://my.clevelandclinic.org/health/diseases/7104-diabetes')}>
                        <Image
                            source={{uri: 'https://assets.clevelandclinic.org/transform/c5429001-8194-46ec-a755-52a4a36d2654/CC_Preferred-jpeg-900-660_jpg?io=transform:fit,width:599'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Diabetes: What It Is, Causes, Symptoms, Treatment & Types</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.heart.org/en/health-topics/diabetes/prevention--treatment-of-diabetes')}>
                        <Image
                            source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/American_Heart_Association_Logo.svg/1200px-American_Heart_Association_Logo.svg.png'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Preventing and Treating Diabetes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.diabetes.org.uk/about-diabetes/type-2-diabetes/preventing')}>
                        <Image
                            source={{uri: 'https://yt3.googleusercontent.com/ytc/AIdro_ldicvZY4t0d4PghJEsiytHKJrgOj61ARBAjcvIclvOE5Y=s900-c-k-c0x00ffffff-no-rj'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>How to prevent type 2 diabetes</Text>
                    </TouchableOpacity>

                </ScrollView>

                <Text style={styles.subtitleText}>What is Diabetes?</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://my.clevelandclinic.org/health/diseases/7104-diabetes')}>
                        <Image
                            source={{uri: 'https://assets.clevelandclinic.org/transform/c5429001-8194-46ec-a755-52a4a36d2654/CC_Preferred-jpeg-900-660_jpg?io=transform:fit,width:599'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Diabetes: What It Is, Causes, Symptoms, Treatment & Types</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.who.int/news-room/fact-sheets/detail/diabetes')}>
                        <Image
                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7S9jzpbnYnHVRzfmZvDQ9m0LyUojatLxMCA&s'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Diabetes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.health.harvard.edu/topics/diabetes')}>
                        <Image
                            source={{uri: 'https://nutrition.hms.harvard.edu/files/os_site_logos/hmslogoexample.png'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>What is Diabetes? Types, Symptoms, and Causes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes')}>
                        <Image
                            source={{uri: 'https://internet2.edu/wp-content/uploads/2021/08/NIH-logo.jpg.webp'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>What Is Diabetes?</Text>
                    </TouchableOpacity>
                </ScrollView>

                <Text style={styles.subtitleText}>What’s the difference between Type 1 and Type 2 diabetes?</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://health.clevelandclinic.org/type-1-vs-type-2-diabetes')}>
                        <Image
                            source={{uri: 'https://assets.clevelandclinic.org/transform/c5429001-8194-46ec-a755-52a4a36d2654/CC_Preferred-jpeg-900-660_jpg?io=transform:fit,width:599'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>What causes Type 1 and Type 2 diabetes?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.henryford.com/blog/2017/12/type-1-type-2-diabetes-difference')}>
                        <Image
                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lA15zZ-KwKUAXeCYKFZ6YuPFM4a3owKb2Q&s'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>Type 1 Or Type 2 Diabetes: Do You Know The Difference?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ArticleCard} onPress={() => openURL('https://www.childrens.com/health-wellness/difference-between-type-1-and-type-2-diabetes')}>
                        <Image
                            source={{uri: 'https://lifestylefrisco.com/wp-content/uploads/2020/02/Childrens-Medical-Center_logo.jpg'}}
                            style={styles.cardImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.CardTitle}>The difference between type 1 and type 2 diabetes</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d6ed1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
    paddingBottom: 50,
  },
  TitleText: {
    fontSize: 40,
    fontFamily: 'Comic sans',
    textAlign:'center',
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 100,
  },
  subtitleText: {
    marginBottom: 0,
    fontSize: 20,
    fontFamily: 'Comic Sans MS',
    textAlign: 'left',
    fontWeight: '400',
    color: 'white',
    marginLeft:40
  },
 ArticleCard: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: 300,  
    height: 300,
    margin: 10,  
    borderRadius: 10, 
    padding: 15, 
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft:40,
    marginBottom:50,
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex:1
    },
    CardTitle: {
        textAlign: 'center',
        fontWeight: 'bold',  
        fontSize: 16,        
        marginTop: 10,      
        color: '#000',      
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
});