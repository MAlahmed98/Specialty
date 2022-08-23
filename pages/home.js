import React from 'react';
import {
    View, StyleSheet, ScrollView, ImageBackground, Dimensions, Image, Text, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config';
import {Formik} from 'formik';
import {CheckBox} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import SpecialtyForm from './Special';

const Home = ({ navigation }) => {

    return (
        // Container start
        <KeyboardAwareScrollView style={{ flex:1 }}>
        <ScrollView style={{backgroundColor: '#ffffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('../images/backgorund.jpg')}
                style={{ height: Dimensions.get('window').height / 2.5 }}>
                <View>
                    <Image source={require('../images/training.png')}
                        style={{ width: 350, height: 350, marginLeft: 30, marginHorizontal: 50 }}></Image>
                </View>
            </ImageBackground>

            {/* Bottom */}
            <View style={styles.bottomView}>
                {/* specialty */}
                <View style={{ padding: 40 }}>
                    <Text style={{ color: '#3c6a3d', fontSize: 34 }}>Main manu</Text>
                </View>
            </View>
             {/* Navigation buttons*/}
            <View style={styles.button}>
                <Button
                    title="Go to Specialty List"
                    color='#fff'
                    onPress={() =>
                    navigation.navigate('SpecialtyForm')}
                />
            </View>
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
    dateTime: {
        height: 40,
        width: 40,
        borderRadius: 10,
        marginLeft: 20
        
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
        marginHorizontal: 20,
        padding: 10,
        fontSize: 18,
        flexDirection: 'row',
    },
})

export default Home;