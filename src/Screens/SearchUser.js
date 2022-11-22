import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Avatar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../Redux/Actions/User'

const width = Dimensions.get('screen').width

const SearchUser = ({ navigation }) => {
  const [name, setName] = useState('')

  const { users } = useSelector(state => state.allUsers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUser(name))
  }, [dispatch, name])
  return (
    <ScrollView style={styles?.scrollView}>
      <View style={styles?.container}>
        <View
          style={{
            backgroundColor: '#FFF',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 14,
            marginTop: 100
          }}
        >
          <Text style={{ fontSize: 40, color: '#590000' }}>Search User</Text>

          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder='User Name'
            placeholderTextColor='#0070FF'
          />

          <View>
            {users &&
              users?.map((user, i) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UsersProfile', {
                      id: user?._id
                    })
                  }}
                  key={i}
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: width / 1.2,
                    marginTop: 20,
                    flexDirection: 'row'
                  }}
                >
                  <Avatar.Image size={70} source={{ uri: user?.avatar?.url }} />
                  <Text
                    style={{ textAlign: 'center', fontSize: 20, margin: 16 }}
                  >
                    {user?.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default SearchUser

const styles = StyleSheet.create({
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
    width: 'auto'
  },

  input: {
    backgroundColor: '#fff',
    color: '#2B00FF',
    marginBottom: 10,
    minHeight: 60,
    width: 300,
    padding: 20,
    marginTop: 10,
    fontSize: 20,
    borderRadius: 30,
    borderWidth: 1
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
