import React from 'react';
import {
    View, StyleSheet, ScrollView, ImageBackground, Dimensions, Image, Text, Button
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Home = ({ navigation }) => {

    return (
        // Container start
        <KeyboardAwareScrollView style={{ flex:1 }}>
            <ScrollView style={{backgroundColor: '#ffffff', paddingBottom: 220}}
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
                        color={Platform.select({ios:'#fff' , android:'#3c6a3d'})}
                        onPress={() =>
                        navigation.navigate('SpecialtyForm')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Subsrice to a monthly meal plan"
                        color={Platform.select({ios:'#fff' , android:'#3c6a3d'})}
                        onPress={() =>
                        navigation.navigate('MonthlyMeal')}
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
    button: {
        elevation: 5,
        backgroundColor: '#3c6a3d',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 3,
        marginHorizontal: 40,
        bottom: 65,
        marginTop: 10,
    }
})

export default Home;