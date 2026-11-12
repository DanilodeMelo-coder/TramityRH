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

// Rota 11: GET /envios/{id}/arquivo (baixa o arquivo enviado)
export async function baixarArquivoEnvio(idEnvio) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/envios/${idEnvio}/arquivo`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível abrir o arquivo.');
  }

  return resposta.blob();
}

// Rota 12: PUT /processos/{idProcesso}/documentos/{idDocumento}/avaliacao
export async function avaliarDocumento(idProcesso, idDocumento, { resultado, motivoRecusa }) {
  const token = await obteerToken();
  const resposta = await fetch(
    `${CONFIG.API_URL}/processos/${idProcesso}/documentos/${idDocumento}/avaliacao`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resultado, motivo: motivoRecusa }),
    }
  );

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível avaliar o documento.');
  }

  return resposta.json();
}

// Rota 14: POST /processos/{id}/concluir
export async function concluirProcesso(idProcesso, confirmarPendencias) {
  const token = await obteerToken();
  const resposta = await fetch(`${CONFIG.API_URL}/processos/${idProcesso}/concluir`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ confirmarPendencias }),
  });

  if (!resposta.ok) {
    throw await erroDaResposta(resposta, 'Não foi possível concluir o processo.');
  }
  return resposta.json();
}