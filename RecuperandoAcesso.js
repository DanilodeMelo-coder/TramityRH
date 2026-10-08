import {useState} from 'react'
import {View, Text, TextInput, Pressable} from 'react-native'
import {styles} from './Styles'


export default function RecuperarAcesso(){

    const[contato, setContato] = useState('')

  return(
    <View style={styles.fundo}>
      <View style={styles.card}>
        <Text style={styles.marca}>docRH</Text>
        <Text style={styles.titulo}>Recuperar acesso</Text>
        <Text style={styles.subTitulo}>Informe seus dados para recuperar sua conta</Text>
        <Text style={styles.label}>Digite seu email</Text>
        <TextInput 
          style={styles.input}
          value={contato}
          onChangeText={setContato}
          placeholder='Digite seu email'
          placeholderTextColor= "#8a90b5"
        />
        <Pressable style={styles.botao} onPress={()=> console.log('Enviamos um email para',contato )}>
        <Text style={styles.botaoTexto}>Continuar</Text>
        </Pressable>

        <Pressable onPress={()=> console.log('Voltar')}>
          <Text style={styles.linkVoltar}>Voltar</Text>
        </Pressable>  

      </View>
    </View>
  ) 
}
