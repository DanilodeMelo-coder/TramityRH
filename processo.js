import { CONFIG, obteerToken, criarErroHttp } from './config';

// Rota 6: GET /tipos-documento (Catálogo global de tipos de documento)
export async function listarTiposDocumento() {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/tipos-documento`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Falha ao carregar os tipos de documento.');
  }

  return resposta.json();
}

// Rota 7: GET /processos?status= (Lista de processos do RH)
export async function listarProcessos(statusFiltro) {
  const token = await obteerToken();
  const url = statusFiltro 
    ? `${CONFIG.API_URL}/processos?status=${statusFiltro}` 
    : `${CONFIG.API_URL}/processos`;
  
  const resposta = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Falha ao listar os processos.');
  }

  return resposta.json();
}

// Rota 8: POST /processos (Cria um novo processo de admissão/demissão)
export async function criarProcesso({ tipo, documentos }) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/processos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tipo, documentos }),
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível abrir o processo.');
  }

  return resposta.json();
}

// Rota 9: GET /processos/{id} (Detalhes de um processo específico)
export async function buscarProcesso(idProcesso) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/processos/${idProcesso}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível buscar o processo.');
  }

  return resposta.json();
}

// Rota 10: POST /processos/{id}/convites (Gera o convite de 6 dígitos)
export async function gerarConvite(idProcesso, email) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/processos/${idProcesso}/convites`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Falha ao gerar o código de convite.');
  }

  return resposta.json();
}

// Rota 12: POST /documentos/{id}/avaliacao (Aprova ou recusa um documento)
export async function avaliarDocumento(idDocumento, { resultado, motivoRecusa }) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/documentos/${idDocumento}/avaliacao`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resultado, motivoRecusa }),
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível avaliar o documento.');
  }

  return resposta.json();
}