import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Avatar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getPostOfFollowing, Like } from '../../Redux/Actions/Post'
import { LIKE_AND_UNLIKE_POST_RESET } from '../../Redux/Constant'
import RBSheet from 'react-native-raw-bottom-sheet'
import { deleteComment } from '../../Redux/Actions/Post'
var width = Dimensions.get('screen').width
var height = Dimensions.get('screen').height

const Post = ({ item }) => {
  const refRBSheet = useRef()

  const dispatch = useDispatch()

  const [LikedPost, setLikedPost] = useState(false)
  const [comment, setComment] = useState('')

  const { user } = useSelector(state => state.Auth)
  const { message } = useSelector(state => state.like)

  useEffect(() => {
    if (message === 'Post Unliked') {
      setLikedPost(false)
    }
    if (message !== null) {
      dispatch(getPostOfFollowing())
      dispatch({
        type: LIKE_AND_UNLIKE_POST_RESET
      })
    }
  }, [dispatch, message])

  useEffect(() => {
    item?.likes?.forEach(items => {
      if (items?._id === user?._id) {
        setLikedPost(true)
      } else {
        setLikedPost(false)
      }
    })

    const interval = setInterval(() => {
      item?.likes?.forEach(items => {
        if (items?._id === user?._id) {
          setLikedPost(true)
        } else {
          setLikedPost(false)
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [user?._id, item?.likes, item])
  const { user: me } = useSelector(state => state.Auth)

  return (
    <View
      style={{
        width: '90%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 3,
        elevation: 3,
        marginTop: 10,
        marginBottom: 10
      }}
    >
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Avatar.Image
          size={80}
          source={{
            uri: item?.owner?.avatar?.url
          }}
        />
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            marginLeft: 20
          }}
        >
          {item?.owner?.name}
        </Text>
      </View>

      <View style={styles?.Postcontainer}>
        <Text style={{ fontSize: 20, margin: 10, textAlign: 'justify' }}>
          {item?.caption}
        </Text>
        <Image
          source={{ uri: item?.files?.url }}
          style={{
            width: width / 1.2,
            height: 300,
            resizeMode: 'stretch'
          }}
        />

        <View style={{ flexDirection: 'row', top: 10 }}>
          <Text
            style={{
              textAlign: 'center',
              width: '50%',
              fontSize: 16
            }}
          >
            {item?.likes?.length} Likes
          </Text>
          <Text
            style={{
              textAlign: 'center',
              width: '50%',
              fontSize: 16
            }}
          >
            {item?.comments?.length} Comments
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: width / 1.2,
            marginTop: 20
          }}
        />

        <View style={styles?.Actions}>
          {LikedPost === true ? (
            <Ionicons
              name={'heart'}
              size={34}
              color={'#590000'}
              style={{ textAlign: 'center', width: '50%' }}
              onPress={() => dispatch(Like(item?._id))}
            />
          ) : (
            <Ionicons
              name={'heart-outline'}
              size={34}
              color={'#590000'}
              style={{ textAlign: 'center', width: '50%' }}
              onPress={() => dispatch(Like(item?._id))}
            />
          )}
          <MaterialCommunityIcons
            name={'comment-multiple-outline'}
            size={34}
            color={'#590000'}
            style={{ textAlign: 'center', width: '50%' }}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#9897972b'
          },
          draggableIcon: {
            backgroundColor: '#FFF',
            position: 'relative'
          },
          container: {
            backgroundColor: '#525252',
            minHeight: height / 2,
            alignItems: 'center',
            justifyContent: 'flex-start'
          }
        }}
      >
        <View style={{ minHeight: height / 2.2 }}>
          <View style={{ flex: 0.25, flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              value={comment}
              placeholder='Comment'
            />
            <TouchableOpacity
              style={styles?.btn}
              onPress={() => {
                if (comment !== '') {
                  dispatch(addComment(item._id, comment))
                  setComment('')
                } else {
                  ToastAndroid.show('comment are required', ToastAndroid.CENTER)
                }
              }}
            >
              <Ionicons
                name={'md-send-sharp'}
                size={34}
                color={'#fff'}
                style={{ textAlign: 'center' }}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 0.8 }}>
            <View
              style={{
                width: width / 1.05,
                borderRadius: 6
              }}
            >
              {item?.comments?.length === 0 ? (
                <View
                  style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                >
                  <MaterialCommunityIcons
                    name={'comment-multiple'}
                    size={140}
                    color={'#FFF'}
                    style={{ textAlign: 'center', width: '50%', margin: 50 }}
                    onPress={() => refRBSheet.current.open()}
                  />
                  <Text style={{ fontSize: 20, color: '#FFF' }}>
                    Be the first to comment
                  </Text>
                </View>
              ) : (
                item?.comments?.map((items, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Avatar.Image
                      size={60}
                      source={{
                        uri: items?.user?.avatar?.url
                      }}
                    />
                    <View
                      style={{
                        margin: 10,
                        backgroundColor: '#f0f0f0',
                        maxWidth: '78%',
                        borderRadius: 10,
                        padding: 10,
                        flexDirection: 'row'
                      }}
                    >
                      <View style={{ width: '90%' }}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>
                          {items?.user?.name}
                        </Text>
                        <Text style={{ fontSize: 20 }}>{items?.comment}</Text>
                      </View>
                      <View style={{ width: '10%' }}>
                        {items?.user?._id === me?._id ? (
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                '',
                                'Are You Sure You Want To Delete This Comment',
                                [
                                  {
                                    text: 'Cancel',
                                    style: 'cancel'
                                  },
                                  {
                                    text: 'Delete It',
                                    style: 'destructive',
                                    onPress: () =>
                                      dispatch(
                                        deleteComment(item._id, items._id)
                                      )
                                  }
                                ]
                              )
                            }
                          >
                            <MaterialCommunityIcons
                              name={'dots-vertical'}
                              size={40}
                              color={'#590000'}
                              style={{ textAlign: 'center' }}
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
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
  input: {
    // marginLeft: 'auto',
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 20,
    height: 60,
    width: width / 1.36,
    marginLeft: 10,
    padding: 16,
    borderRadius: 10
  },
  btn: {
    // backgroundColor: '#fff',
    color: '#000',
    height: 60,
    top: -6,
    marginLeft: 10,
    padding: 14,
    borderRadius: 10
  }
})
