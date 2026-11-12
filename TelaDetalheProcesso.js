import {useState, useEffect} from 'react'
import {View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, Alert, Linking, Platform} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'
import {buscarProcesso, avaliarDocumento, baixarArquivoEnvio, concluirProcesso} from './processo'
import {CONFIG, obteerToken} from './config'

const NOME_TIPO = {ADMISSAO: 'Admissão', DEMISSAO: 'Demissão'}

export default function TelaDetalheProcesso({resumo, voltar}){
  const [processo, setProcesso] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [erroAcao, setErroAcao] = useState('')
  const [salvandoId, setSalvandoId] = useState(null)
  const [recusandoId, setRecusandoId] = useState(null)
  const [motivo, setMotivo] = useState('')
  const [concluindo, setConcluindo] = useState(false)
  const [avisoPendencias, setAvisoPendencias] = useState('')
  
  async function carregar(){
    setCarregando(true)
    setErro('')
    try{
      setProcesso(await buscarProcesso(resumo.id))
    }catch(e){
      setErro('Não foi possível carregar o processo.')
    }finally{
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  // Função real para visualizar/descarregar o documento enviado (Rota 11 conectada à API)
    async function visualizarArquivo(idUltimoEnvio) {
    setErroAcao('')

    if (!idUltimoEnvio) {
      setErroAcao('Nenhum arquivo enviado para este documento.')
      return
    }
    if (Platform.OS !== 'web') {
      setErroAcao('Por enquanto, os arquivos só abrem na versão web.')
      return
    }

    // Abre a aba já no clique, senão o navegador bloqueia como pop-up
    const janela = window.open('', '_blank')
    try {
      const arquivo = await baixarArquivoEnvio(idUltimoEnvio)
      janela.location.href = URL.createObjectURL(arquivo)
    } catch (e) {
      janela.close()
      setErroAcao('Não foi possível abrir o arquivo.')
    }
  }
   async function avaliar(idDocumento, resultado, motivoRecusa){
    setErroAcao('')
    setSalvandoId(idDocumento)
    try{
      await avaliarDocumento(resumo.id, idDocumento, {resultado, motivoRecusa})
      setRecusandoId(null)
      setMotivo('')
      setProcesso(await buscarProcesso(resumo.id))
    }catch(e){
      if(e.status === 409){
        setErroAcao('Este documento não está mais em análise.')
      }else if(e.status === 400){
        setErroAcao('Toda recusa precisa de um motivo.')
      }else{
        setErroAcao('Não foi possível salvar. Tente de novo.')
      }
    }finally{
      setSalvandoId(null)
    }
  }

  function confirmarRecusa(idDocumento){
    if(!motivo.trim()){
      setErroAcao('Toda recusa precisa de um motivo.')
      return
    }
    avaliar(idDocumento, 'RECUSADO', motivo.trim())
  }

  function cancelarRecusa(){
    setRecusandoId(null)
    setMotivo('')
    setErroAcao('')
  }

    async function concluir(confirmar){
    setErroAcao('')
    setConcluindo(true)
    try{
      setProcesso(await concluirProcesso(resumo.id, confirmar))
      setAvisoPendencias('')
    }catch(e){
      if(e.status === 409 && !confirmar && e.message.startsWith('Há documentos pendentes')){
        // A API pede confirmação: mostra a lista e os botões
        setAvisoPendencias(e.message)
      }else{
        setAvisoPendencias('')
        setErroAcao(e.message)
      }
    }finally{
      setConcluindo(false)
    }
  }

  const nome = resumo.nomeColaborador || resumo.emailConvite
  const docs = processo ? processo.documentos : []
  const analisar = docs.filter(d => d.status === 'EM_ANALISE')
  const faltam = docs.filter(d => d.status === 'PENDENTE' || d.status === 'RECUSADO')
  const aprovados = docs.filter(d => d.status === 'APROVADO')
  const concluido = processo !== null && processo.status === 'CONCLUIDO'
  const ocupado = salvandoId !== null

  return(
    <ScrollView
      style={styles.fundoTela}
      contentContainerStyle={styles.scrollConteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Logo />
      <View style={styles.bloco}>
        <Text style={styles.blocoTitulo}>
          {NOME_TIPO[resumo.tipo]} de <Text style={styles.destaque}> {nome} </Text>
        </Text>
        {processo ? (
          <View>
            <View style={styles.progresso}>
              {docs.map((d, i) => (
                <View key={d.id} style={[styles.segmento, i < aprovados.length && styles.segmentoCheio]} />
              ))}
            </View>
            <Text style={styles.blocoSubTitulo}>
              {aprovados.length} de {docs.length} aprovados · {analisar.length} em análise
            </Text>
          </View>
        ) : (
          <Text style={styles.blocoSubTitulo}>
            {resumo.nomeColaborador ? resumo.emailConvite : 'Convite ainda não usado'}
          </Text>
        )}
      </View>

      {carregando && <ActivityIndicator color="#0e6b4b" style={styles.carregando} />}
      {erro !== '' && (
        <View>
          <Text style={styles.erro}>{erro}</Text>
          <Pressable onPress={carregar}>
            <Text style={styles.linkVoltar}>Tentar de novo</Text>
          </Pressable>
        </View>
      )}

      {concluido && (
        <Text style={styles.mensagem}>Processo concluído. Não é mais possível avaliar documentos.</Text>
      )}

      {erroAcao !== '' && <Text style={styles.erro}>{erroAcao}</Text>}

      {/* Seção: Para Analisar */}
      {processo && analisar.length > 0 && (
        <View>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Para analisar</Text>
            <View style={styles.secaoBadge}>
              <Text style={styles.secaoBadgeTexto}>{analisar.length}</Text>
            </View>
          </View>
          <View style={styles.listaCard}>
            {analisar.map((d, i) => {
              const salvando = salvandoId === d.id
              return(
                <View key={d.id} style={[styles.itemColuna, i > 0 && styles.itemLinha]}>
                  <Text style={styles.itemNome}>{d.nomeTipo}</Text>
                  {d.descricao ? <Text style={styles.itemSub}>{d.descricao}</Text> : null}
                  <Text style={styles.itemAnalise}>Enviado, aguardando análise</Text>

                  {/* Botão de visualizar o documento enviado */}
                  <Pressable 
                    style={styles.botaoSecundario} 
                    onPress={() => visualizarArquivo(d.idUltimoEnvio, d.nomeTipo)}
                  >
                    <Text style={styles.botaoSecundarioTexto}>📄 Ver documento enviado</Text>
                  </Pressable>

                  {!concluido && recusandoId === d.id && (
                    <View>
                      <TextInput
                        style={styles.inputMotivo}
                        value={motivo}
                        onChangeText={setMotivo}
                        placeholder='Motivo da recusa...'
                        placeholderTextColor="#6b756f"
                        multiline
                      />
                      <View style={styles.acoes}>
                        <Pressable
                          style={[styles.botaoPequeno, styles.acaoEspaco, ocupado && styles.botaoDesativado]}
                          onPress={() => confirmarRecusa(d.id)}
                          disabled={ocupado}
                        >
                          {salvando
                            ? <ActivityIndicator color="#fff" />
                            : <Text style={styles.botaoPequenoTexto}>Confirmar recusa</Text>}
                        </Pressable>
                        <Pressable style={styles.botaoPequenoClaro} onPress={cancelarRecusa} disabled={ocupado}>
                          <Text style={styles.botaoPequenoClaroTexto}>Cancelar</Text>
                        </Pressable>
                      </View>
                    </View>
                  )}

                  {!concluido && recusandoId !== d.id && (
                    <View style={styles.acoes}>
                      <Pressable
                        style={[styles.botaoPequeno, styles.acaoEspaco, ocupado && styles.botaoDesativado]}
                        onPress={() => avaliar(d.id, 'APROVADO', null)}
                        disabled={ocupado}
                      >
                        {salvando
                          ? <ActivityIndicator color="#fff" />
                          : <Text style={styles.botaoPequenoTexto}>Aprovar</Text>}
                      </Pressable>
                      <Pressable
                        style={[styles.botaoPequenoClaro, ocupado && styles.botaoDesativado]}
                        onPress={() => {
                          setErroAcao('')
                          setMotivo('')
                          setRecusandoId(d.id)
                        }}
                        disabled={ocupado}
                      >
                        <Text style={styles.botaoPequenoClaroTexto}>Recusar</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        </View>
      )}

      {/* Seção: Faltam enviar */}
      {processo && faltam.length > 0 && (
        <View>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Faltam enviar</Text>
          </View>
          <View style={styles.listaCard}>
            {faltam.map((d, i) => (
              <View key={d.id} style={[styles.itemColuna, i > 0 && styles.itemLinha]}>
                <Text style={styles.itemNome}>{d.nomeTipo}</Text>
                {d.descricao ? <Text style={styles.itemSub}>{d.descricao}</Text> : null}
                {d.status === 'RECUSADO' ? (
                  <View>
                    <Text style={styles.itemRecusado}>Recusado: {d.motivoRecusa}</Text>
                    <Text style={styles.itemSub}>Aguardando o colaborador reenviar</Text>
                  </View>
                ) : (
                  <Text style={styles.itemSub}>Ainda não enviado</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Seção: Aprovados */}
      {processo && aprovados.length > 0 && (
        <View>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Aprovados</Text>
          </View>
          <View style={styles.listaCard}>
            {aprovados.map((d, i) => (
              <View key={d.id} style={[styles.item, i > 0 && styles.itemLinha]}>
                <View style={{flex: 1}}>
                  <Text style={styles.itemSub}>{d.nomeTipo}</Text>
                </View>
                <Pressable 
                  style={{marginRight: 12}} 
                  onPress={() => visualizarArquivo(d.idUltimoEnvio, d.nomeTipo)}
                >
                  <Text style={{color: '#0b4f38', fontWeight: '500', fontSize: 13}}>Ver arquivo</Text>
                </Pressable>
                <Text style={styles.itemOk}>✓</Text>
              </View>
            ))}
          </View>
        </View>
      )}

            {processo && !concluido && (
        <View>
          {avisoPendencias !== '' ? (
            <View>
              <Text style={styles.erro}>{avisoPendencias}</Text>
              <Pressable
                style={[styles.botao, concluindo && styles.botaoDesativado]}
                onPress={() => concluir(true)}
                disabled={concluindo}
              >
                {concluindo
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.botaoTexto}>Concluir mesmo assim</Text>}
              </Pressable>
              <Pressable onPress={() => setAvisoPendencias('')} disabled={concluindo}>
                <Text style={styles.linkVoltar}>Cancelar</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={[styles.botao, (concluindo || ocupado) && styles.botaoDesativado]}
              onPress={() => concluir(false)}
              disabled={concluindo || ocupado}
            >
              {concluindo
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.botaoTexto}>Concluir processo</Text>}
            </Pressable>
          )}
        </View>
      )}

      <Pressable onPress={voltar} disabled={ocupado}>
        <Text style={styles.linkVoltar}>Voltar</Text>
      </Pressable>
    </ScrollView>
  )
}