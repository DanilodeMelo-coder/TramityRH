import {useState} from 'react'
import {View, Text, TextInput, Pressable, Alert} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'


export default function TelaLogin({irParaRecuperar}){

    const[usuario, setUsuario] = useState('')
    const[senha, setSenha] = useState('')
    const[mostrarSenha, setMostrarSenha] = useState(false)

    function entrar(){
      if(!usuario || !senha){
        Alert.alert('Atenção', 'Preencha o e-mail/CPF e a senha.')
        return
      }
      Alert.alert('Login', 'Login realizado com sucesso!')
    }

    function esqueciSenha(){
      Alert.alert('Recuperação de acesso', 'Tela de recuperação de senha.')
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
          <Text style={styles.label}>E-mail ou CPF</Text>
          <TextInput
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
            placeholder='Digite seu e-mail ou CPF'
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

        <Pressable style={styles.botao} onPress={entrar}>
          <Text style={styles.botaoTexto}>ENTRAR</Text>
        </Pressable>

        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>Ainda não possui acesso?</Text>
          <Pressable onPress={()=> console.log('Fale com o RH')}>
            <Text style={styles.rodapeLink}>Fale com o RH</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}