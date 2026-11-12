import {useState} from 'react'
import {View, Text, TextInput, Pressable, ActivityIndicator} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'
import {realizarLogin} from './auth'


export default function TelaLogin({irParaRecuperar, irParaCadastro, aoEntrar}){

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [entrando, setEntrando] = useState(false)
    const [erro, setErro] = useState('')

    async function entrar(){
      if(!usuario.trim() || !senha){
        setErro('Preencha o e-mail e a senha.')
        return
      }

      setErro('')
      setEntrando(true)
      try{
        const dados = await realizarLogin(usuario.trim(), senha)
        aoEntrar(dados.perfil)
      }catch(e){
        if(e.status === 401){
          setErro('E-mail ou senha incorretos.')
        }else{
          setErro('Não foi possível entrar. Tente de novo.')
        }
      }finally{
        setEntrando(false)
      }
    }

  return(
    <View style={styles.fundo}>
      <View style={styles.card}>
      <Logo />

        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Entre para acompanhar <Text style={styles.destaque}> seu processo </Text></Text>
          <Text style={styles.blocoSubTitulo}>Documentos e etapas em um só lugar</Text>
        </View> 

        <View style={styles.campo}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
            placeholder='Digite seu e-mail'
            placeholderTextColor="#6b756f"
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputSenha}>
            <TextInput
              style={styles.inputSenhaTexto}
              value={senha}
              onChangeText={setSenha}
              placeholder='Digite sua senha'
              placeholderTextColor="#6b756f"
              secureTextEntry={!mostrarSenha}
            />
            <Pressable onPress={()=> setMostrarSenha(!mostrarSenha)}>
              <Text style={styles.mostrarSenha}>{mostrarSenha ? 'Ocultar' : 'Mostrar'}</Text>
            </Pressable>
          </View>
        </View>

        <Pressable onPress={irParaRecuperar}>
          <Text style={styles.linkEsqueci}>Esqueci minha senha</Text>
        </Pressable>

        <Pressable
          style={[styles.botao, entrando && styles.botaoDesativado]}
          onPress={entrar}
          disabled={entrando}
        >
          {entrando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>ENTRAR</Text>}
        </Pressable>

        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

        <View style={styles.rodapeConvite}>
          <Text style={styles.rodapeTexto}>Recebeu um convite?</Text>
          <Pressable onPress={irParaCadastro}>
            <Text style={styles.rodapeLink}>Criar conta</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}