import React, { useState } from 'react'
import {
    View, StyleSheet, ScrollView, ImageBackground, Dimensions, Image, Text, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity
} from 'react-native'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config';
import {Formik} from 'formik';
import {CheckBox} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';


const SpecialtyForm = ({ navigation }) => {

        const [datePicker, setDatePicker] = useState(false);
        const [timePicker, setTimePicker] = useState(false);
        
        //this sets time and date for ios
        const onChange1 = (event, SelectDate) => {
            const currentDate = SelectDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate); 
            let tempDate = new Date(currentDate);
            let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
            let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes();
            setText('Date :' + fDate + ', Time: ' + fTime);
        }
    
        function showDatePicker() {
            setDatePicker(true);
        };
        
        function showTimePicker() {
            setTimePicker(true);
        };
        
        function onDateSelected(event, value) {
            setDate(value);
            setDatePicker(false);
            let fDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            let fTime = time.getHours() + ' : ' + time.getMinutes();
            setText('Date :' + fDate + ', Time: ' + fTime);
        };

        function onTimeSelected(event, value) {
            setTime(value);
            setTimePicker(false);
            let fDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            let fTime = time.getHours() + ' : ' + time.getMinutes();
            setText('Date :' + fDate + ', Time: ' + fTime);
        };


        //for date time picker
        const [time, setTime] = useState(new Date(Date.now()));
        const [date, setDate] = useState(new Date());
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);
        const [text, setText] = useState('');

        //this is the date time component that switch between ios and android whenever
        const DAT = () => {
            if(Platform.OS == 'ios'){
                return(
                        <View style={styles.DateTimeinput}>
                            <Image style={styles.dateTime} source={require('../images/date.png')} />
                            <DateTimePicker
                                style={styles.dateTimeSetting}
                                testID='dateTimePicker'
                                value={date}
                                mode='date'
                                display='default'
                                onChange={onChange1}
                            />
                            <Image style={styles.dateTime} source={require('../images/time.png')} />
                            <DateTimePicker 
                                style={styles.dateTimeSetting}
                                testID='dateTimePicker'
                                value={date}
                                mode='time'
                                is24Hour={true}
                                display='clock'
                                onChange={onChange1}
                            />
                        </View>
                )
            }
            else{
                return(
                    <View>
                        <View style={styles.DTView}>
                            <Text style={styles.DTtitle}>Date</Text>
                            <TextInput
                                style={styles.DTInput}
                                placeholder="date"
                                onChangeText={formProbs.handleChange('dateAndTime')}
                                value={date.toDateString()}
                                editable={false}
                            />
                            {datePicker && (
                                <DateTimePicker 
                                    style={styles.DTPick}
                                    testID='dateTimePicker'
                                    value={date}
                                    mode='date'
                                    display='default'
                                    onChange={onDateSelected}
                                    modalTransparent={true}
                                />
                            )}
                            {!datePicker && (
                                <View>
                                    <TouchableOpacity  onPress={showDatePicker}>
                                        <Image style={styles.dateTime} source={require('../images/date.png')} />
                                    </TouchableOpacity>  
                                </View>
                            )}
                        </View>
                        <View style={styles.DTView2}>
                            <Text style={styles.DTtitle}>Time</Text>
                            <TextInput
                                style={styles.DTInput}
                                placeholder='time'
                                onChangeText={formProbs.handleChange('dateAndTime')}
                                value={time.toLocaleTimeString('en-US')}
                                editable={false}
                            /> 
                            {timePicker && (
                                <DateTimePicker 
                                    style={styles.DTPick}
                                    testID='dateTimePicker'
                                    value={time}
                                    mode='time'
                                    is24Hour={false}
                                    display='default'
                                    onChange={onTimeSelected}
                                    modalTransparent={true}
                                />
                            )}
                            {!timePicker && (
                                <View>
                                    <TouchableOpacity  onPress={showTimePicker}>
                                        <Image source={require('../images/time.png')} />
                                    </TouchableOpacity>
                                </View>
                            )}   
                        </View>
                    </View>
                )
            }
    }

    const showMode = (currentmode) => {
        setShow(true);
        setMode(currentmode);
    }
    //states for the check boxes
    const [Canapees, setCanapees] = useState(false);
    const [Sweets, setSweets] = useState(false);
    const [FamilyLaunch, setFamilyLaunch] = useState(false);
    const [events, setEvents] = useState(false);
    const [Breakfast, setBreakfast] = useState(false);
    const [Launch, setLaunch] = useState(false);
    const [Dinner, setDinner] = useState(false);

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
        setBreakfast(false);
        setLaunch(false);
        setDinner(false);
    }

    return (
        // Container start
        <KeyboardAwareScrollView style={{ flex:1 }}>
        <ScrollView style={{backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('../images/backgorund.jpg')}
                style={{ height: Dimensions.get('window').height / 2.5 }}>
                <View>
                    <Image source={require('../images/training.png')}
                        style={{ width: 350, height: 350, marginLeft: 30, marginHorizontal: 50 }}>
                    </Image>
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
                    initialValues={{name: '',phone: '', email: '', location: '', dateAndTime: '', people: '',  eventType: '', instructions: '', notes: ''}}
                    onSubmit={(values, actions) => {
                        //this will upload our form to the database
                        const create = () => {
                            addDoc(collection(db, "Special"), {
                                name: values.name,
                                phone: values.phone,
                                email: values.email,
                                location: values.location,
                                dateAndTime: text,
                                people: values.people,
                                eventType: values.eventType, 
                                Canapess: Canapees.toString(),
                                Sweet: Sweets.toString(),
                                FamilyLunch: FamilyLaunch.toString(),
                                events: events.toString(),
                                Breakfast: Breakfast.toString(),
                                Launch: Launch.toString(),
                                Dinner: Dinner.toString(),
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
                        if(!values.name.trim()||!values.phone.trim()||!values.email.trim()||!values.location.trim()||!text){
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
                            <Text style={styles.title}>Event Type</Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='Event Type'
                                onChangeText={formProbs.handleChange('eventType')}
                                value={formProbs.values.eventType}
                            />

                            <Text style={styles.title}>Number of people</Text>
                            <TextInput
                                style={styles.Textinput}
                                keyboardType = 'numeric'
                                placeholder='Enter the number of people'
                                onChangeText={formProbs.handleChange('people')}
                                value={formProbs.values.people}
                                maxLength={8}
                            />
                            {/* a location service would be nice at this point, but for now we'll just let it a text inbox */}
                            <Text style={styles.title}>Event Location</Text>
                            <TextInput
                                style={styles.Textinput}
                                placeholder='Area, Block, Street, Building number, (flat number)'
                                onChangeText={formProbs.handleChange('location')}
                                value={formProbs.values.location}
                            />
                            <Text style={styles.title}>Date and Time</Text>
                            <TextInput
                            style={styles.Textinput}
                            placeholder='Date and Time'
                            onChangeText={formProbs.handleChange('dateAndTime')}
                            value={text}
                            editable={false} 
                            />

                            <DAT />

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

                            <View style={styles.specialty}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', marginBottom: 10 }}>Catering type</Text>
                                <CheckBox
                                    title="Breakfast"
                                    checked={Breakfast}
                                    onPress={() => setBreakfast(!Breakfast)}
                                />
                                <CheckBox
                                    title="Lunch"
                                    checked={Launch}
                                    onPress={() => setLaunch(!Launch)}
                                />
                                 <CheckBox
                                    title="Dinner"
                                    checked={Dinner}
                                    onPress={() => setDinner(!Dinner)}
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
    DTtitle:{
        marginTop:1,
        marginBottom: 10,
        marginLeft: 10,
        padding: 10,
        paddingBottom: 1,
        fontSize: 18,
      },
    DTView:{
        marginLeft: 10,
        flexDirection: 'row',
        marginTop: -60,
        height:50
    },
    DTView2:{
        marginLeft: 10,
        flexDirection: 'row',
        marginTop: 20,
        height:50
    },
    DTInput:{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius:6,
        padding: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    DTPick: {
        paddingLeft: 100,
        padding: 10,
        width: 120,
        marginLeft:120
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
    dateTime: {
        height: 40,
        width: 40,
        borderRadius: 10,
        marginLeft: 20,
    },
    dateTimeSetting: {
        height: 40,
        width: 100,
        borderRadius: 10,
    },
    DateTimeinput: {
        flex:1,
        borderColor: '#c4c4b4',
        bottom: 75,
        marginBottom: 30,
        padding: 10,
        fontSize: 18,
        flexDirection: 'row',
        marginHorizontal: 20,
    },
})

export default SpecialtyForm;