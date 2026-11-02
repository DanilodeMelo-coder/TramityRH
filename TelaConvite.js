import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { styles } from './Styles'; // Importa os estilos do ficheiro separado

export default function TelaConvite({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleValidarCodigo = async () => {
    // Regra de negócio RN01: O código possui 6 dígitos
    if (!codigo || codigo.length < 6) {
      Alert.alert('Atenção', 'Informe o código completo de 6 dígitos enviado pelo RH.');
      return;
    }

    try {
      setCarregando(true);
      
      // Exemplo de integração futura com o serviço:
      // const token = await AsyncStorage.getItem('@token');
      // const resultado = await aceitarConvite(codigo, token);

      // Simulação de sucesso para teste
      setTimeout(() => {
        setCarregando(false);
        Alert.alert('Sucesso', 'Convite aceito com sucesso!');
        // navigation.navigate('HomeColaborador', { idProcesso: resultado.idProcesso });
      }, 1000);

    } catch (error) {
      setCarregando(false);
      Alert.alert('Erro', error.message || 'Erro ao validar o código do convite.');
    }
  };

  return (
    <View style={styles.fundo}>
      {/* Bloco verde superior com título e destaque em marca-texto */}
      <View style={styles.bloco}>
        <Text style={styles.blocoTopo}>Tramity · Admissão</Text>
        <Text style={styles.blocoTitulo}>
          Informe o <Text style={styles.destaque}>código</Text> do convite
        </Text>
        <Text style={styles.blocoSubTitulo}>
          Digite os 6 dígitos fornecidos pela empresa para vincular o seu processo.
        </Text>
      </View>

      {/* Formulário */}
      <View>
        <Text style={styles.label}>Código de verificação</Text>
        <TextInput
          style={[styles.input, styles.inputCodigoCentro]}
          placeholder="Ex: 483921"
          placeholderTextColor="#55605a"
          keyboardType="number-pad"
          maxLength={6}
          value={codigo}
          onChangeText={setCodigo}
        />

        <TouchableOpacity 
          style={styles.botao} 
          onPress={handleValidarCodigo}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Avançar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={styles.linkVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}