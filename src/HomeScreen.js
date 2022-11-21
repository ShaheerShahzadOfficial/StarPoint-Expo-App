import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation }) => {
  const { loading } = useSelector(state => state?.Auth)
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 300, marginTop: 100 }}
        source={require('../assets/splash.png')}
      />
      <StatusBar style='auto' />
      {loading === true ? (
        <ActivityIndicator size={80} color='#013917' />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              backgroundColor: '#590000',
              height: 50,
              width: 300,
              elevation: 10,
              marginLeft: 10,
              padding: 10,
              marginTop: 100
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: '#013917',
              marginBottom: 50,
              height: 50,
              width: 300,
              elevation: 10,
              marginLeft: 10,
              padding: 10,
              marginTop: 20
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default HomeScreen

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
    width: 200,
    padding: 3,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#013917'
  }
})
