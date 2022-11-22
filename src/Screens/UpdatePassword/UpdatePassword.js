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
import { UpdateUsersPassword } from '../../Redux/Actions/User'

const UpdatePassword = () => {
  const [NewPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state?.Auth)

  const updatePassword = () => {
    if (NewPassword !== '' && ConfirmPassword !== '') {
      if (NewPassword !== oldPassword) {
        dispatch(UpdateUsersPassword(oldPassword, NewPassword))
      } else {
        ToastAndroid.show(
          `Old Password And New Password Can't Be Same`,
          ToastAndroid.CENTER
        )
      }
    } else {
      ToastAndroid.show(
        'Old Password And New Password Are Required',
        ToastAndroid.CENTER
      )
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#0CEBEB' }}>
      <View style={styles?.container}>
        <Image
          style={{ width: 300, height: 300, marginTop: 20 }}
          source={require('../../../assets/splash.png')}
        />

        <View style={{ marginTop: 16 }}>
          <TextInput
            style={styles.input}
            onChangeText={setOldPassword}
            value={oldPassword}
            placeholder='Old Password'
            placeholderTextColor='#0070FF'
            textContentType='password'
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={setNewPassword}
            value={NewPassword}
            placeholder='New Password'
            placeholderTextColor='#0070FF'
            textContentType='password'
            secureTextEntry={true}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles?.btn}
            disabled={loading ? true : false}
            onPress={updatePassword}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              {loading ? 'Updating Please Wait' : ' Update Password'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default UpdatePassword

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
