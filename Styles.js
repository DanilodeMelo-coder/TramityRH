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
  rodapeLink: {color: '#0b4f38', fontWeight: '500', fontSize: 14}
})