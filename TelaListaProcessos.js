import { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { styles } from './Styles'
import Logo from './Logo'
import { listarProcessos } from './processo'

const NOME_TIPO = { ADMISSAO: 'Admissão', DEMISSAO: 'Demissão' }

// '2026-10-20' vira '20/10/2026'
function formatarData(iso) {
  if (!iso) return ''
  return iso.slice(0, 10).split('-').reverse().join('/')
}

export default function TelaListaProcessos({ irParaDetalhe, irParaNovoProcesso }) {

  const [processos, setProcessos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [filtro, setFiltro] = useState('andamento') // 'andamento' | 'concluidos' | 'todos'

  async function carregar() {
    setCarregando(true)
    setErro('')
    try {
      const dados = await listarProcessos()
      setProcessos(dados)
    } catch (e) {
      setErro('Não foi possível carregar os processos.')
    } finally {
      setCarregando(false)
    }
  }

  // Carrega a lista uma vez, quando a tela abre
  useEffect(() => {
    carregar()
  }, [])

  const emAndamento = processos.filter(p => !p.dataConclusao)
  const totalAnalise = emAndamento.reduce((soma, p) => soma + (p.aguardandoAnalise || 0), 0)

  // Quem tem mais documentos esperando análise aparece primeiro
  const visiveis = processos
    .filter(p => {
      if (filtro === 'andamento') return !p.dataConclusao
      if (filtro === 'concluidos') return !!p.dataConclusao
      return true
    })
    .sort((a, b) => (b.aguardandoAnalise || 0) - (a.aguardandoAnalise || 0))

  const carregado = !carregando && erro === ''

  return (
    <ScrollView style={styles.fundoTela} contentContainerStyle={styles.scrollConteudo}>
      <Logo />

      <View style={styles.bloco}>
        {carregado ? (
          totalAnalise > 0 ? (
            <Text style={styles.blocoTitulo}>
              Você tem
              <Text style={styles.destaque}> {totalAnalise} {totalAnalise === 1 ? 'documento' : 'documentos'} </Text>
              {' '}para analisar
            </Text>
          ) : (
            <Text style={styles.blocoTitulo}>
              Nenhum documento <Text style={styles.destaque}> aguardando </Text> análise
            </Text>
          )
        ) : (
          <Text style={styles.blocoTitulo}>Seus <Text style={styles.destaque}> processos </Text></Text>
        )}

        <Text style={styles.blocoSubTitulo}>
          {carregado
            ? `${emAndamento.length} ${emAndamento.length === 1 ? 'processo em andamento' : 'processos em andamento'}`
            : 'Admissões e demissões da empresa'}
        </Text>
      </View>

      <Pressable style={styles.botao} onPress={irParaNovoProcesso}>
        <Text style={styles.botaoTexto}>Novo processo</Text>
      </Pressable>

      <View style={styles.filtros}>
        <Pressable style={[styles.filtro, filtro === 'andamento' && styles.filtroAtivo]} onPress={() => setFiltro('andamento')}>
          <Text style={[styles.filtroTexto, filtro === 'andamento' && styles.filtroTextoAtivo]}>Em andamento</Text>
        </Pressable>
        <Pressable style={[styles.filtro, filtro === 'concluidos' && styles.filtroAtivo]} onPress={() => setFiltro('concluidos')}>
          <Text style={[styles.filtroTexto, filtro === 'concluidos' && styles.filtroTextoAtivo]}>Concluídos</Text>
        </Pressable>
        <Pressable style={[styles.filtro, filtro === 'todos' && styles.filtroAtivo]} onPress={() => setFiltro('todos')}>
          <Text style={[styles.filtroTexto, filtro === 'todos' && styles.filtroTextoAtivo]}>Todos</Text>
        </Pressable>
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

      {carregado && visiveis.length === 0 && (
        <Text style={styles.mensagem}>Nenhum processo aqui.</Text>
      )}

      {carregado && visiveis.map(p => (
        <Pressable key={p.id} style={styles.cardProcesso} onPress={() => irParaDetalhe(p)}>
          <View style={styles.processoTopo}>
            <View style={styles.itemTextos}>
              <Text style={styles.itemNome}>{p.nomeColaborador || p.emailConvite}</Text>
              {!p.nomeColaborador && (
                <Text style={styles.itemSub}>Convite ainda não usado</Text>
              )}
            </View>
            <Text style={styles.itemSub}>{NOME_TIPO[p.tipo]}</Text>
          </View>

          <View style={styles.progressoCard}>
            {Array.from({ length: p.total || 0 }).map((_, i) => (
              <View key={i} style={[styles.segmentoCard, i < (p.aprovados || 0) && styles.segmentoCardCheio]} />
            ))}
          </View>

          <View style={styles.processoRodape}>
            <Text style={styles.itemSub}>{p.aprovados || 0} de {p.total || 0} aprovados</Text>
            {p.dataConclusao ? (
              <Text style={styles.itemSub}>Concluído em {formatarData(p.dataConclusao)}</Text>
            ) : (p.aguardandoAnalise || 0) > 0 ? (
              <Text style={styles.itemAnalise}>{p.aguardandoAnalise} aguardando análise</Text>
            ) : (
              <Text style={styles.itemSub}>Criado em {formatarData(p.dataCriacao)}</Text>
            )}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  )
}