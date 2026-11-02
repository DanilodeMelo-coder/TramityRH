// Parte do app que fala com as rotas de processos da API.
// Por enquanto funciona com dados simulados em memória (somem ao recarregar o app),
// no mesmo formato da API.

const espera = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function erroHttp(status){
  const erro = new Error('erro ' + status)
  erro.status = status
  return erro
}

// Catálogo simulado (rota 6). A categoria é inventada só para a simulação.
const tiposDocumento = [
  {id: 't1', nome: 'RG', categoria: 'Identificação'},
  {id: 't2', nome: 'CPF', categoria: 'Identificação'},
  {id: 't3', nome: 'Comprovante de residência', categoria: 'Endereço'},
  {id: 't4', nome: 'Foto 3x4', categoria: 'Identificação'},
  {id: 't5', nome: 'Título de eleitor', categoria: 'Identificação'},
  {id: 't6', nome: 'Carteira de trabalho', categoria: 'Trabalhista'},
  {id: 't7', nome: 'ASO', categoria: 'Saúde'},
  {id: 't8', nome: 'Certidão de nascimento', categoria: 'Família'},
]

// Monta a lista de documentos de um processo no formato da rota 9
function docs(idProcesso, lista){
  return lista.map(([nomeTipo, status, motivoRecusa], i) => ({
    id: idProcesso + 'd' + (i + 1),
    nomeTipo,
    descricao: '',
    direcao: 'COLABORADOR_ENVIA',
    status,
    motivoRecusa: motivoRecusa || null,
    idUltimoEnvio: status === 'PENDENTE' ? null : 'envio-' + idProcesso + 'd' + (i + 1),
    aceitoEm: null,
  }))
}

let processos = [
  {
    id: 'p1', tipo: 'ADMISSAO', colaborador: {nome: 'Maria Souza', email: 'maria@email.com'}, emailConvite: 'maria@email.com',
    dataCriacao: '2026-10-20', dataConclusao: null,
    documentos: docs('p1', [
      ['RG', 'APROVADO'],
      ['CPF', 'APROVADO'],
      ['Carteira de trabalho', 'EM_ANALISE'],
      ['Comprovante de residência', 'RECUSADO', 'imagem ilegível'],
      ['Foto 3x4', 'PENDENTE'],
      ['Título de eleitor', 'PENDENTE'],
    ]),
  },
  {
    id: 'p2', tipo: 'ADMISSAO', colaborador: {nome: 'João Lima', email: 'joao@email.com'}, emailConvite: 'joao@email.com',
    dataCriacao: '2026-10-18', dataConclusao: null,
    documentos: docs('p2', [
      ['RG', 'APROVADO'],
      ['CPF', 'APROVADO'],
      ['Comprovante de residência', 'APROVADO'],
      ['Foto 3x4', 'APROVADO'],
      ['Carteira de trabalho', 'EM_ANALISE'],
      ['Título de eleitor', 'EM_ANALISE'],
    ]),
  },
  {
    id: 'p3', tipo: 'DEMISSAO', colaborador: {nome: 'Ana Costa', email: 'ana@email.com'}, emailConvite: 'ana@email.com',
    dataCriacao: '2026-10-25', dataConclusao: null,
    documentos: docs('p3', [
      ['RG', 'APROVADO'],
      ['ASO', 'PENDENTE'],
      ['Carteira de trabalho', 'PENDENTE'],
    ]),
  },
  {
    id: 'p4', tipo: 'ADMISSAO', colaborador: null, emailConvite: 'carlos@email.com',
    dataCriacao: '2026-10-30', dataConclusao: null,
    documentos: docs('p4', [
      ['RG', 'PENDENTE'],
      ['CPF', 'PENDENTE'],
      ['Comprovante de residência', 'PENDENTE'],
      ['Foto 3x4', 'PENDENTE'],
      ['Carteira de trabalho', 'PENDENTE'],
    ]),
  },
  {
    id: 'p5', tipo: 'ADMISSAO', colaborador: {nome: 'Pedro Alves', email: 'pedro@email.com'}, emailConvite: 'pedro@email.com',
    dataCriacao: '2026-10-05', dataConclusao: '2026-10-12',
    documentos: docs('p5', [
      ['RG', 'APROVADO'],
      ['CPF', 'APROVADO'],
      ['Comprovante de residência', 'APROVADO'],
      ['Foto 3x4', 'APROVADO'],
      ['Título de eleitor', 'APROVADO'],
      ['Carteira de trabalho', 'APROVADO'],
    ]),
  },
]

