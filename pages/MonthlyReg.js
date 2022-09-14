import React, { useState } from 'react'
import {
    View, StyleSheet, ScrollView, Text, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config';
import {Formik} from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MonthlyForm = ({ navigation, route }) => {

    let choice = route.params;

    console.log(choice);

    const showToast = () => {
        console.log('Done and done');
        Alert.alert('Message', 'Thank you!', [
            {
                text: 'ok'
            }
        ])
    };

    return (
        <KeyboardAwareScrollView >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                    initialValues={{name: '', phone: '', email: '', location: '', notes: ''}}
                    onSubmit={(values, actions) => {
                        //this will upload our form to the database
                        const create = () => {
                            addDoc(collection(db, "MonthlyMeals"), {
                                mealType: choice,
                                name: values.name,
                                phone: values.phone,
                                email: values.email,
                                location: values.location,
                                notes: values.notes,
                                CreatedAt: serverTimestamp()
                            }).catch((error) => {
                                console.log(error);
                            });;
                            showToast();
                            actions.resetForm();
                        }
                        //this will check if one of the text boxes is not filled
                        if(!values.name.trim()||!values.phone.trim()||!values.email.trim()||!values.location.trim()){
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
                        <View style={styles.container}>
                            <Text style={styles.title}>Name</Text>
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
                                    color={Platform.select({ios:'#fff' , android:'#3c6a3d'})}
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
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 100,
        paddingBottom: 100,
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

export default MonthlyForm;