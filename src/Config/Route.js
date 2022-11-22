import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home'
import Login from '../Screens/Login'
import Register from '../Screens/Register'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Account from '../Screens/Account'
import CreatePost from '../Screens/CreatePost'
import SearchUser from '../Screens/SearchUser'
import HomeScreen from '../HomeScreen'
import { LoadUser } from '../Redux/Actions/Auth'
import UsersProfile from '../Screens/UsersProfile'
import UpdateProfile from '../Screens/UpdateProfile/UpdateProfile'
import UpdatePassword from '../Screens/UpdatePassword/UpdatePassword'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MyTabs () {
  return (
    <Tab.Navigator
      useLegacyImplementation
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
            return (
              <MaterialCommunityIcons name={iconName} size={34} color={color} />
            )
          } else if (route.name === 'Profile') {
            iconName = focused ? 'md-person-circle' : 'md-person-circle-outline'
            return <Ionicons name={iconName} size={34} color={color} />
          } else if (route.name === 'Create Post') {
            iconName = focused ? 'md-add-circle-sharp' : 'md-add-circle-outline'
            return <Ionicons name={iconName} size={34} color={color} />
          } else if (route.name === 'SearchUser') {
            iconName = focused ? 'account-search' : 'account-search-outline'
            return (
              <MaterialCommunityIcons name={iconName} size={34} color={color} />
            )
          }
        },
        tabBarActiveTintColor: '#013917',
        tabBarInactiveTintColor: '#590000'
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Create Post' component={CreatePost} />
      <Tab.Screen name='SearchUser' component={SearchUser} />
      <Tab.Screen name='Profile' component={Account} />
    </Tab.Navigator>
  )
}

function MyStack () {
  const { user } = useSelector(state => state?.Auth)

  return (
    <Stack.Navigator useLegacyImplementation>
      {user ? (
        <>
          <Stack.Screen
            name='Tabs'
            component={MyTabs}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='UsersProfile'
            component={UsersProfile}
            options={{
              headerShown: true,
              headerTitle: '',
              headerShadowVisible: false
            }}
          />
          <Stack.Screen
            name='UpdateProfile'
            component={UpdateProfile}
            options={{
              headerShown: true,
              headerTitle: 'Update Your Profile',
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name='UpdatePassword'
            component={UpdatePassword}
            options={{
              headerShown: true,
              headerTitle: 'Update Your Password',
              headerShadowVisible: false
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function Route () {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(LoadUser())
  }, [dispatch])
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
