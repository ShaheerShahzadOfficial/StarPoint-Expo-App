import React, { useEffect, useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import { Avatar } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterUser } from '../Redux/Actions/Auth'

const Register = ({ navigation }) => {
  const [avatar, setAvatar] = useState('')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { error, success, loading } = useSelector(state => state?.Auth)
  useEffect(() => {
    if (error?.msg === 'You Are Already a User') {
      Alert.alert('', 'You Are Already Registered')
    }
    if (success === true) {
      Alert.alert('', 'You Are Registered')
      navigation?.navigate('Login')
    }
  }, [error, success])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      base64: true
    })

    if (!result.canceled) {
      if (result?.assets !== undefined) {
        setAvatar(`data:image/jpg;base64,${result?.assets[0].base64}`)
      }
    }
  }

  const register = () => {
    if (Name !== '' && Email !== '' && Password !== '' && avatar !== '') {
      dispatch(RegisterUser(Name, Email, Password, avatar))
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Name Email Password And Avatar Are Required',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        180
      )
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0CEBEB' }}>
      <View style={styles?.container}>
        <Text
          style={{
            color: '#590000',
            fontSize: 40,
            marginTop: 30,
            marginBottom: 10
          }}
        >
          Register User
        </Text>

        <View style={{ marginTop: 16 }}>
          <Avatar.Image
            size={150}
            source={{
              uri: avatar
                ? avatar
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8sWItJHAxNH9OOPWQ9urcp2EaSKTu-Cw4UA&usqp=CAU'
            }}
          />
        </View>

        <View>
          <TouchableOpacity style={styles?.btn} onPress={pickImage}>
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              Choose Profile Pic
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={Name}
            placeholder='Name'
            placeholderTextColor='#0070FF'
            textContentType='username'
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={Email}
            placeholder='Email'
            placeholderTextColor='#0070FF'
            textContentType='emailAddress'
            keyboardType='email-address'
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={Password}
            placeholder='Password'
            placeholderTextColor='#0070FF'
            textContentType='password'
            secureTextEntry={true}
          />
        </View>

        <View>
          <TouchableOpacity style={styles?.btn} onPress={register}>
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              {loading ? 'Registration In Process' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  btn: {
    backgroundColor: '#590000',
    height: 60,
    width: 240,
    elevation: 10,
    marginLeft: 10,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 100
  },
  input: {
    // marginLeft: 'auto',
    // marginRight: 'auto',
    backgroundColor: '#fff',
    color: '#2B00FF',
    marginBottom: 10,
    height: 60,
    width: 300,
    marginLeft: 10,
    padding: 16,
    marginTop: 20
  }
})
