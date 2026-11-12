import {useState} from 'react'
import {View, Text, TextInput, Pressable, ScrollView, ActivityIndicator} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'
import {realizarCadastro} from './auth'

// Coloca a máscara 000.000.000-00 enquanto a pessoa digita
function formatarCpf(texto){
  const n = texto.replace(/\D/g, '').slice(0, 11)
  if(n.length <= 3) return n
  if(n.length <= 6) return n.slice(0, 3) + '.' + n.slice(3)
  if(n.length <= 9) return n.slice(0, 3) + '.' + n.slice(3, 6) + '.' + n.slice(6)
  return n.slice(0, 3) + '.' + n.slice(3, 6) + '.' + n.slice(6, 9) + '-' + n.slice(9)
}

export default function TelaCadastro({voltarParaLogin}){

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [criada, setCriada] = useState(false)

  // Devolve a mensagem de erro, ou '' se estiver tudo certo
  function validar(){
    const cpfNumeros = cpf.replace(/\D/g, '')
    if(!nome.trim() || !cpf || !email.trim() || !senha || !confirmarSenha){
      return 'Preencha todos os campos.'
    }
    if(cpfNumeros.length !== 11) return 'O CPF deve ter 11 números.'
    if(!email.includes('@')) return 'Digite um e-mail válido.'
    if(senha !== confirmarSenha) return 'As senhas não são iguais.'
    return ''
  }

  async function criarConta(){
    const mensagem = validar()
    if(mensagem){
      setErro(mensagem)
      return
    }

    setErro('')
    setEnviando(true)
    try{
      // A API recebe o CPF só com números
      await realizarCadastro({
        nome: nome.trim(),
        cpf: cpf.replace(/\D/g, ''),
        email: email.trim(),
        senha,
      })
      setCriada(true)
    }catch(e){
      if(e.status === 409){
        setErro('Já existe uma conta com esse e-mail ou CPF.')
      }else{
        setErro('Não foi possível criar a conta. Tente de novo.')
      }
    }finally{
      setEnviando(false)
    }
  }

  return(
    <ScrollView
      style={styles.fundoTela}
      contentContainerStyle={styles.scrollConteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Logo />

      <View style={styles.bloco}>
        <Text style={styles.blocoTitulo}>Crie sua <Text style={styles.destaque}> conta </Text></Text>
        <Text style={styles.blocoSubTitulo}>Use o mesmo e-mail em que você recebeu o convite</Text>
      </View>

      {criada ? (
        <View>
          <Text style={styles.mensagem}>Conta criada! Agora é só entrar com seu e-mail e sua senha.</Text>
          <Pressable style={styles.botao} onPress={voltarParaLogin}>
            <Text style={styles.botaoTexto}>Ir para o login</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder='Digite seu nome completo'
              placeholderTextColor="#6b756f"
              autoCapitalize='words'
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              value={cpf}
              onChangeText={(texto) => setCpf(formatarCpf(texto))}
              placeholder='000.000.000-00'
              placeholderTextColor="#6b756f"
              keyboardType='number-pad'
              maxLength={14}
            />
          </View>

          <View style={styles.campo}>
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
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputSenha}>
              <TextInput
                style={styles.inputSenhaTexto}
                value={senha}
                onChangeText={setSenha}
                placeholder='Crie uma senha'
                placeholderTextColor="#6b756f"
                secureTextEntry={!mostrarSenha}
                autoCapitalize='none'
              />
              <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Text style={styles.mostrarSenha}>{mostrarSenha ? 'Ocultar' : 'Mostrar'}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              style={styles.input}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              placeholder='Digite a senha de novo'
              placeholderTextColor="#6b756f"
              secureTextEntry={!mostrarSenha}
              autoCapitalize='none'
            />
          </View>

          <Pressable
            style={[styles.botao, enviando && styles.botaoDesativado]}
            onPress={criarConta}
            disabled={enviando}
          >
            {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Criar conta</Text>}
          </Pressable>

          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          <Pressable onPress={voltarParaLogin} disabled={enviando}>
            <Text style={styles.linkVoltar}>Já tenho conta</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  )
}