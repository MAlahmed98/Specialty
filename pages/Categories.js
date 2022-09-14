import  React, { useEffect, useState } from 'react';
import { Text, View , StyleSheet , Image , FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../config';



Feather.loadFont();

const Width = Dimensions.get('window').width;


export default function Categories ({navigation} ) {

    const [categ , setCateg] = useState([]);
    const categFetch = firebase.firestore().collection('categories');

    useEffect(()=>{
        categFetch
        .onSnapshot(
            querySnapshot => {
                const categ= []
            querySnapshot.forEach((doc) => {
                const {categImage , title} = doc.data()
                categ.push({
                    id: doc.id,
                    categImage,
                    title,
                })
            })
            setCateg(categ)
        }
        )
    }, [])

    const CategPress = (title) =>{
        navigation.navigate('menu', title);
}

    return(
        
        <View style={styles.container}>
             <ScrollView horizontal={false} style={{flex: 1}}>
            <SafeAreaView>
                <View style={styles.HeaderWrapper}>
                    <Image source={require('../images/training.png')}
                    style={styles.logo}
                    />
                    <TouchableOpacity>
                    <Feather name="shopping-cart" size={50} color='#3c6a3d'/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <View style={styles.CategWrapper}>
                <Text style={styles.CategTitle}>Categories</Text>
                <View style={styles.flat}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{width: '100%', height: '100%'}}>
                    <FlatList
                    numColumns={3}
                    keyExtractor={Item=>Item.id}
                    data={categ} 
                    renderItem={({item})=>(
                        <View style={styles.box}>
                        <TouchableOpacity onPress={()=> CategPress(item.title)}>
                        {/* <View style={styles.box}> */}
                        <Image style={styles.images} source={{uri:item.categImage}}/>
                        <Text style={styles.title}>{item.title}</Text>
                        {/* </View> */}
                        </TouchableOpacity>
                        </View>
                    )}
                    />
                    </ScrollView>
                </View>
            </View>
            </ScrollView>
        </View>
        
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c4c4b4',
        flexGrow:1
    },
    HeaderWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingTop: '7%',
        alignItems:'center'
    },
    logo: {
        width:'20%',
        height:'220%',
        paddingStart:'5%'
    },
    titleWrapper:{
        marginTop:'10%',
        paddingHorizontal:'5%'
    },
    CategWrapper:{
        marginTop:'5%',
        flex:1,
        flexGrow:1,
        
    },
    CategTitle:{
        fontSize:40,
        paddingHorizontal:'5%',
        color: '#3c6a3d',
        fontWeight:'bold'
    },
    images:{
        width:100,
        height:100,
        marginTop:'7%',
        alignSelf:'center',
        marginHorizontal:'3%'
    },
    box:{
        backgroundColor:'#3c6a3d',
        marginRight:'10%',
        marginHorizontal:'1%',
        marginRight:'1%',
        height:150,
        width:Width/3.2,
        borderRadius:20,
        marginTop:'5%',
        shadowColor:'#000000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.05,
        shadowRadius:10,
        elevation:2
    },
    flat:{
        paddingTop:'2%',
        borderRadius:20,
        flex:1,
        flexGrow:1,
    },
    title:{
        color:'#c4c4b4',
        textAlign:'center',
        marginTop:'2%',
        fontSize:20,
        fontWeight:'bold'
    }
});
