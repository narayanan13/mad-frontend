import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignIn = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async () => {
        if (name === '' || email === '' || password === '') {
            alert("All fields are required");
            return;
        }
        await axios.post("http://localhost:8001/api/signin", { name, email, password });
        alert("Sign In Successful");
    };
    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={{ marginVertical: 100 }}>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/logo.png")} style={styles.imageStyles} />
            </View>
                <Text style={styles.signupText}>WELCOME</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: 'black' }}>Email</Text>
                    <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: 'black' }}>Password</Text>
                    <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoCompleteType="password" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>
                    Not yet registered? {" "}
                    <Text style={{color:'darkred', fontWeight:'bold',fontSize:16, textDecorationLine:'underline'}}
                        onPress={()=>navigation.navigate("SignUp")}>
                            SignUp
                    </Text>
                </Text>
                <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:-6,
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#C0E9F8'
    },
    signupText: {
        fontSize: 35,
        textAlign: 'center',
        color:'#1D0F79',
        fontWeight:'bold'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    imageContainer: { justifyContent: "center", alignItems: "center" },
    imageStyles: { width: 290, height: 150, marginVertical: 20 }
})

export default SignIn