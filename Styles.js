import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  // Estrutura 
  fundo: {flex: 1, backgroundColor: '#f2f5ef', paddingHorizontal: 20, paddingTop: 48, paddingBottom: 24},
  card: {},
 
  // Cabeçalho
  marca: {color: '#10231c', fontWeight: '700', fontSize: 20, marginBottom: 24},
  titulo: {color: '#10231c', fontSize: 26, fontWeight: '600', marginBottom: 6},
  subTitulo: {color: '#55605a', fontSize: 14, marginBottom: 24},
 
  // Bloco verde do título
  bloco: {backgroundColor: '#0e6b4b', borderRadius: 20, padding: 20, marginBottom: 24},
  blocoTitulo: {color: '#fff', fontSize: 26, fontWeight: '600', lineHeight: 32},
  blocoSubTitulo: {color: '#cfe6da', fontSize: 14, marginTop: 8},
  destaque: {backgroundColor: '#e4f25a', color: '#10231c'},
 
  // Campos 
  label: {color: '#10231c', fontWeight: '500', fontSize: 14, marginBottom: 6},
  input: {color: '#10231c', backgroundColor: '#fff', borderColor: '#cfd8cc', borderWidth: 1, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, fontSize: 16},
  
  // Ajuste auxiliar específico para centralizar e espaçar o código de convite no input
  inputCodigoCentro: { textAlign: 'center', letterSpacing: 4, fontSize: 18 },
 
  // Botão e mensagem 
  botao: {backgroundColor: '#0e6b4b', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 20},
  botaoTexto: {color: '#fff', fontWeight: '600', fontSize: 16},
  mensagem: {color: '#55605a', fontSize: 13, textAlign: 'center', marginTop: 16},
 
  // Links de voltar e reenviar
  linkVoltar: {color: '#0b4f38', fontWeight: '500', fontSize: 14, textAlign: 'center', marginTop: 16},
 
  // Só da TelaLogin
  campo: {marginBottom: 16},
  inputSenha: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderColor: '#cfd8cc', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16},
  inputSenhaTexto: {flex: 1, color: '#10231c', paddingVertical: 14, fontSize: 16},
  mostrarSenha: {color: '#0b4f38', fontSize: 14, fontWeight: '500', marginLeft: 12},
  linkEsqueci: {color: '#0b4f38', fontWeight: '500', fontSize: 14, textAlign: 'right'},
  rodape: {alignItems: 'center', marginTop: 24},
  rodapeTexto: {color: '#55605a', fontSize: 14, marginBottom: 4},
  rodapeLink: {color: '#0b4f38', fontWeight: '500', fontSize: 14},
  rodapeConvite: {alignItems: 'center', marginTop: 16},

  // Logo
  logo: {flexDirection: 'row', alignItems: 'center', marginBottom: 24},
  logoImagem: {width: 26, height: 30, marginRight: 8},
  logoNome: {color: '#10231c', fontWeight: '700', fontSize: 20},

  // Só da tela de enviar documento
  motivoRecusa: {color: '#b3261e', fontSize: 14, marginBottom: 20},
  arquivoCaixa: {backgroundColor: '#fff', borderColor: '#cfd8cc', borderWidth: 1, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16},
  arquivoNome: {color: '#10231c', fontSize: 16},
  arquivoVazio: {color: '#6b756f', fontSize: 16},
  botaoSecundario: {backgroundColor: '#dcebe3', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 12},
  botaoSecundarioTexto: {color: '#0b4f38', fontWeight: '600', fontSize: 16},
  botaoDesativado: {opacity: 0.5},
  erro: {color: '#b3261e', fontSize: 13, textAlign: 'center', marginTop: 16},

  // Só da tela inicial
  fundoTela: {flex: 1, backgroundColor: '#f2f5ef'},
  scrollConteudo: {paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32},
  blocoTopo: {color: '#cfe6da', fontSize: 14, marginBottom: 8},
  progresso: {flexDirection: 'row', marginTop: 20},
  segmento: {flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)', marginRight: 6},
  segmentoCheio: {backgroundColor: '#e4f25a'},
  secaoCabecalho: {flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 8},
  secaoTitulo: {color: '#10231c', fontWeight: '700', fontSize: 18},
  secaoBadge: {backgroundColor: '#e4f25a', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8},
  secaoBadgeTexto: {color: '#10231c', fontWeight: '700', fontSize: 13},
  listaCard: {backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, marginBottom: 20},
  item: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14},
  itemLinha: {borderTopWidth: 1, borderTopColor: '#e6ebe3'},
  itemTextos: {flex: 1, marginRight: 12},
  itemNome: {color: '#10231c', fontSize: 16, fontWeight: '500'},
  itemSub: {color: '#55605a', fontSize: 14, marginTop: 2},
  itemRecusado: {color: '#b3261e', fontSize: 14, marginTop: 2},
  itemAnalise: {color: '#1f4fa3', fontSize: 14, fontWeight: '500'},
  itemOk: {color: '#0e6b4b', fontSize: 18, fontWeight: '700'},
  botaoPequeno: {backgroundColor: '#0e6b4b', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 18},
  botaoPequenoTexto: {color: '#fff', fontWeight: '600', fontSize: 15},
  botaoPequenoClaro: {backgroundColor: '#dcebe3', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 18},
  botaoPequenoClaroTexto: {color: '#0b4f38', fontWeight: '600', fontSize: 15},

  // Só da lista de processos do RH
  filtros: {flexDirection: 'row', marginTop: 24, marginBottom: 16},
  filtro: {marginRight: 20, paddingBottom: 6, borderBottomWidth: 2, borderBottomColor: 'transparent'},
  filtroAtivo: {borderBottomColor: '#0e6b4b'},
  filtroTexto: {color: '#55605a', fontSize: 15, fontWeight: '500'},
  filtroTextoAtivo: {color: '#10231c'},
  carregando: {marginTop: 24},
  cardProcesso: {backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12},
  processoTopo: {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'},
  progressoCard: {flexDirection: 'row', marginTop: 14, marginBottom: 10},
  segmentoCard: {flex: 1, height: 6, borderRadius: 3, backgroundColor: '#e6ebe3', marginRight: 6},
  segmentoCardCheio: {backgroundColor: '#0e6b4b'},
  processoRodape: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},

  // Só do detalhe do processo e do novo processo
  itemColuna: {paddingVertical: 14},
  acoes: {flexDirection: 'row', marginTop: 12},
  acaoEspaco: {marginRight: 10},
  inputMotivo: {color: '#10231c', backgroundColor: '#fff', borderColor: '#cfd8cc', borderWidth: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, fontSize: 15, minHeight: 80, textAlignVertical: 'top', marginTop: 12},
  opcoes: {flexDirection: 'row', marginHorizontal: -6, marginBottom: 20},
  opcao: {flex: 1, backgroundColor: '#fff', borderColor: '#cfd8cc', borderWidth: 2, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginHorizontal: 6},
  opcaoAtiva: {borderColor: '#0e6b4b', backgroundColor: '#eaf3ee'},
  opcaoTexto: {color: '#55605a', fontSize: 16, fontWeight: '500'},
  opcaoTextoAtivo: {color: '#10231c', fontWeight: '600'},
  caixa: {width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#cfd8cc', alignItems: 'center', justifyContent: 'center'},
  caixaMarcada: {backgroundColor: '#0e6b4b', borderColor: '#0e6b4b'},
  caixaCheck: {color: '#fff', fontSize: 14, fontWeight: '700'},
  codigoCaixa: {backgroundColor: '#fff', borderColor: '#cfd8cc', borderWidth: 1, borderRadius: 16, paddingVertical: 24, marginBottom: 16},
  codigoConvite: {color: '#10231c', fontSize: 40, fontWeight: '700', letterSpacing: 8, textAlign: 'center'},
})