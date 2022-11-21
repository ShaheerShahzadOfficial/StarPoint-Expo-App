import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../Redux/Actions/Auth'

const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state?.Auth)

  useEffect(() => {
    if (error?.msg === 'You Are Not Registered User') {
      Alert.alert('', 'You Are Not Registered User')
    }
  }, [error])

  const login = () => {
    if (Email !== '' && Password !== '') {
      dispatch(LoginUser(Email, Password))
    } else {
      ToastAndroid.show('Email And Password Are Required', ToastAndroid.CENTER)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#0CEBEB' }}>
      <View style={styles?.container}>
        <Image
          style={{ width: 300, height: 300, marginTop: 80 }}
          source={require('../../assets/splash.png')}
        />

        <View style={{ marginTop: 16 }}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={Email}
            placeholder='Email'
            placeholderTextColor='#0070FF'
            textContentType='emailAddress'
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
          <TouchableOpacity
            style={styles?.btn}
            disabled={loading ? true : false}
            onPress={login}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              {loading ? 'Please Wait' : ' Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#0CEBEB',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto'
  },
  btn: {
    backgroundColor: '#013917',
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
