import {useState} from 'react'
import {View, Text, TextInput, Pressable, ActivityIndicator} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'
import {validarCodigoRecuperacao, solicitarRecuperacao} from './auth'

export default function TelaCodigoVerificacao({email, voltarParaLogin, avancarParaNovaSenha}){

  const [codigo, setCodigo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')

  async function continuar(){
    if(codigo.length !== 6){
      setErro('Digite os 6 dígitos do código.')
      return
    }

    setErro('')
    setAviso('')
    setEnviando(true)
    try{
      const dados = await validarCodigoRecuperacao(email, codigo)
      avancarParaNovaSenha(dados.tokenRedefinicao)
    }catch(e){
      setErro(e.message)
    }finally{
      setEnviando(false)
    }
  }

  async function reenviar(){
    setErro('')
    setAviso('')
    setEnviando(true)
    try{
      await solicitarRecuperacao(email)
      setCodigo('')
      setAviso('Enviamos um novo código. O anterior não vale mais.')
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
          <Text style={styles.blocoTitulo}>Digite o <Text style={styles.destaque}> código </Text> que enviamos</Text>
          <Text style={styles.blocoSubTitulo}>Código de 6 dígitos enviado para {email}</Text>
        </View>

        <Text style={styles.label}>Código de 6 dígitos</Text>
        <TextInput
          style={[styles.input, styles.inputCodigoCentro]}
          value={codigo}
          onChangeText={(texto) => setCodigo(texto.replace(/\D/g, ''))}
          placeholder='000000'
          placeholderTextColor="#6b756f"
          keyboardType='number-pad'
          maxLength={6}
        />

        <Pressable
          style={[styles.botao, enviando && styles.botaoDesativado]}
          onPress={continuar}
          disabled={enviando}
        >
          {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Continuar</Text>}
        </Pressable>

        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
        {aviso !== '' && <Text style={styles.mensagem}>{aviso}</Text>}

        <Text style={styles.subTitulo}>Não recebeu o código?</Text>
        <Pressable onPress={reenviar} disabled={enviando}>
          <Text style={styles.linkVoltar}>Reenviar código</Text>
        </Pressable>

        <Pressable onPress={voltarParaLogin} disabled={enviando}>
          <Text style={styles.linkVoltar}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  )
}