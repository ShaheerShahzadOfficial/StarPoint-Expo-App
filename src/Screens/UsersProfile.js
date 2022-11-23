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
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser } from '../Redux/Actions/Auth'
import { followAndUnfollowUser, getUsersProfile } from '../Redux/Actions/User'
import Post from './UsersPost/Post'

var width = Dimensions.get('screen').width

const UsersProfile = ({ route, navigation }) => {
  const [myProfile, setMyProfile] = useState(false)
  const [following, setFollowing] = useState(false)
  const dispatch = useDispatch()
  const { id } = route.params

  useEffect(() => {
    dispatch(getUsersProfile(id))
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
      user?.users?.followers?.forEach(item => {
        if (item._id === me._id) {
          setFollowing(true)
        }
      })
    }

    const interval = setInterval(() => {
      if (me?._id === id) {
        setMyProfile(true)
      }

      if (user) {
        user?.users?.followers?.forEach(item => {
          if (item._id === me._id) {
            setFollowing(true)
          }
        })
      }
    }, 1000)

    return clearInterval(interval)
  }, [id, me._id, user])

  const followHandler = async () => {
    setFollowing(!following)
    await dispatch(followAndUnfollowUser(user?.users?._id))
    await dispatch(getUsersProfile(id))
  }

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    dispatch(getUsersProfile(id))

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
        </View>

        <View style={{ width: 300, flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() =>
              navigation?.navigate('Follower', {
                Followers: user?.users?.followers
              })
            }
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
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation?.navigate('Following', {
                Followings: user?.users?.following
              })
            }
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
          </TouchableOpacity>

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

        {myProfile === true ? null : (
          <TouchableOpacity
            variant='contained'
            style={{
              backgroundColor: following === true ? 'red' : '#0077ce',
              padding: 6,
              borderRadius: 10
            }}
            onPress={followHandler}
            // disabled={followLoading}
          >
            <Text style={{ color: 'white', padding: 10, fontSize: 16 }}>
              {following === true ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ marginTop: 10, marginBottom: 10 }}></View>
        {user?.post?.map((item, i) => (
          <Post
            key={i}
            item={item}
            User={user?.users}
            id={id}
            navigation={navigation}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default UsersProfile

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    marginTop: 50
  },
  btn: {
    backgroundColor: '#fff',
    height: 60,
    padding: 16,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 100
  },
  Postcontainer: {
    // padding: 10,
    flex: 2,
    width: '100%'
  },
  Actions: {
    padding: 10,
    flex: 2,
    width: 'auto',
    flexDirection: 'row'
  }
})
