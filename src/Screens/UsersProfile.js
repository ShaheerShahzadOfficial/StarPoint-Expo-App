import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  View,
  TouchableOpacity
} from 'react-native'
import { Avatar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser } from '../Redux/Actions/Auth'
import { MyPost } from '../Redux/Actions/Post'
import {
  followAndUnfollowUser,
  getUsersProfile,
  myProfile
} from '../Redux/Actions/User'
import Post from './MyPost/MyPost'
import Setting from './Setting'

var width = Dimensions.get('screen').width

const UsersProfile = ({ route, navigation }) => {
  const [myProfile, setMyProfile] = useState(false)
  const [following, setFollowing] = useState(false)
  const dispatch = useDispatch()
  const { id } = route.params

  useEffect(() => {
    dispatch(getUsersProfile(id))
    console.log('UserProfile')
  }, [dispatch, id])
  const { user } = useSelector(state => state.User)

  const { user: me } = useSelector(state => state.Auth)

  useEffect(() => {
    if (me?._id === id) {
      setMyProfile(true)
    } else {
      setMyProfile(false)
    }

    if (user) {
      user?.followers?.forEach(item => {
        if (item._id === me._id) {
          setFollowing(true)
        } else {
          setFollowing(false)
        }
      })
    }
  }, [id, me._id, user])

  const followHandler = async () => {
    setFollowing(!following)
    await dispatch(followAndUnfollowUser(user?.users?._id))
    await dispatch(getUsersProfile(id))
    await dispatch(LoadUser())
  }

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    dispatch(MyPost())

    wait(1000).then(() => setRefreshing(false))
  }, [])

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles?.container}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60%'
            }}
          >
            <Image
              style={{
                width: 160,
                height: 160,
                borderColor: '#013917',
                borderWidth: 2,
                borderRadius: 100,
                marginTop: 10
              }}
              source={{
                uri: user?.users?.avatar?.url
              }}
            />

            <Text style={{ textAlign: 'center', top: 12, fontSize: 20 }}>
              {`${user?.users?.name}`}
            </Text>
          </View>

          <View
            style={{
              position: 'relative',
              top: -10,
              width: '20%',
              alignItems: 'flex-end',
              left: 12
            }}
          >
            <Setting />
          </View>
        </View>

        <View style={{ width: 300, flexDirection: 'row', marginTop: 20 }}>
          <View
            style={{
              width: 100,
              padding: 10,
              minHeight: 100
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                top: 10,
                fontSize: 18
              }}
            >
              Follower
            </Text>

            <Text
              style={{
                textAlign: 'center',
                top: 20,
                fontSize: 18
              }}
            >
              {user?.users?.followers?.length}
            </Text>
          </View>

          <View
            style={{
              width: 100,
              padding: 10,
              minHeight: 100
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                top: 10,
                fontSize: 18
              }}
            >
              Following
            </Text>

            <Text
              style={{
                textAlign: 'center',
                top: 20,
                fontSize: 18
              }}
            >
              {user?.users?.following?.length}
            </Text>
          </View>

          <View
            style={{
              width: 100,
              padding: 10,
              minHeight: 100
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                top: 10,
                fontSize: 18
              }}
            >
              Post
            </Text>

            <Text
              style={{
                textAlign: 'center',
                top: 20,
                fontSize: 18
              }}
            >
              {user?.users?.posts?.length}
            </Text>
          </View>
        </View>

        {myProfile ? null : (
          <TouchableOpacity
            variant='contained'
            style={{ backgroundColor: following === true ? 'red' : '' }}
            onPress={followHandler}
            // disabled={followLoading}
          >
            <Text> {following === true ? 'Unfollow' : 'Follow'} </Text>
          </TouchableOpacity>
        )}

        <View style={{ marginTop: 10, marginBottom: 10 }}></View>
        {user?.post?.map((item, i) => (
          <Post key={i} item={item} />
        ))}

        {/* MyPost */}
      </View>
    </ScrollView>
  )
}

export default UsersProfile

const styles = StyleSheet.create({})
