import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  fundo: {flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 20},
  marca: { color: '#4f9cf9', fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  titulo: {color: '#fff',fontSize: 28, fontWeight: 'bold'},
  subTitulo: {color: '#c5c9e0', marginBottom: 24},
  card: {backgroundColor: '#080a1f', borderColor: '#6f7fc4', borderWidth: 1.5, borderRadius: 24, padding: 28},
  label: {color: '#fff', fontWeight: 'bold', fontSize: 13, marginBottom: 8},
  input: {color: '#fff', borderColor: '#4a5aa8', borderWidth: 1, borderRadius: 999, paddingVertical: 14, paddingHorizontal: 20},
  botao: {backgroundColor: '#f5f6fb', borderRadius: 999, paddingVertical: 16, alignItems: 'center', marginTop: 20},
  botaoTexto: {color: '#1a1f3d', fontWeight: 'bold'},
  linkVoltar: {color: '#6cb0ff', fontWeight: 'bold', fontSize: 13, textAlign: 'center', marginTop: 16}
})
