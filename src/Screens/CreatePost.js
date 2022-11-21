import { StatusBar } from 'expo-status-bar'
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
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_POST_RESET } from '../Redux/Constant'
import { CreateUserPost } from '../Redux/Actions/Post'

const CreatePost = () => {
  const [Caption, setCaption] = useState('')
  const [PostImage, setImage] = useState('')

  const dispatch = useDispatch()
  const { success } = useSelector(state => state.post)

  useEffect(() => {
    if (success === true) {
      Alert.alert('Post Has been Created')
      setImage('')
      setCaption('')
      dispatch({
        type: CREATE_POST_RESET
      })
    }
  }, [dispatch, success])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // aspect: [4, 4],
      base64: true,
      allowsEditing: true
    })

    if (!result.canceled) {
      if (result?.assets !== undefined) {
        setImage(`data:image/jpg;base64,${result?.assets[0]?.base64}`)
      }
    }
  }

  return (
    <ScrollView style={styles?.scrollView}>
      <View style={styles?.container}>
        <View
          style={{
            backgroundColor: '#FFF',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            padding: 14,
            marginTop: PostImage ? 40 : 200
          }}
        >
          <Text style={{ fontSize: 40, color: '#590000' }}>New Post</Text>

          <TouchableOpacity style={styles?.btn} onPress={pickImage}>
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              Image
            </Text>
          </TouchableOpacity>

          {PostImage ? (
            <Image
              source={{ uri: PostImage }}
              style={{
                width: 260,
                height: 260,
                alignItems: 'center',
                justifyContent: 'center',
                resizeMode: 'stretch'
              }}
            />
          ) : null}

          <TextInput
            style={styles.input}
            onChangeText={setCaption}
            value={Caption}
            placeholder='Caption ...'
            placeholderTextColor='#0070FF'
          />

          <TouchableOpacity
            style={styles?.btn2}
            onPress={() => {
              if (Caption !== '' && PostImage !== '') {
                dispatch(CreateUserPost(Caption, PostImage))
              } else {
                ToastAndroid.show(
                  'Caption And Image is Required',
                  ToastAndroid.CENTER
                )
              }
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default CreatePost

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#0CEBEB'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0CEBEB',
    marginHorizontal: 0
  },
  container: {
    backgroundColor: '#0CEBEB',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: '100%'
  },
  container2: {
    backgroundColor: '#FFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 14
  },
  input: {
    backgroundColor: '#fff',
    color: '#2B00FF',
    marginBottom: 10,
    minHeight: 60,
    width: 300,
    padding: 20,
    marginTop: 10,
    fontSize: 20
  },
  btn: {
    backgroundColor: '#013917',
    height: 60,
    width: 200,
    elevation: 10,
    // marginLeft: 10,
    padding: 16,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 100
  },
  btn2: {
    backgroundColor: '#590000',
    height: 60,
    width: 300,
    elevation: 4,
    // marginLeft: 10,
    padding: 16,
    marginTop: 20,
    marginBottom: 20
    // borderRadius: 100
  }
})
