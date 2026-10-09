import {useState} from 'react'
import {View, Text, TextInput, Pressable} from 'react-native'
import {styles} from './Styles'


export default function RecuperarAcesso({voltarParaLogin, avancarParaVerificacao}){

    const[contato, setContato] = useState('')
    const[enviado, setEnviado] = useState(false)

  return(
    <View style={styles.fundo}>
      <View style={styles.card}>
        <Text style={styles.marca}>Tramity</Text>

        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Vamos recuperar seu <Text style={styles.destaque}>seu acesso </Text></Text>
          <Text style={styles.blocoSubTitulo}>Informe seus dados para recuperar sua conta</Text>
        </View>

        <Text style={styles.label}>Digite seu email</Text>
        <TextInput 
          style={styles.input}
          value={contato}
          onChangeText={setContato}
          placeholder='Digite seu email'
          placeholderTextColor= "#6b756f"
        />
        <Pressable style={styles.botao} onPress={avancarParaVerificacao}>
        <Text style={styles.botaoTexto}>Continuar</Text>
        </Pressable>
        {enviado && <Text style={styles.mensagem}> Enviamos um codigo de verifição para o email </Text>}

        <Pressable onPress={voltarParaLogin}>
          <Text style={styles.linkVoltar}>Voltar</Text>
        </Pressable>  

      </View>
    </View>
  ) 
}