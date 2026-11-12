import { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, ActivityIndicator, Platform } from 'react-native'
import { styles } from './Styles'
import Logo from './Logo'
import { listarMeusProcessos, buscarProcessoColaborador, darAceite  } from './documentos'
import { baixarArquivoEnvio } from './processo'

const NOME_TIPO = { ADMISSAO: 'Admissão', DEMISSAO: 'Demissão' }

export default function TelaInicio({ irParaEnviar, irParaConvite, sair }) {
  const [processo, setProcesso] = useState(null)
  const [empresa, setEmpresa] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [aceitandoId, setAceitandoId] = useState(null)
  const [erroAceite, setErroAceite] = useState('')

  async function carregar() {
    setCarregando(true)
    setErro('')
    try {
      const meus = await listarMeusProcessos()

      // Conta nova, sem processo: vai informar o código do convite
      if (meus.length === 0) {
        irParaConvite()
        return
      }

      const atual = meus.find(p => p.status === 'EM_ANDAMENTO') || meus[0]
      setEmpresa(atual.empresa)
      setProcesso(await buscarProcessoColaborador(atual.id))
    } catch (e) {
      setErro(e.message || 'Não foi possível carregar seu processo.')
    } finally {
      setCarregando(false)
    }
  }

  async function verArquivo(idUltimoEnvio) {
  setErroAceite('')
  if (Platform.OS !== 'web') {
    setErroAceite('Por enquanto, os arquivos só abrem na versão web.')
    return
  }
  const janela = window.open('', '_blank')
  try {
    const arquivo = await baixarArquivoEnvio(idUltimoEnvio)
    janela.location.href = URL.createObjectURL(arquivo)
  } catch (e) {
    janela.close()
    setErroAceite('Não foi possível abrir o arquivo.')
  }
}

async function aceitar(idDocumento) {
  setErroAceite('')
  setAceitandoId(idDocumento)
  try {
    await darAceite(processo.id, idDocumento)
    setProcesso(await buscarProcessoColaborador(processo.id))
  } catch (e) {
    setErroAceite(e.message || 'Não foi possível registrar o aceite.')
  } finally {
    setAceitandoId(null)
  }
}

  useEffect(() => {
    carregar()
  }, [])

  if (carregando) {
    return (
      <View style={styles.fundo}>
        <Logo />
        <ActivityIndicator color="#0e6b4b" style={styles.carregando} />
      </View>
    )
  }

  if (erro !== '' || !processo) {
    return (
      <View style={styles.fundo}>
        <Logo />
        <Text style={styles.erro}>{erro}</Text>
        <Pressable onPress={carregar}>
          <Text style={styles.linkVoltar}>Tentar de novo</Text>
        </Pressable>
        <Pressable onPress={sair}>
          <Text style={styles.linkVoltar}>Sair</Text>
        </Pressable>
      </View>
    )
  }

    if (processo && processo.status === 'CONCLUIDO') {
    return (
      <ScrollView style={styles.fundoTela} contentContainerStyle={styles.scrollConteudo}>
        <Logo />
        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>
            Processo <Text style={styles.destaque}>concluído</Text>
          </Text>
          <Text style={styles.blocoSubTitulo}>
            Sua {NOME_TIPO[processo.tipo]} com {empresa} foi finalizada pelo RH. Não há mais nada para fazer aqui.
          </Text>
        </View>

        <Pressable style={styles.botao} onPress={irParaConvite}>
          <Text style={styles.botaoTexto}>Tenho um novo código de convite</Text>
        </Pressable>

        <Pressable onPress={sair}>
          <Text style={styles.linkVoltar}>Sair</Text>
        </Pressable>
      </ScrollView>
    )
  }

  const nomeTipo = NOME_TIPO[processo.tipo] || processo.tipo

  // Só os documentos que o colaborador envia
  const docs = processo.documentos.filter(d => d.direcao === 'COLABORADOR_ENVIA')
  const daEmpresa = processo.documentos.filter(d => d.direcao === 'EMPRESA_ENVIA' && d.status !== 'PENDENTE')
  const resolver = docs.filter(d => d.status === 'PENDENTE' || d.status === 'RECUSADO')
  const comRH = docs.filter(d => d.status === 'EM_ANALISE')
  const aprovados = docs.filter(d => d.status === 'APROVADO')
  const faltam = resolver.length

  return (
    <ScrollView style={styles.fundoTela} contentContainerStyle={styles.scrollConteudo}>
      <Logo />

      {/* Bloco principal verde com progresso e contagem */}
      <View style={styles.bloco}>
        <Text style={styles.blocoTopo}>{nomeTipo} · {empresa}</Text>
        {faltam > 0 ? (
          <Text style={styles.blocoTitulo}>
            {faltam === 1 ? 'Falta ' : 'Faltam '}
            <Text style={styles.destaque}> {faltam} {faltam === 1 ? 'documento' : 'documentos'} </Text>
            {' '}para concluir sua {nomeTipo.toLowerCase()}
          </Text>
        ) : (
          <Text style={styles.blocoTitulo}>
            Tudo <Text style={styles.destaque}> enviado </Text>
          </Text>
        )}
        <View style={styles.progresso}>
          {docs.map((d, i) => (
            <View key={d.id} style={[styles.segmento, i < aprovados.length && styles.segmentoCheio]} />
          ))}
        </View>
        <Text style={styles.blocoSubTitulo}>
          {aprovados.length} de {docs.length} aprovados · {comRH.length} em análise
        </Text>
      </View>

      {erroAceite !== '' && <Text style={styles.erro}>{erroAceite}</Text>}

      {daEmpresa.length > 0 && (
        <View>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Documentos da empresa</Text>
          </View>
          <View style={styles.listaCard}>
            {daEmpresa.map((d, i) => (
              <View key={d.id} style={[styles.itemColuna, i > 0 && styles.itemLinha]}>
                <Text style={styles.itemNome}>{d.nomeTipo}</Text>

                <Pressable style={styles.botaoSecundario} onPress={() => verArquivo(d.idUltimoEnvio)}>
                  <Text style={styles.botaoSecundarioTexto}>📄 Ver documento</Text>
                </Pressable>

                {d.status === 'EM_ANALISE' && (
                  <Pressable
                    style={[styles.botaoPequeno, aceitandoId !== null && styles.botaoDesativado]}
                    onPress={() => aceitar(d.id)}
                    disabled={aceitandoId !== null}
                  >
                    {aceitandoId === d.id
                      ? <ActivityIndicator color="#fff" />
                      : <Text style={styles.botaoPequenoTexto}>Li e dou o aceite</Text>}
                  </Pressable>
                )}

                {d.status === 'ACEITO' && (
                  <Text style={styles.itemOk}>✓ Você deu o aceite</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
      {/* Seção: Para você resolver */}
      {resolver.length > 0 && (
        <View>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Para você resolver</Text>
            <View style={styles.secaoBadge}>
              <Text style={styles.secaoBadgeTexto}>{resolver.length}</Text>
            </View>
          </View>
          <View style={styles.listaCard}>
            {resolver.map((d, i) => {
              const recusado = d.status === 'RECUSADO'
              return (
                <View key={d.id} style={[styles.item, i > 0 && styles.itemLinha]}>
                  <View style={styles.itemTextos}>
                    <Text style={styles.itemNome}>{d.nomeTipo}</Text>
                    {recusado ? (
                      <Text style={styles.itemRecusado}>Recusado: {d.motivoRecusa}</Text>
                    ) : (
                      <Text style={styles.itemSub}>Ainda não enviado</Text>
                    )}
                  </View>
                  <Pressable
                    style={recusado ? styles.botaoPequeno : styles.botaoPequenoClaro}
                    onPress={() => irParaEnviar(d)}
                  >
                    <Text style={recusado ? styles.botaoPequenoTexto : styles.botaoPequenoClaroTexto}>
                      {recusado ? 'Reenviar' : 'Enviar'}
                    </Text>
                  </Pressable>
                </View>
              )
            })}
          </View>
        </View>
      )}

      {/* Seção: Com o RH */}
      {comRH.length > 0 && (
        <View>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Com o RH</Text>
          </View>
          <View style={styles.listaCard}>
            {comRH.map((d, i) => (
              <View key={d.id} style={[styles.item, i > 0 && styles.itemLinha]}>
                <Text style={styles.itemNome}>{d.nomeTipo}</Text>
                <Text style={styles.itemAnalise}>Em análise</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Seção: Aprovados */}
      {aprovados.length > 0 && (
        <View>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Aprovados</Text>
          </View>
          <View style={styles.listaCard}>
            {aprovados.map((d, i) => (
              <View key={d.id} style={[styles.item, i > 0 && styles.itemLinha]}>
                <Text style={styles.itemSub}>{d.nomeTipo}</Text>
                <Text style={styles.itemOk}>✓</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <Pressable onPress={sair}>
        <Text style={styles.linkVoltar}>Sair</Text>
      </Pressable>
    </ScrollView>
  )
}