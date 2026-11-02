// Parte do app que fala com as rotas /auth da API.
// Por enquanto devolve dados simulados no mesmo formato da API.

// Simula POST /auth/cadastro (rota 2)
export async function cadastrarColaborador({nome, cpf, email, senha}) {
  // Simula o tempo de rede
  await new Promise(resolve => setTimeout(resolve, 1200))

  // Para testar o erro 409 (e-mail ou CPF já existe)
  if (email.toLowerCase() === 'existe@teste.com') {
    const erro = new Error('conflito')
    erro.status = 409
    throw erro
  }

  return { id: 'colaborador-simulado-1', nome, email }

  // Versão real (usar quando a API estiver no ar):
  // const resposta = await fetch(`${API_URL}/auth/cadastro`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ nome, cpf, email, senha }),
  // })
  // if (!resposta.ok) {
  //   const erro = new Error('falha no cadastro')
  //   erro.status = resposta.status
  //   throw erro
  // }
  // return resposta.json()
}