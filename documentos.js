import { CONFIG, obteerToken, criarErroHttp } from './config';

// Envia o ficheiro binário do documento (Rota 17 / Rota de envios)
export async function enviarDocumento(idDocumento, arquivo) {
  const token = await obteerToken();

  const formData = new FormData();
  formData.append('arquivo', {
    uri: arquivo.uri,
    type: arquivo.mimeType || 'application/pdf',
    name: arquivo.name || 'documento',
  });

  const resposta = await fetch(`${CONFIG.API_URL}/documentos/${idDocumento}/envios`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Nota: No React Native, o fetch define automaticamente o Content-Type multipart/form-data com o boundary do FormData.
    },
    body: formData,
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível enviar o documento.');
  }

  return resposta.json(); // Retorna o objeto de envio criado na API real
}

// Buscar detalhes do processo do colaborador autenticado ou específico
export async function buscarProcessoColaborador(idProcesso) {
  const token = await obteerToken();
  
  // Se o endpoint exigir um ID específico ou buscar o processo ativo do colaborador logado:
  const url = idProcesso 
    ? `${CONFIG.API_URL}/processos/${idProcesso}` 
    : `${CONFIG.API_URL}/processos/meu-processo`;

  const resposta = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!resposta.ok) {
    throw criarErroHttp(resposta.status, 'Não foi possível carregar os detalhes do processo.');
  }

  return resposta.json();
}