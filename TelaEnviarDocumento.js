import { useState } from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { styles } from './Styles'
import Logo from './Logo'
import { enviarDocumento } from './documentos'

const TAMANHO_MAXIMO = 5 * 1024 * 1024 // 5 MB em bytes

// documento: { id, nomeTipo, status, motivoRecusa } (formato da rota 9)
export default function TelaEnviarDocumento({ documento, voltar, aoEnviar }) {

  const [arquivo, setArquivo] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  async function escolherArquivo() {
    setErro('')
    const resultado = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/jpeg', 'image/png'],
      copyToCacheDirectory: true,
    })

    if (resultado.canceled) return

    const escolhido = resultado.assets[0]
    if (escolhido.size > TAMANHO_MAXIMO) {
      setArquivo(null)
      setErro('O arquivo passa de 5 MB. Escolha um menor.')
      return
    }
    setArquivo(escolhido)
  }

  async function enviar() {
    if (!arquivo) return
    setErro('')
    setEnviando(true)
    try {
      await enviarDocumento(documento.id, arquivo)
      if (aoEnviar) aoEnviar(documento.id)
      setEnviado(true)
    } catch (e) {
      setErro('Não foi possível enviar. Tente de novo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <View style={styles.fundo}>
      <Logo />

      <View style={styles.bloco}>
        <Text style={styles.blocoTitulo}>Envie seu <Text style={styles.destaque}> {documento.nomeTipo} </Text></Text>
        <Text style={styles.blocoSubTitulo}>PDF, JPG ou PNG, até 5 MB</Text>
      </View>

      {documento.status === 'RECUSADO' && (
        <Text style={styles.motivoRecusa}>Recusado: {documento.motivoRecusa}</Text>
      )}

      {enviado ? (
        <View>
          <Text style={styles.mensagem}>Documento enviado! Ele está em análise pelo RH.</Text>
          <Pressable style={styles.botao} onPress={voltar}>
            <Text style={styles.botaoTexto}>Voltar</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Arquivo</Text>
          <View style={styles.arquivoCaixa}>
            <Text style={arquivo ? styles.arquivoNome : styles.arquivoVazio}>
              {arquivo ? arquivo.name : 'Nenhum arquivo escolhido'}
            </Text>
          </View>

          <Pressable style={styles.botaoSecundario} onPress={escolherArquivo} disabled={enviando}>
            <Text style={styles.botaoSecundarioTexto}>{arquivo ? 'Trocar arquivo' : 'Escolher arquivo'}</Text>
          </Pressable>

          <Pressable
            style={[styles.botao, (!arquivo || enviando) && styles.botaoDesativado]}
            onPress={enviar}
            disabled={!arquivo || enviando}
          >
            {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Enviar</Text>}
          </Pressable>

          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          <Pressable onPress={voltar} disabled={enviando}>
            <Text style={styles.linkVoltar}>Voltar</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}