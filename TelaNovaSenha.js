import {useState} from 'react'
import {View, Text, TextInput, Pressable, ActivityIndicator} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'
import {redefinirSenha} from './auth'

export default function TelaNovaSenha({tokenRedefinicao, irParaLogin}){

  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [trocada, setTrocada] = useState(false)

  async function salvar(){
    if(senha.length < 8){
      setErro('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    if(senha !== confirmar){
      setErro('As senhas não são iguais.')
      return
    }

    setErro('')
    setEnviando(true)
    try{
      await redefinirSenha(tokenRedefinicao, senha)
      setTrocada(true)
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
          <Text style={styles.blocoTitulo}>Crie uma <Text style={styles.destaque}> nova senha </Text></Text>
          <Text style={styles.blocoSubTitulo}>Use pelo menos 8 caracteres</Text>
        </View>

        {trocada ? (
          <View>
            <Text style={styles.mensagem}>Senha alterada! Agora é só entrar com a senha nova.</Text>
            <Pressable style={styles.botao} onPress={irParaLogin}>
              <Text style={styles.botaoTexto}>Ir para o login</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <View style={styles.campo}>
              <Text style={styles.label}>Nova senha</Text>
              <View style={styles.inputSenha}>
                <TextInput
                  style={styles.inputSenhaTexto}
                  value={senha}
                  onChangeText={setSenha}
                  placeholder='Digite a nova senha'
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
                value={confirmar}
                onChangeText={setConfirmar}
                placeholder='Digite a senha de novo'
                placeholderTextColor="#6b756f"
                secureTextEntry={!mostrarSenha}
                autoCapitalize='none'
              />
            </View>

            <Pressable
              style={[styles.botao, enviando && styles.botaoDesativado]}
              onPress={salvar}
              disabled={enviando}
            >
              {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Salvar nova senha</Text>}
            </Pressable>

            {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

            <Pressable onPress={irParaLogin} disabled={enviando}>
              <Text style={styles.linkVoltar}>Voltar ao login</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}