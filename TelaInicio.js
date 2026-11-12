import { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { styles } from './Styles'
import Logo from './Logo'
import { listarMeusProcessos, buscarProcessoColaborador } from './documentos'

const NOME_TIPO = { ADMISSAO: 'Admissão', DEMISSAO: 'Demissão' }

export default function TelaInicio({ irParaEnviar, irParaConvite, sair }) {
  const [processo, setProcesso] = useState(null)
  const [empresa, setEmpresa] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

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

  const nomeTipo = NOME_TIPO[processo.tipo] || processo.tipo

  // Só os documentos que o colaborador envia
  const docs = processo.documentos.filter(d => d.direcao === 'COLABORADOR_ENVIA')
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