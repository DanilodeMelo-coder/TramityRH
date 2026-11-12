import { useState } from 'react'
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import { styles } from './Styles'
import Logo from './Logo'
import { aceitarConvite } from './auth'

export default function TelaConvite({ voltar, aoAceitar }) {
  const [codigo, setCodigo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function validar() {
    // RN01: o código tem 6 dígitos
    if (codigo.length !== 6) {
      setErro('Digite os 6 dígitos que a empresa enviou.')
      return
    }

    setErro('')
    setEnviando(true)
    try {
      await aceitarConvite(codigo)
      aoAceitar()
    } catch (e) {
      setErro(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <View style={styles.fundo}>
      <Logo />

      <View style={styles.bloco}>
        <Text style={styles.blocoTitulo}>
          Informe o <Text style={styles.destaque}> código </Text> do convite
        </Text>
        <Text style={styles.blocoSubTitulo}>
          Digite os 6 dígitos que a empresa enviou para você
        </Text>
      </View>

      <Text style={styles.label}>Código do convite</Text>
      <TextInput
        style={[styles.input, styles.inputCodigoCentro]}
        value={codigo}
        onChangeText={(texto) => setCodigo(texto.replace(/\D/g, ''))}
        placeholder="000000"
        placeholderTextColor="#6b756f"
        keyboardType="number-pad"
        maxLength={6}
      />

      <Pressable
        style={[styles.botao, enviando && styles.botaoDesativado]}
        onPress={validar}
        disabled={enviando}
      >
        {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Continuar</Text>}
      </Pressable>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <Pressable onPress={voltar} disabled={enviando}>
        <Text style={styles.linkVoltar}>Sair</Text>
      </Pressable>
    </View>
  )
}