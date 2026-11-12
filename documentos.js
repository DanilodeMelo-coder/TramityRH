import { Platform } from 'react-native';
import { CONFIG, obteerToken, erroDaResposta } from './config';

// Rota 16: GET /meus-processos (os processos do colaborador logado)
export async function listarMeusProcessos() {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/meus-processos`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!resposta.ok) {
    throw await erroDaResposta(resposta, 'Não foi possível carregar seus processos.');
  }
  return resposta.json();
}

// Rota 9: GET /processos/{id} (o detalhe, com os documentos)
export async function buscarProcessoColaborador(idProcesso) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/processos/${idProcesso}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!resposta.ok) {
    throw await erroDaResposta(resposta, 'Não foi possível carregar o processo.');
  }
  return resposta.json();
}

// Rota 17: POST /documentos/{id}/envios (multipart, com o arquivo no campo "arquivo")
export async function enviarDocumento(idDocumento, arquivo) {
  const token = await obteerToken();

  const formData = new FormData();
  if (Platform.OS === 'web') {
    // No navegador, o seletor devolve o arquivo pronto em "file"
    formData.append('arquivo', arquivo.file);
  } else {
    // No celular, o arquivo é descrito pelo endereço dele no aparelho
    formData.append('arquivo', {
      uri: arquivo.uri,
      type: arquivo.mimeType || 'application/pdf',
      name: arquivo.name || 'documento',
    });
  }

  const resposta = await fetch(`${CONFIG.API_URL}/documentos/${idDocumento}/envios`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });

  if (!resposta.ok) {
    throw await erroDaResposta(resposta, 'Não foi possível enviar o documento.');
  }
  return resposta.json();
}