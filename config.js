import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base da tua API no Railway
export const CONFIG = {
  API_URL: 'https://tramity-api-production.up.railway.app',
};

// Função auxiliar para buscar o token guardado no login sem expor credenciais no código
export async function obteerToken() {
  const token = await AsyncStorage.getItem('@token');
  return token;
}

// Função auxiliar para lançar erros HTTP formatados
export function criarErroHttp(status, mensagem) {
  const erro = new Error(mensagem || `Erro HTTP ${status}`);
  erro.status = status;
  return erro;
}