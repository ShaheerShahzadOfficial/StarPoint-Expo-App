import React, { useEffect } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Avatar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { getPostOfFollowing } from '../Redux/Actions/Post'
import Post from './UserPost.js/Post'

var width = Dimensions.get('screen').width
var height = Dimensions.get('screen').height

const Home = ({ navigation }) => {
  const { post, loading } = useSelector(state => state.userPost)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPostOfFollowing())

    const interval = setInterval(() => {
      dispatch(getPostOfFollowing())
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles?.container}>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            marginTop: 30,
            marginBottom: 30,
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 100
          }}
        >
          <Avatar.Image
            size={60}
            style={{ elevation: 20 }}
            source={{
              uri:
                'https://res.cloudinary.com/shaheerdev/image/upload/v1667677099/SocialAppAvatar/l3isadcqxarilbkprb8c.png'
            }}
          />
          <TouchableOpacity
            style={styles?.btn}
            onPress={() => {
              navigation?.navigate('Create Post')
            }}
          >
            <Text
              style={{
                fontSize: 16
              }}
            >
              What's on your mind, Shaheer?
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {post?.length === 0 ? (
            <View>
              <Text style={{ fontSize: 30, color: '#590000' }}>
                No Post Found
              </Text>
            </View>
          ) : (
            post?.map((item, i) => <Post key={i} item={item} />)
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    minHeight: height / 1.18
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
  },
  btn: {
    backgroundColor: '#fff',
    minHeight: 60,
    padding: 16,
    borderWidth: 1,
    maxWidth: '81.6%',
    borderRadius: 100,
    marginLeft: 10
  }
})
