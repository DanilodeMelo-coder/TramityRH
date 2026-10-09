import {useState} from 'react'
import {View, Text, TextInput, Pressable} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'




export default function TelaCodigoVerificacao({voltarParaLogin}){

  const [codigo, setCodigo] = useState('')

  return(
    <View style={styles.fundo}>
      <View style={styles.card}>
        <Logo />

        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Digite o <Text style={styles.destaque}> código </Text> que enviamos</Text>
          <Text style={styles.blocoSubTitulo}>Código de 6 dígitos enviados para o contato cadastrado</Text>   
        </View>

        <Text style={styles.label}>Digite o código de 6 dígitos</Text>

        <TextInput
          style={styles.input}
          value={codigo}
          onChangeText={setCodigo}
          keyboardType='number-pad'
          maxLength={6}
        />
        

        <Pressable style={styles.botao} onPress={()=> console.log(codigo)}>
        <Text style={styles.botaoTexto}>Continuar</Text>
        </Pressable>

         <Text style={styles.subTitulo}>Não recebeu o código?</Text> 
         
         <Pressable onPress={()=> console.log('Enviado')}>
          <Text style={styles.linkVoltar}>Reenviar código</Text>
        </Pressable>

        <Pressable onPress={voltarParaLogin}>
          <Text style={styles.linkVoltar}>Voltar</Text>
        </Pressable> 

       

      </View>
    </View>



  )
}