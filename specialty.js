import React, { useState } from 'react'
import {
    View, StyleSheet, ScrollView, ImageBackground, Dimensions, Image, Text, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, Alert , ToastAndroid,Platform,AlertIOS
} from 'react-native'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from './config';


const SpeciaForm = () => {
        const showToast = () => {
            console.log('Done');
          if (Platform.OS === 'android') {
            ToastAndroid.show("Thank you!", ToastAndroid.SHORT);
          } else {
            AlertIOS.alert("Thank you!");
          }
        };

    const AlertSubmit = () => {
        // Validation
        if(!Canapess.trim()&&!Sweet.trim()&&!FamilyLunch.trim()&&!events.trim()){
            Alert.alert(
                'Oops!!',
                'Please fill the form',
                [
                  { text: 'OK' },
                ],
                { cancelable: false }
              );
            return;
        }
        else
        if(!Sweet.trim()&&!FamilyLunch.trim()&&!events.trim()){
            Alert.alert(
                'Oops!!',
                'Please Enter Sweet , Family Lunch and Small events/Meeting',
                [
                  { text: 'OK' },
                ],
                { cancelable: false }
              );
            return;
        }
        else
        if(!FamilyLunch.trim()&&!events.trim()){
            Alert.alert(
                'Oops!!',
                'Please Enter Family Lunch and Small events/Meeting',
                [
                  { text: 'OK' },
                ],
                { cancelable: false }
              );
            return;
        }
        else
        if (!Canapess.trim()) {
            Alert.alert(
                'Oops!!',
                'Please Enter Canapess',
                [
                  { text: 'OK' },
                ],
                { cancelable: false }
              );
            return;
          }
          else
          if (!Sweet.trim()) {
            Alert.alert(
                'Oops!!',
                'Please Enter Sweet',
                [
                  { text: 'OK' },
                ],
                { cancelable: false }
              );
            return;
          }
          else
          if (!FamilyLunch.trim()) {
            Alert.alert(
                'Oops!!',
                'Please Enter Family Lunch',
                [
                  { text: 'OK' },
                ],
                { cancelable: false }
              );
            return;
          }
          else 
          if (!events.trim()) {
            Alert.alert(
                'Oops!!',
                'Please Enter Small events/Meeting',
                [
                  { text: 'OK' },
                ],
                { cancelable: false }
              );
            return;
          }
        //function to make two option alert
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
      };

    const create = () => {
        addDoc(collection(db, "Special"), {
            name: name,
            phone: phone,
            email: email,
            location: location,
            dateAndTime: dateAndTime,
            Canapess: Canapess,
            Sweet: Sweet,
            FamilyLunch: FamilyLunch,
            events: events,
            CreatedAt: serverTimestamp()
        }).then(() => {
            showToast();
            setName('');
            setPhone('');
            setEmail('');
            setLocation('');
            setDateAndTime('');
            setCanapess('');
            setSweet('');
            setFamilyLunch('');
            setevents('');

        }).catch((error) => {
            console.log(error);
        });;
    }

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
                    <View>
                        <Text style={styles.title}>Name:</Text>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='Name'
                            onChangeText={(name) => { setName(name) }}
                            value={name}
                        ></TextInput>

                        <Text style={styles.title}>Phone Number:</Text>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='Phone Number'
                            onChangeText={(phone) => { setPhone(phone) }}
                            value={phone}
                        ></TextInput>

                        <Text style={styles.title}>E-mail:</Text>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='E-mail'
                            onChangeText={(email) => { setEmail(email) }}
                            value={email}
                        ></TextInput>

                        <Text style={styles.title}>Event Location:</Text>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='Location'
                            onChangeText={(location) => { setLocation(location) }}
                            value={location}
                        ></TextInput>

                        <Text style={styles.title}>Date and Time:</Text>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='Date and time'
                            onChangeText={(dateAndTime) => { setDateAndTime(dateAndTime) }}
                            value={dateAndTime}
                        ></TextInput>
                        <Text style={styles.title}>Specialties:</Text>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='Canapess'
                            onChangeText={(Canapees) => { setCanapess(Canapees) }}
                            value={Canapess}
                        ></TextInput>

                        <TextInput
                            style={styles.Textinput}
                            placeholder='Sweet'
                            onChangeText={(Sweet) => { setSweet(Sweet) }}
                            value={Sweet}
                        ></TextInput>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='Family Lunch'
                            onChangeText={(FamilyLunch) => { setFamilyLunch(FamilyLunch) }}
                            value={FamilyLunch}
                        ></TextInput>
                        <TextInput
                            style={styles.Textinput}
                            placeholder='Small events/Meeting'
                            onChangeText={(events) => { setevents(events) }}
                            value={events}
                        ></TextInput>

                        <View style={styles.button}>
                          <Button  
                            title='Submit' 
                            color='#fff'
                            onPress={AlertSubmit}>
                              Submit
                          </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
        // Container end
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
    }
})

export default SpecialtyForm;
