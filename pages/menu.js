import  React, { useEffect, useState } from 'react';
import { Text, View , StyleSheet , Image ,FlatList ,TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../config';



Feather.loadFont();
const Width = Dimensions.get('window').width;


export default function Categories ({navigation, route}) {

    const [menu , setmenu] = useState([]);
    const menuFetch = firebase.firestore().collection('menu');

    let title = route.params;

    useEffect(()=>{
        menuFetch
        .onSnapshot(
            querySnapshot => {
                const menu = []
            querySnapshot.forEach((doc) => {
                const {calories, category, description, foodImage, name, price} = doc.data()
                if(category == title) {
                menu.push({
                    id: doc.id,
                    calories, 
                    category, 
                    description, 
                    foodImage, 
                    name,
                    price,
                })
            }
            })
            setmenu(menu)
        }
        )
    }, [])
    
    const CategPress = (name) =>{
        navigation.navigate(name);
    }

    return(
        <View style={styles.container}>
             <ScrollView horizontal={false} style={{flex: 1}}>
            <View style={styles.CategWrapper}>
                <Text style={styles.CategTitle}>{title}</Text>
                </View>
                <View style={styles.flat}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{width: '100%', height: '100%'}}>
                    <FlatList
                    keyExtractor={Item=>Item.id}
                    data={menu} 
                    renderItem={({item})=>(
                        <View style={styles.box}>
                        <TouchableOpacity onPress={()=>CategPress(item.name)}>
                        <View>
                        <Text style={styles.title}>{item.name}</Text>
                        </View>
                        <View style={styles.desc}>
                        <Text style={styles.description}>{item.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.cal}>{item.calories} Calories</Text>
                        </View>
                        
                        <View style={styles.card}>
                        <View style={styles.add}>
                        <Feather name="shopping-cart" size={25} color='#ffffff'/>
                        </View>
                        <View>
                        <Text style={styles.price}>BD {item.price}</Text>
                        </View>
                        
                        </View>
                        
                        {/* </View> */}
                        </TouchableOpacity>
                        <View style={styles.imageWrapper}>
                        <Image style={styles.images} source={{uri:item.foodImage}}/>
                        </View>
                        </View>
                    )}
                    />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
        
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6f5',
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
        // marginTop:'5%',
        backgroundColor:'#3c6a3d',
        height: Dimensions.get('window').height / 5,
        borderBottomLeftRadius:80,
        borderBottomRightRadius:80,
        flex:1,
        flexGrow:1,
        
    },
    CategTitle:{
        fontSize:40,
        paddingTop:'15%',
        color: '#ffffff',
        fontWeight:'bold',
        alignSelf: 'center',
        textAlignVertical:'center',
    },
    imageWrapper:{
        flex:1,
        justifyContent:'center',
        alignSelf:'stretch'
        
    },
    images:{
        width:130,
        height:100,
        borderBottomRightRadius:25,
        borderTopLeftRadius:25,
        
    },
    box:{
        flexDirection:'row',
        backgroundColor:'#fff',
        marginLeft:"5%",
        marginRight:"5%",
        // width:Width/1.1,
        borderRadius:20,
        marginTop:'10%',
        shadowColor:'#000000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.05,
        shadowRadius:0.5,
        elevation:1,
        overflow:'hidden'
    },
    flat:{
        paddingTop:'2%',
        borderRadius:20,
        flex:1,
        flexGrow:1,
    },
    title:{
        color:'#3c6a3d',
        marginTop:'5%',
        fontSize:20,
        fontWeight:'bold',
        marginLeft: '5%'
    },
    desc:{
        flexDirection:'column'
    },
    description:{
        color:'#3c6a3d',
        marginTop:'2%',
        fontSize:16,
        marginLeft: '5%',
        maxWidth:210
        
    },
    cal:{
        color:'#3c6a3d',
        marginTop:'2%',
        fontSize:13,
        marginLeft: '5%'
    },
    card:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:'5%',
        marginLeft:'-0.1%'
    },
    add:{
        backgroundColor:'#3c6a3d',
        paddingHorizontal:'10%',
        paddingVertical:'5%',
        borderTopRightRadius:25,
        borderBottomLeftRadius:25
    },
    price:{
        color:'#3c6a3d',
        fontSize:20,
        fontWeight:'bold',
        marginLeft: '7%'
    }
});