let proximoProcesso = 6

// Formato de cada item da lista (rota 7). Andamento é calculado (RN14).
function resumir(p){
  return {
    id: p.id,
    tipo: p.tipo,
    nomeColaborador: p.colaborador ? p.colaborador.nome : null,
    emailConvite: p.emailConvite,
    aprovados: p.documentos.filter(d => d.status === 'APROVADO').length,
    total: p.documentos.length,
    aguardandoAnalise: p.documentos.filter(d => d.status === 'EM_ANALISE').length,
    dataCriacao: p.dataCriacao,
    dataConclusao: p.dataConclusao,
  }
}

// Formato do processo completo (rota 9)
function detalhar(p){
  return {
    id: p.id,
    tipo: p.tipo,
    status: p.dataConclusao ? 'CONCLUIDO' : 'EM_ANDAMENTO',
    colaborador: p.colaborador,
    aprovados: p.documentos.filter(d => d.status === 'APROVADO').length,
    total: p.documentos.length,
    documentos: p.documentos.map(d => ({...d})),
  }
}

// Simula GET /tipos-documento (rota 6)
export async function listarTiposDocumento() {
  await espera(500)
  return tiposDocumento.map(t => ({...t}))
}

// Simula GET /processos (rota 7)
export async function listarProcessos() {
  await espera(900)
  return processos.map(resumir)

  // Versão real (usar quando a API estiver no ar):
  // const resposta = await fetch(`${API_URL}/processos`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // })
  // if (!resposta.ok) throw new Error('falha ao listar processos')
  // return resposta.json()
}

// Simula GET /processos/{id} (rota 9)
export async function buscarProcesso(idProcesso) {
  await espera(500)
  const p = processos.find(x => x.id === idProcesso)
  if(!p) throw erroHttp(404)
  return detalhar(p)
}

// Simula POST /processos (rota 8). Devolve o formato da rota 9.
export async function criarProcesso({tipo, documentos}) {
  await espera(800)
  if(!tipo || documentos.length === 0) throw erroHttp(400)

  const id = 'p' + proximoProcesso
  proximoProcesso = proximoProcesso + 1

  const novo = {
    id,
    tipo,
    colaborador: null,
    emailConvite: null,
    dataCriacao: new Date().toISOString().slice(0, 10),
    dataConclusao: null,
    documentos: documentos.map((d, i) => {
      const tipoDoc = tiposDocumento.find(t => t.id === d.idTipoDocumento)
      return {
        id: id + 'd' + (i + 1),
        nomeTipo: tipoDoc.nome,
        descricao: d.descricao || '',
        direcao: d.direcao,
        status: 'PENDENTE',
        motivoRecusa: null,
        idUltimoEnvio: null,
        aceitoEm: null,
      }
    }),
  }
  processos = [novo, ...processos]
  return detalhar(novo)
}

// Simula POST /processos/{id}/convites (rota 10)
export async function gerarConvite(idProcesso, email) {
  await espera(600)
  const p = processos.find(x => x.id === idProcesso)
  if(!p || !email.includes('@')) throw erroHttp(400)
  if(p.colaborador) throw erroHttp(409) // já tem colaborador

  p.emailConvite = email
  const codigo = String(Math.floor(100000 + Math.random() * 900000))
  const expiraEm = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  return {codigo, expiraEm}
}

// Simula POST /documentos/{id}/avaliacao (rota 12)
export async function avaliarDocumento(idDocumento, {resultado, motivoRecusa}) {
  await espera(600)

  const p = processos.find(x => x.documentos.some(d => d.id === idDocumento))
  if(!p) throw erroHttp(404)
  const d = p.documentos.find(x => x.id === idDocumento)

  // RN16 e rota 12: só avalia documento em análise e processo não concluído
  if(p.dataConclusao || d.status !== 'EM_ANALISE') throw erroHttp(409)
  // RN11: toda recusa exige motivo
  if(resultado === 'RECUSADO' && !(motivoRecusa || '').trim()) throw erroHttp(400)

  d.status = resultado
  d.motivoRecusa = resultado === 'RECUSADO' ? motivoRecusa.trim() : null
  return {}
}