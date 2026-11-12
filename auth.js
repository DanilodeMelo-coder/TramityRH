import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG, criarErroHttp, obteerToken, erroDaResposta } from './config';

// Rota 1: POST /auth/login (Autenticação do utilizador)
export async function realizarLogin(email, senha) {
  try {
    const resposta = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!resposta.ok) {
      throw criarErroHttp(resposta.status, 'E-mail ou senha incorretos.');
    }

    const dados = await resposta.json();

    // O backend deve retornar o token e opcionalmente o perfil/nome
    // Exemplo: { token: '...', perfil: 'RH' ou 'COLABORADOR', nome: '...' }
    if (dados.token) {
      await AsyncStorage.setItem('@token', dados.token);
    }
    if (dados.perfil) {
      await AsyncStorage.setItem('@perfil', dados.perfil);
    }
    if (dados.nome) {
      await AsyncStorage.setItem('@nome', dados.nome);
    }

    return dados;
  } catch (erro) {
    throw erro;
  }
}

// Função para encerrar a sessão (Logout)
export async function realizarLogout() {
  await AsyncStorage.removeItem('@token');
  await AsyncStorage.removeItem('@perfil');
  await AsyncStorage.removeItem('@nome');
}

// Rota de Cadastro (caso aplicável no teu fluxo)
export async function realizarCadastro(dadosUsuario) {
  const resposta = await fetch(`${CONFIG.API_URL}/auth/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível realizar o cadastro.');
  }

  return resposta.json();
}

// Rota 15: POST /convites/aceitar (liga o colaborador ao processo)
export async function aceitarConvite(codigo) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/convites/aceitar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ codigo }),
  });

  if (!resposta.ok) {
    throw await erroDaResposta(resposta, 'Não foi possível validar o código.');
  }
  return resposta.json(); // { idProcesso }
}