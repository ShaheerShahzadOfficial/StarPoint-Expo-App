import React, { useEffect, useLayoutEffect, useRef } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  View
} from 'react-native'
import { Avatar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { MyPost } from '../Redux/Actions/Post'
import { myProfile } from '../Redux/Actions/User'
import Post from './MyPost/MyPost'
import Setting from './Setting'

var width = Dimensions.get('screen').width

const Account = ({ navigation }) => {
  const { loading, user } = useSelector(state => state?.Auth)
  const { post } = useSelector(state => state?.myPost)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(MyPost())
    dispatch(myProfile())

    const interval = setInterval(() => {
      dispatch(MyPost())
      dispatch(myProfile())
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

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
                uri: user?.avatar?.url
              }}
            />

            <Text style={{ textAlign: 'center', top: 12, fontSize: 20 }}>
              {`${user?.name}`}
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
              {user?.followers?.length}
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
              {user?.following?.length}
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
              {user?.posts?.length}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10, marginBottom: 10 }}></View>
        {post?.posts?.map((item, i) => (
          <Post key={i} item={item} />
        ))}

        {/* MyPost */}
      </View>
    </ScrollView>
  )
}

export default Account

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
