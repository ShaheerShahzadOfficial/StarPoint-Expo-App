import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import Store from './src/Redux/Store'
import Route from './src/Config/Route'
import { StatusBar } from 'react-native'
export default function App () {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <StatusBar animated={true} backgroundColor='#00008b' />
        <Route />
      </PaperProvider>
    </Provider>
  )
}
