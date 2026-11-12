import {useState} from 'react'
import {View, Text, TextInput, Pressable, ActivityIndicator} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'
import {solicitarRecuperacao} from './auth'

export default function RecuperarAcesso({voltarParaLogin, avancarParaVerificacao}){

  const [email, setEmail] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function continuar(){
    if(!email.trim() || !email.includes('@')){
      setErro('Digite um e-mail válido.')
      return
    }

    setErro('')
    setEnviando(true)
    try{
      await solicitarRecuperacao(email.trim())
      avancarParaVerificacao(email.trim())
    }catch(e){
      setErro(e.message)
    }finally{
      setEnviando(false)
    }
  }

  return(
    <View style={styles.fundo}>
      <View style={styles.card}>
        <Logo />

        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Vamos recuperar <Text style={styles.destaque}> seu acesso </Text></Text>
          <Text style={styles.blocoSubTitulo}>Informe o e-mail da sua conta para receber um código</Text>
        </View>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder='Digite seu e-mail'
          placeholderTextColor="#6b756f"
          autoCapitalize='none'
          keyboardType='email-address'
        />

        <Pressable
          style={[styles.botao, enviando && styles.botaoDesativado]}
          onPress={continuar}
          disabled={enviando}
        >
          {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Continuar</Text>}
        </Pressable>

        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

        <Pressable onPress={voltarParaLogin} disabled={enviando}>
          <Text style={styles.linkVoltar}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  )
}