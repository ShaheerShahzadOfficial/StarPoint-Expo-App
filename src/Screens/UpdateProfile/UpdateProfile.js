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
import { Avatar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { UpdateUserProfile } from '../../Redux/Actions/User'
import { UPDATE_PROFILE_RESET } from '../../Redux/Constant'

const UpdateProfile = ({ navigation }) => {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')

  const dispatch = useDispatch()
  const { user } = useSelector(state => state?.Auth)
  const { loading, isUpdated } = useSelector(state => state?.UpdateUser)

  useEffect(() => {
    if (user) {
      setName(user?.name)
      setEmail(user?.email)
    }
    if (isUpdated?.message === 'Profile Updated') {
      Alert?.alert('', 'Profile Updated')
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
      navigation?.navigate('Profile')
    }
  }, [navigation, dispatch, isUpdated])

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

  const login = () => {
    if (Name !== '' && Email !== '') {
      dispatch(UpdateUserProfile(Name, Email, avatar))
    } else {
      ToastAndroid.show('Name And Email Are Required', ToastAndroid.CENTER)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#0CEBEB' }}>
      <View style={styles?.container}>
        <View style={{ marginTop: 40 }}>
          <Avatar.Image
            size={200}
            source={{
              uri: avatar ? avatar : user?.avatar?.url
            }}
          />
        </View>
        <TouchableOpacity
          style={styles?.btn2}
          disabled={loading ? true : false}
          onPress={pickImage}
        >
          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
            Update Pic
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 16 }}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={Name}
            placeholder='Name'
            placeholderTextColor='#0070FF'
            textContentType='password'
          />
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={Email}
            placeholder='Email'
            placeholderTextColor='#0070FF'
            textContentType='password'
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles?.btn}
            disabled={loading ? true : false}
            onPress={login}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              {loading ? 'Updating Please Wait' : ' Update Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default UpdateProfile

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
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 16,
    marginTop: 40,
    marginBottom: 20
  },
  btn2: {
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
