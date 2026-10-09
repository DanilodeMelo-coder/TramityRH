import {View, Text, Image} from 'react-native'
import {styles} from './Styles'

export default function Logo(){
  return(
    <View style={styles.logo}>
      <Image source={require('./assets/logo.png')} style={styles.logoImagem} />
      <Text style={styles.logoNome}>Tramity</Text>
    </View>
  )
}