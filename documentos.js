// Única parte do app que fala com a API.
// Por enquanto devolve dados simulados no mesmo formato da API.

// Simula POST /documentos/{id}/envios (rota 17)
export async function enviarDocumento(idDocumento, arquivo) {
  // Simula o tempo de rede
  await new Promise(resolve => setTimeout(resolve, 1200))

  return { idEnvio: 'envio-simulado-1', status: 'EM_ANALISE' }
}

// Simula GET /processos/{id} (rota 9). Depois vem da API.
export const processoSimulado = {
  id: 'proc-1',
  tipo: 'Admissão',
  status: 'EM_ANDAMENTO',
  documentos: [
    {id: 'd1', nomeTipo: 'Comprovante de residência', direcao: 'COLABORADOR_ENVIA', status: 'RECUSADO', motivoRecusa: 'imagem ilegível'},
    {id: 'd2', nomeTipo: 'Foto 3x4', direcao: 'COLABORADOR_ENVIA', status: 'PENDENTE', motivoRecusa: null},
    {id: 'd3', nomeTipo: 'Título de eleitor', direcao: 'COLABORADOR_ENVIA', status: 'PENDENTE', motivoRecusa: null},
    {id: 'd4', nomeTipo: 'Carteira de trabalho', direcao: 'COLABORADOR_ENVIA', status: 'EM_ANALISE', motivoRecusa: null},
    {id: 'd5', nomeTipo: 'RG', direcao: 'COLABORADOR_ENVIA', status: 'APROVADO', motivoRecusa: null},
    {id: 'd6', nomeTipo: 'CPF', direcao: 'COLABORADOR_ENVIA', status: 'APROVADO', motivoRecusa: null},
  ],
}