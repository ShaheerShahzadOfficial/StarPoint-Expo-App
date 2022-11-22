import React, { useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux'
import { Logout } from '../Redux/Actions/Auth'
import { DeleteProfile } from '../Redux/Actions/User'

var width = Dimensions.get('screen').width

export default function Setting ({ navigation }) {
  const refRBSheet = useRef()
  const dispatch = useDispatch()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent'
      }}
    >
      <Entypo
        name={'list'}
        size={36}
        color={'#000'}
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: '#FFF'
          },
          container: {
            backgroundColor: '#000',
            height: 320,
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <View
          style={{
            marginTop: 10,
            width: width / 1.05,
            backgroundColor: '#353535',
            borderRadius: 6
          }}
        >
          <TouchableOpacity
            style={styles?.btn}
            onPress={() => navigation?.navigate('UpdateProfile')}
          >
            <MaterialIcons name={'update'} size={30} color={'#fff'} />
            <Text style={styles?.profile}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles?.btn}
            onPress={() => navigation?.navigate('UpdatePassword')}
          >
            <MaterialCommunityIcons
              name={'onepassword'}
              size={30}
              color={'#fff'}
              style={{ margin: 2 }}
            />
            <Text style={styles?.text}>Update Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles?.btn}
            onPress={() => dispatch(Logout())}
          >
            <MaterialCommunityIcons
              name={'logout'}
              size={30}
              color={'#fff'}
              style={{ margin: 2 }}
            />
            <Text style={styles?.text}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            width: width / 1.05,
            backgroundColor: '#353535',
            borderRadius: 6
          }}
        >
          <TouchableOpacity
            style={styles?.btn2}
            onPress={() => dispatch(DeleteProfile())}
          >
            {/* dangerous
             */}
            <MaterialIcons
              name={'dangerous'}
              size={30}
              color={'#fff'}
              //   style={{ margin: 2 }}
            />
            <Text style={styles?.text}>Delete My Account</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}
const styles = StyleSheet.create({
  btn: {
    // backgroundColor: '#5C5C5C',
    minHeight: 60,
    padding: 16,
    flexDirection: 'row'
  },
  btn2: {
    backgroundColor: '#353535',
    height: 60,
    padding: 16,
    borderRadius: 6,
    flexDirection: 'row',
    minHeight: 60
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    top: 4,
    left: 6
  },
  profile: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    top: 3,
    left: 6
  }
})
