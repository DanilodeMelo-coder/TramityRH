import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native'
import {useState} from 'react'

const styles = StyleSheet.create({
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

export default function App(){
 
 const[contato, setContato] = useState('')

  return(
    <View style={styles.fundo}>
      <View style={styles.card}>
        <Text style={styles.marca}>docRH</Text>
        <Text style={styles.titulo}>Recuperar acesso</Text>
        <Text style={styles.subTitulo}>Informe seus dados para recuperar sua conta</Text>
        <Text style={styles.label}>Digite seu email</Text>
        <TextInput 
          style={styles.input}
          value={contato}
          onChangeText={setContato}
          placeholder='Digite seu email'
          placeholderTextColor= "#8a90b5"
        />
        <Pressable style={styles.botao} onPress={()=> console.log('Enviamos um email para',contato )}>
        <Text style={styles.botaoTexto}>Continuar</Text>
        </Pressable>

        <Pressable onPress={()=> console.log('Voltar')}>
          <Text style={styles.linkVoltar}>Voltar</Text>
        </Pressable>  

      </View>
    </View>
  )
}
