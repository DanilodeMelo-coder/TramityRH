import {useState, useEffect} from 'react'
import {View, Text, TextInput, Pressable, ScrollView, ActivityIndicator} from 'react-native'
import {styles} from './Styles'
import Logo from './Logo'
import {listarTiposDocumento, criarProcesso, gerarConvite} from './processo'

const TIPOS = [
  {valor: 'ADMISSAO', nome: 'Admissão'},
  {valor: 'DEMISSAO', nome: 'Demissão'},
]

// '2026-11-09' vira '09/11/2026'
function formatarData(iso){
  return iso.slice(0, 10).split('-').reverse().join('/')
}

export default function TelaNovoProcesso({voltar}){

  const [tipo, setTipo] = useState(null)
  const [catalogo, setCatalogo] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroCatalogo, setErroCatalogo] = useState('')
  const [selecionados, setSelecionados] = useState([])
  const [email, setEmail] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [processoCriado, setProcessoCriado] = useState(null) // evita abrir o processo duas vezes
  const [convite, setConvite] = useState(null) // { codigo, expiraEm }

  async function carregarCatalogo(){
    setCarregando(true)
    setErroCatalogo('')
    try{
      setCatalogo(await listarTiposDocumento())
    }catch(e){
      setErroCatalogo('Não foi possível carregar os documentos.')
    }finally{
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarCatalogo()
  }, [])

  function alternar(id){
    setSelecionados(atuais =>
      atuais.includes(id) ? atuais.filter(x => x !== id) : [...atuais, id]
    )
  }

  async function abrirProcesso(){
    if(!tipo){
      setErro('Escolha o tipo do processo.')
      return
    }
    if(selecionados.length === 0){
      setErro('Escolha pelo menos um documento.')
      return
    }
    if(!email.trim() || !email.includes('@')){
      setErro('Digite o e-mail do colaborador.')
      return
    }

    setErro('')
    setEnviando(true)

    // 1) Abre o processo (rota 8), a não ser que já tenha sido aberto numa tentativa anterior
    let processo = processoCriado
    if(!processo){
      try{
        processo = await criarProcesso({
          tipo,
          documentos: selecionados.map(id => ({
            idTipoDocumento: id,
            descricao: '',
            direcao: 'COLABORADOR_ENVIA',
          })),
        })
        setProcessoCriado(processo)
      }catch(e){
        setErro('Não foi possível abrir o processo. Tente de novo.')
        setEnviando(false)
        return
      }
    }

    // 2) Gera o convite (rota 10)
    try{
      const resultado = await gerarConvite(processo.id, email.trim())
      setConvite(resultado)
    }catch(e){
      if(e.status === 409){
        setErro('Este processo já tem um colaborador.')
      }else{
        setErro('O processo foi aberto, mas o convite não foi gerado. Toque em "Abrir processo" para tentar o convite de novo.')
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

      {convite ? (
        <View>
          <View style={styles.bloco}>
            <Text style={styles.blocoTitulo}>Processo <Text style={styles.destaque}> aberto </Text></Text>
            <Text style={styles.blocoSubTitulo}>Agora envie o código do convite ao colaborador</Text>
          </View>

          <Text style={styles.label}>Código do convite</Text>
          <View style={styles.codigoCaixa}>
            <Text style={styles.codigoConvite}>{convite.codigo}</Text>
          </View>

          <Text style={styles.mensagem}>
            Envie este código para {email.trim()}. Ele vale até {formatarData(convite.expiraEm)} e só pode ser usado uma vez.
          </Text>

          <Pressable style={styles.botao} onPress={voltar}>
            <Text style={styles.botaoTexto}>Voltar para a lista</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.bloco}>
            <Text style={styles.blocoTitulo}>Abra um <Text style={styles.destaque}> novo processo </Text></Text>
            <Text style={styles.blocoSubTitulo}>Escolha o tipo, os documentos e quem vai receber o convite</Text>
          </View>

          <Text style={styles.label}>Tipo do processo</Text>
          <View style={styles.opcoes}>
            {TIPOS.map(t => (
              <Pressable
                key={t.valor}
                style={[styles.opcao, tipo === t.valor && styles.opcaoAtiva]}
                onPress={() => setTipo(t.valor)}
                disabled={processoCriado !== null}
              >
                <Text style={[styles.opcaoTexto, tipo === t.valor && styles.opcaoTextoAtivo]}>{t.nome}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Documentos exigidos</Text>
            {selecionados.length > 0 && (
              <View style={styles.secaoBadge}>
                <Text style={styles.secaoBadgeTexto}>{selecionados.length}</Text>
              </View>
            )}
          </View>

          {carregando && <ActivityIndicator color="#0e6b4b" style={styles.carregando} />}

          {erroCatalogo !== '' && (
            <View>
              <Text style={styles.erro}>{erroCatalogo}</Text>
              <Pressable onPress={carregarCatalogo}>
                <Text style={styles.linkVoltar}>Tentar de novo</Text>
              </Pressable>
            </View>
          )}

          {!carregando && erroCatalogo === '' && (
            <View style={styles.listaCard}>
              {catalogo.map((t, i) => {
                const marcado = selecionados.includes(t.id)
                return(
                  <Pressable
                    key={t.id}
                    style={[styles.item, i > 0 && styles.itemLinha]}
                    onPress={() => alternar(t.id)}
                    disabled={processoCriado !== null}
                  >
                    <View style={styles.itemTextos}>
                      <Text style={styles.itemNome}>{t.nome}</Text>
                      <Text style={styles.itemSub}>{t.categoria}</Text>
                    </View>
                    <View style={[styles.caixa, marcado && styles.caixaMarcada]}>
                      {marcado && <Text style={styles.caixaCheck}>✓</Text>}
                    </View>
                  </Pressable>
                )
              })}
            </View>
          )}

          <View style={styles.campo}>
            <Text style={styles.label}>E-mail do colaborador</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder='Digite o e-mail que vai receber o convite'
              placeholderTextColor="#6b756f"
              autoCapitalize='none'
              keyboardType='email-address'
            />
          </View>

          <Pressable
            style={[styles.botao, enviando && styles.botaoDesativado]}
            onPress={abrirProcesso}
            disabled={enviando}
          >
            {enviando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Abrir processo</Text>}
          </Pressable>

          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          <Pressable onPress={voltar} disabled={enviando}>
            <Text style={styles.linkVoltar}>Voltar</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  )
}