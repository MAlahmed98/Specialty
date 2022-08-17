import React, { useState } from 'react'
import {
    View, StyleSheet, ScrollView, ImageBackground, Dimensions, Image, Text, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, Alert , ToastAndroid,Platform,AlertIOS, checbox
} from 'react-native'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from './config';
import {Formik} from 'formik';
import {CheckBox} from 'react-native-elements';


const SpecialtyForm = () => {

    const [Canapees, setCanapees] = useState(false)
    const [Sweets, setSweets] = useState(false)
    const [FamilyLaunch, setFamilyLaunch] = useState(false)
    const [events, setEvents] = useState(false)


    const showToast = () => {
        console.log('Done and done');
        if (Platform.OS === 'android') {
         ToastAndroid.show("Thank you!", ToastAndroid.SHORT);
        } 
        else {
        AlertIOS.alert("Thank you!");
        }
    };

    return (
        // Container start
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('./images/backgorund.jpg')}
                style={{ height: Dimensions.get('window').height / 2.5 }}>
                <View>
                    <Image source={require('./images/training.png')}
                        style={{ width: 350, height: 350, marginLeft: 30, marginHorizontal: 50 }}></Image>
                </View>
            </ImageBackground>

            {/* Bottom */}
            <View style={styles.bottomView}>
                {/* specialty */}
                <View style={{ padding: 40 }}>
                    <Text style={{ color: '#3c6a3d', fontSize: 34 }}>Specialty</Text>
                    <Text> {' '}Registration Form</Text>
                </View>
            </View>

            {/* Form */}
            <View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                    initialValues={{name: '',phone: '', email: '', location: '', dateAndTime: '' }}
                    onSubmit={(values, actions) => {
                        console.log('Canapees :' + Canapees.toString());
                        console.log('Sweets :' + Sweets.toString());
                        console.log('Family Lanuch :' + FamilyLaunch.toString());
                        console.log('Events :' + events.toString());

                        actions.resetForm();
                    }}
                    >
                    {(formProbs) => (
                        <View>
                            <Text style={styles.title}>Name </Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='Name'
                                onChangeText={formProbs.handleChange('name')}
                                value={formProbs.values.name}
                            />

                            <Text style={styles.title}>Phone Number</Text>
                            <TextInput
                                style={styles.Textinput}
                                keyboardType = 'numeric'
                                placeholder='Phone Number'
                                onChangeText={formProbs.handleChange('phone')}
                                value={formProbs.values.phone}
                                maxLength={8}
                            />
                            {/* need a redix to check email */}
                            <Text style={styles.title}>E-mail</Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='example@example.com'
                                onChangeText={formProbs.handleChange('email')}
                                value={formProbs.values.email}
                            />

                            {/* a location service would be nice at this point, but for now we'll just let it a text inbox */}
                            <Text style={styles.title}>Event Location</Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='Area, Block, Street, Building number, (flat number)'
                                onChangeText={formProbs.handleChange('location')}
                                value={formProbs.values.location}
                            />
                            
                            {/* we need to somehow put a control unit for time and date here, just a text input is boring */}
                            <Text style={styles.title}>Date and Time</Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='Date and Time'
                                onChangeText={formProbs.handleChange('dateAndTime')}
                                value={formProbs.values.dateAndTime}
                            />

                            {/* ever heard of jack in the box? well here is the checkboxes, they're not formik, just ol plain checkboxes*/}
                            <View style={styles.specialty}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', marginBottom: 10 }}>Specialty</Text>
                                <CheckBox
                                    title="Canapees"
                                    checked={Canapees}
                                    onPress={() => setCanapees(!Canapees)}
                                    
                                />
                                <CheckBox
                                    title="Sweets"
                                    checked={Sweets}
                                    onPress={() => setSweets(!Sweets)}
                                    
                                />
                                <CheckBox
                                    title="Family Launch"
                                    checked={FamilyLaunch}
                                    onPress={() => setFamilyLaunch(!FamilyLaunch)}
                                    
                                />
                                <CheckBox
                                    title="Events"
                                    checked={events}
                                    onPress={() => setEvents(!events)}
                                    
                                />
                            </View>
       

                            <View style={styles.button}>
                                <Button  
                                    title='Submit' 
                                    color='#fff'
                                    onPress={formProbs.handleSubmit}>
                                    Submit
                                </Button>
                            </View>
                        </View>
                    )}
                    </Formik>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    bottomView: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 80,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
    },
    Textinput: {
        borderWidth: 1,
        borderColor: '#c4c4b4',
        bottom: 75,
        marginBottom: 10,
        marginHorizontal: 20,
        padding: 10,
        fontSize: 18,
        borderRadius: 10
    },
    title:{
      bottom: 75,
      marginBottom: 10,
      marginHorizontal: 10,
      padding: 10,
      paddingBottom: 1,
      fontSize: 18,
      borderRadius: 10
    },
    button: {
        elevation: 5,
        backgroundColor: '#3c6a3d',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 3,
        marginHorizontal: 40,
        bottom: 65
    },
    specialty:{
        borderWidth: 1,
        borderColor: '#c4c4b4',
        bottom: 75,
        marginBottom: 10,
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 10,
    },
})

export default SpecialtyForm;