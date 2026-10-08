import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  // Estrutura 
  fundo: {flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 20},
  card: {backgroundColor: '#080a1f', borderColor: '#6f7fc4', borderWidth: 1.5, borderRadius: 24, padding: 28},

  // Cabeçalho
  marca: { color: '#4f9cf9', fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  titulo: {color: '#fff',fontSize: 28, fontWeight: 'bold'},
  subTitulo: {color: '#c5c9e0', marginBottom: 24},

  // Campos 
  label: {color: '#fff', fontWeight: 'bold', fontSize: 13, marginBottom: 8},
  input: {color: '#fff', borderColor: '#4a5aa8', borderWidth: 1, borderRadius: 999, paddingVertical: 14, paddingHorizontal: 20},

  // Botão e mensagem 
  botao: {backgroundColor: '#f5f6fb', borderRadius: 999, paddingVertical: 16, alignItems: 'center', marginTop: 20},
  botaoTexto: {color: '#1a1f3d', fontWeight: 'bold'},
  mensagem: {color: '#c5c9e0', fontSize: 13, textAlign: 'center', marginTop: 16},

  // Só da tela RecuperarAcesso
  linkVoltar: {color: '#6cb0ff', fontWeight: 'bold', fontSize: 13, textAlign: 'center', marginTop: 16},

  // Só da tela TelaLogin
  campo: {marginBottom: 16},
  inputSenha: {flexDirection: 'row', alignItems: 'center', borderColor: '#4a5aa8', borderWidth: 1, borderRadius: 999, paddingHorizontal: 20},
  inputSenhaTexto: {flex: 1, color: '#fff', paddingVertical: 14},
  mostrarSenha: {color: '#6cb0ff', fontSize: 12, fontWeight: 'bold', marginLeft: 12},
  linkEsqueci: {color: '#6cb0ff', fontWeight: 'bold', fontSize: 13, textAlign: 'right'},
  rodape: {alignItems: 'center', marginTop: 24},
  rodapeTexto: {color: '#8a90b5', fontSize: 13, marginBottom: 4},
  rodapeLink: {color: '#6cb0ff', fontWeight: 'bold', fontSize: 13}
})