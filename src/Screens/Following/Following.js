import React, { useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Avatar } from 'react-native-paper'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const Following = ({ route, navigation }) => {
  const [User, setUser] = useState('')

  const { Followings } = route.params
  return (
    <View style={styles?.container}>
      <View>
        <TextInput
          value={User}
          onChangeText={setUser}
          placeholder='search User ...'
          style={styles?.input}
          textContentType='username'
          placeholderTextColor='#0070FF'
        />
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: '#0CEBEB' }}>
        <View>
          {Followings?.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate('UsersProfile', {
                  id: item?._id
                })
              }}
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: width / 1.2,
                marginTop: 20,
                flexDirection: 'row'
              }}
            >
              <Avatar.Image size={70} source={{ uri: item?.avatar?.url }} />
              <Text style={{ textAlign: 'center', fontSize: 20, margin: 16 }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Following

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CEBEB',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 'auto',
    paddingTop: 50,
    minHeight: height
  },
  btn: {
    backgroundColor: '#fff',
    height: 60,
    padding: 16,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 100
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#0060FF',
    fontSize: 20,
    height: 60,
    width: width / 1.2,
    marginLeft: 10,
    padding: 16,
    borderRadius: 10
  }
})
