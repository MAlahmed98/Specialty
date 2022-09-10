import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView,Text,TouchableOpacity } from 'react-native'



const MonthlyMeal = ({ navigation }) => {
    // const [meal, setMeal] = useState('');
    let chooseMe;
    // useEffect(() => {
    //     console.log(meal);
    //   }, [meal]);
    
    // const submitMeal = ( sMeal ) => {
    //     setMeal(sMeal);
    //     navigation.navigate('MonthlyForm', meal);
    // }

    const MealsChoice = (probs) => {
        return(
            <TouchableOpacity style={styles.Button} onPress={() => {chooseMe = probs.name; navigation.navigate('MonthlyForm', chooseMe);}}>
                <View>
                    <Text style={styles.ButtonTitle}>
                        {probs.name}
                    </Text>
                </View>
            </TouchableOpacity>           
        )
    }

    return (
            <ScrollView style={{ flex:1, marginTop: 80 }}>
                <View style={styles.row}>
                    <MealsChoice name={'Weight Loss'}/>
                    <MealsChoice name={'Fitness Meals'}/>
                </View>
                <View style={styles.row}>
                    <MealsChoice name={'Elderly'}/>
                    <MealsChoice name={'Body Building'}/>
                </View>
                <View style={styles.row}>
                    <MealsChoice name={'Gluten Free'}/>
                    <MealsChoice name={'Diabetes'}/>
                </View>
            </ScrollView>
    )
}


const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        marginHorizontal: 30,
        marginTop: 20,
        fontWeight: 'bold',
      }, 
      Button: {
        backgroundColor: '#3c6a3d',
        borderRadius: 10,
        paddingVertical: 4,
        marginHorizontal: 20,
        width: 140,
        height: 140,
        paddingTop: 20,
        alignItems: 'center',
        alignContent: 'center',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 5, width: 5 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    row: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 30,
    },
    ButtonTitle: {
        color: '#fff',
        padding: 15,
        paddingTop: 35,
        fontSize: 20,

    }
})

export default MonthlyMeal;