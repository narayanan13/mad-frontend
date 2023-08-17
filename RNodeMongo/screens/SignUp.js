import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { Image } from 'react-native';
import axios from 'axios';

const SignUp=({navigation})=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    
    const validateEmail=(inputEmail)=>{
        const emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(inputEmail);
    }
    const handleSubmit=async()=>{
        
        if(name===''||email===''||password===''){
            alert("All fields are required!");
            return;
        }
        if(!validateEmail(email)){
            alert("Invalid email-id");
            return;
        }
        if(password.length<6){
            alert("Password must be at least 6 characters");
            return;
        }
        try{

            axios.post("https://mad-backend.onrender.com/summa",
            {
                name:name,
                email:email, 
                password:password
            }).then((res)=>{
                if(res.data.message=="success"){
                    alert("registration successful");
                    navigation.navigate("SignIn");
                }
                else{
                    alert("error occurred in registration");
                }
            })
        }
        catch(e){
            console.log("error occurred in the axios post");
        }
    }
    return(
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={require("../assets/logo.png")} style={styles.imageStyles}/>
                    </View>
                <Text style={styles.signupText}>NEW ACCOUNT</Text>
                    <View style={{marginHorizontal:24}}>
                        <Text style={{fontSize:16, color:'black'}}>Name</Text>
                        <TextInput 
                            style={styles.signupInput} 
                            value={name} 
                            onChangeText={text=>setName(text)}
                            autoCapitalize="words" autoCorrect={false}
                        />
                    </View>
                    <View style={{marginHorizontal:24}}>
                        <Text style={{fontSize:16, color:'black'}}>Email</Text>
                        <TextInput 
                            style={styles.signupInput} 
                            value={email} 
                            onChangeText={text=>setEmail(text)}
                            autoCompleteType="email" keyboardType="email-address"
                        />
                    </View>
                    <View style={{marginHorizontal:24}}>
                        <Text style={{fontSize:16, color:'black'}}>Password</Text>
                        <TextInput 
                            style={styles.signupInput} 
                            value={password} 
                            onChangeText={text=>setPassword(text)}
                            secureTextEntry={true} autoCompleteType="password"
                        />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:12, textAlign:'center'}}>
                    Already Joined? {" "}
                    <Text style={{color:'darkred', fontWeight:'bold',fontSize:16, textDecorationLine:'underline'}}
                        onPress={()=>navigation.navigate("SignIn")}>
                            Sign In
                    </Text>
                </Text>
                </View>
            
        </KeyboardAwareScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#C0E9F8'
    },
    signupText:{
        fontSize:35,
        textAlign:'center',
        color:'#1D0F79',
        fontWeight:'bold'
    },
    signupInput:{
        borderBottomWidth:0.5,
        height:48,
        borderBottomColor:"#8e93a1",
        marginBottom:30
    },
    buttonStyle:{
        backgroundColor:"darkmagenta",
        height:50,
        marginBottom:20,
        justifyContent:"center",
        marginHorizontal:15,
        borderRadius:15
    },
    buttonText:{
        fontSize:20,
        textAlign:'center',
        color:'#fff',
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    imageContainer:{
        justifyContent:"center",
        alignItems:"center",
        // marginBottom:-50
    },
    imageStyles:{
        width:290,
        height:130,
        marginVertical:20
    }
})

export default SignUp