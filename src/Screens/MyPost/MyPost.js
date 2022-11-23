import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  Dimensions,
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
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addComment,
  deleteComment,
  MyPost,
  Like,
  updateCaption,
  DeletePost
} from '../../Redux/Actions/Post'
import {
  DELETE_POST_RESET,
  LIKE_AND_UNLIKE_POST_RESET,
  UPDATE_POST_RESET
} from '../../Redux/Constant'
import RBSheet from 'react-native-raw-bottom-sheet'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

var width = Dimensions.get('screen').width
var height = Dimensions.get('screen').height

const Post = ({ item, navigation }) => {
  const refRBSheet = useRef()
  const refRBSheet2 = useRef()

  const dispatch = useDispatch()

  const [LikedPost, setLikedPost] = useState(false)
  const [comment, setComment] = useState('')

  const { user } = useSelector(state => state.Auth)
  const { message } = useSelector(state => state.like)
  const { isDeleted, isUpdated, loading } = useSelector(state => state.post)

  useEffect(() => {
    if (isDeleted) {
      dispatch({ type: DELETE_POST_RESET })
      dispatch(MyPost())
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_POST_RESET })
      refRBSheet2.current.close()
      dispatch(MyPost())
    }
  }, [dispatch, isDeleted, isUpdated])

  useEffect(() => {
    if (message === 'Post Unliked') {
      setLikedPost(false)
      dispatch({
        type: LIKE_AND_UNLIKE_POST_RESET
      })
    }

    if (message !== null) {
      dispatch(MyPost())
      dispatch({
        type: LIKE_AND_UNLIKE_POST_RESET
      })
    }
  }, [dispatch, message, user._id, isDeleted])
  useEffect(() => {
    const interval = setInterval(() => {
      item?.likes?.forEach(items => {
        if (items._id === user?._id) {
          setLikedPost(true)
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [user?._id, item?.likes, item])

  const [Caption, setCaption] = useState('')
  const [id, setId] = useState('')
  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <View
        style={{
          width: width / 1.1,
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 3,
          elevation: 11,
          marginTop: 20
        }}
      >
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <View style={{ width: width / 1.5, flexDirection: 'row' }}>
            <Avatar.Image
              size={60}
              source={{
                uri: item?.owner?.avatar?.url
              }}
            />
            <Text
              style={{
                fontSize: 20,
                marginLeft: 20
              }}
            >
              {item?.owner?.name}
            </Text>
          </View>
          <View style={{ top: 6, marginLeft: 20 }}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('', 'What Do You Want To Do', [
                  {
                    text: 'Edit Post',
                    style: 'default',
                    onPress: () => {
                      refRBSheet2.current.open()
                      setCaption(item?.caption)
                      setId(item?._id)
                    }
                  },
                  {
                    text: 'Delete Post',
                    style: 'destructive',
                    onPress: () => {
                      Alert.alert('', 'Are You Sure You To Delete This Post', [
                        {
                          text: 'Cancel',
                          style: 'cancel'
                        },
                        {
                          text: 'Delete It',
                          style: 'destructive',
                          onPress: () => {
                            dispatch(DeletePost(item?._id))
                          }
                        }
                      ])
                    }
                    // dispatch(deleteComment(item._id, items._id))
                  }
                ])
              }
            >
              <MaterialCommunityIcons
                name={'dots-vertical'}
                size={40}
                color={'#590000'}
                style={{ textAlign: 'center' }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles?.Postcontainer}>
          <Text
            style={{
              fontSize: 20,
              margin: 10,
              textAlign: 'justify',
              color: '#303030',
              fontFamily: 'monospace'
            }}
          >
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
                    style={styles?.btn2}
                    onPress={() => {
                      if (comment !== '') {
                        dispatch(addComment(item._id, comment))
                        setComment('')
                      } else {
                        ToastAndroid.show(
                          'comment are required',
                          ToastAndroid.CENTER
                        )
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
                        style={{
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}
                      >
                        <MaterialCommunityIcons
                          name={'comment-multiple'}
                          size={140}
                          color={'#FFF'}
                          style={{
                            textAlign: 'center',
                            width: '50%',
                            margin: 50
                          }}
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
                            justifyContent: 'flex-start',
                            marginLeft: 14
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
                              <Text
                                style={{ fontSize: 16, marginBottom: 10 }}
                                onPress={() =>
                                  navigation?.navigate('UsersProfile', {
                                    id: items?.user?._id
                                  })
                                }
                              >
                                {items?.user?.name}
                              </Text>
                              <Text style={{ fontSize: 20 }}>
                                {items?.comment}
                              </Text>
                            </View>
                            <View style={{ width: '10%' }}>
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
                            </View>
                          </View>
                        </View>
                      ))
                    )}
                  </View>
                </ScrollView>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheet2}
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
                  backgroundColor: '#00627d',
                  minHeight: height / 2,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }}
            >
              <View
                style={{
                  minHeight: height / 2.2,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TextInput
                  style={styles.input}
                  onChangeText={setCaption}
                  value={Caption}
                  placeholder='Name'
                  placeholderTextColor='#0070FF'
                  textContentType='password'
                />
                <TouchableOpacity
                  style={styles?.btn}
                  disabled={loading ? true : false}
                  onPress={() => {
                    dispatch(updateCaption(id, Caption))
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      textAlign: 'center'
                    }}
                  >
                    {loading ? 'Updating Please Wait' : 'Update Cation'}
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  Postcontainer: {
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
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 20,
    height: 60,
    width: width / 1.2,
    marginLeft: 10,
    padding: 16,
    borderRadius: 10
  },
  btn: {
    backgroundColor: '#000',
    height: 60,
    marginTop: 20,
    marginLeft: 10,
    padding: 14,
    width: width / 1.2,
    borderRadius: 10
  },
  btn2: {
    height: 60,
    padding: 14,
    borderRadius: 10
  }
})
