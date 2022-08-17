import React, { useState } from 'react'
import {
    View, StyleSheet, ScrollView, ImageBackground, Dimensions, Image, Text, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, Alert , KeyboardAvoidingView
} from 'react-native'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from './config';
import {Formik} from 'formik';
import {CheckBox} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const SpecialtyForm = () => {
    //states for the check boxes
    const [Canapees, setCanapees] = useState(false)
    const [Sweets, setSweets] = useState(false)
    const [FamilyLaunch, setFamilyLaunch] = useState(false)
    const [events, setEvents] = useState(false)

    //show us that the upload is done
    const showToast = () => {
        console.log('Done and done');
        Alert.alert('Message', 'Thank you!', [
            {
                text: 'ok'
            }
        ])
    };

    //clear check boxes
    const clearCheckBoxes = () => {
        setCanapees(false);
        setSweets(false);
        setFamilyLaunch(false);
        setEvents(false);
    }


    return (
        // Container start
        <KeyboardAwareScrollView style={{ flex:1 }}>
        <ScrollView style={{backgroundColor: '#ffffff' }}
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                    initialValues={{name: '',phone: '', email: '', location: '', dateAndTime: '', instructions: '', notes: ''}}
                    onSubmit={(values, actions) => {

                        //this will upload our form to the data base
                        const create = () => {
                            addDoc(collection(db, "Special"), {
                                name: values.name,
                                phone: values.phone,
                                email: values.email,
                                location: values.location,
                                dateAndTime: values.dateAndTime,
                                Canapess: Canapees.toString(),
                                Sweet: Sweets.toString(),
                                FamilyLunch: FamilyLaunch.toString(),
                                events: events.toString(),
                                CreatedAt: serverTimestamp(),
                                instructions: values.instructions,
                                notes: values.notes
                            }).catch((error) => {
                                console.log(error);
                            });;
                            showToast();
                            clearCheckBoxes();
                            actions.resetForm();
                        }
                        //this will check if one of the text boxes is not filled
                        if(!values.name.trim()||!values.phone.trim()||!values.email.trim()||!values.location.trim()||!values.dateAndTime.trim()){
                            Alert.alert(
                                'Oops!!',
                                'Please fill all the feilds',
                                [
                                { text: 'OK' },
                                ],
                                { cancelable: false }
                            );
                            return
                        }
                        else{
                            //confirmation to upload the form
                            Alert.alert(
                                'Details',
                                'Are you sure you want to submit ?',
                                [
                                  { text: 'Yes', onPress: () => create() },
                                  {
                                    text: 'No',
                                    
                                    style: 'cancel',
                                  },
                                ],
                                { cancelable: false }
                                //clicking out side of alert will not cancel
                            );
                        }

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

                            <Text style={styles.title}>Special Instructions</Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='Special Instructions'
                                onChangeText={formProbs.handleChange('instructions')}
                                value={formProbs.values.instructions}
                            />

                            <Text style={styles.title}>Customer notes</Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='notes'
                                onChangeText={formProbs.handleChange('notes')}
                                value={formProbs.values.notes}
                            />

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
            
        </ScrollView>
        </KeyboardAwareScrollView>
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