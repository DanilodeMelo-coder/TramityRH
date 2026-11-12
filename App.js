import RecuperarAcesso from './RecuperarAcesso'
import TelaLogin from './TelaLogin'
import TelaCodigoVerificacao from './TelaCodigoVerificacao'
import TelaCadastro from './TelaCadastroColaborador'
import TelaInicio from './TelaInicio'
import TelaEnviarDocumento from './TelaEnviarDocumento'
import TelaListaProcessos from './TelaListaProcessos'
import TelaDetalheProcesso from './TelaDetalheProcesso'
import TelaNovoProcesso from './TelaNovoProcesso'
import TelaConvite from './TelaConvite'
import TelaNovaSenha from './TelaNovaSenha'
import { realizarLogout } from './auth'
import { useState } from 'react'

export default function App(){
  const [tela, setTela] = useState('login')
  const [documentoAtual, setDocumentoAtual] = useState(null)
  const [resumoAtual, setResumoAtual] = useState(null)
  const [emailRecuperacao, setEmailRecuperacao] = useState('')
  const [tokenRedefinicao, setTokenRedefinicao] = useState(null)
  

  async function sair(){
    await realizarLogout()
    setTela('login')
  }

  if(tela === 'login'){
    return <TelaLogin
      irParaRecuperar={() => setTela('recuperar')}
      irParaCadastro={() => setTela('cadastro')}
      aoEntrar={(perfil) => setTela(perfil === 'RH' ? 'processosRH' : 'inicio')}
    />
  }
  if(tela === 'cadastro'){
    return <TelaCadastro voltarParaLogin={() => setTela('login')} />
  }
    if(tela === 'verificacao'){
    return <TelaCodigoVerificacao
      email={emailRecuperacao}
      voltarParaLogin={() => setTela('login')}
      avancarParaNovaSenha={(token) => {
        setTokenRedefinicao(token)
        setTela('novaSenha')
      }}
    />
  }

    if(tela === 'novaSenha'){
    return <TelaNovaSenha
      tokenRedefinicao={tokenRedefinicao}
      irParaLogin={() => setTela('login')}
    />
  }
  
  if(tela === 'convite'){
    return <TelaConvite
      voltar={sair}
      aoAceitar={() => setTela('inicio')}
    />
  }
  if(tela === 'inicio'){
    return <TelaInicio
      irParaEnviar={(documento) => {
        setDocumentoAtual(documento)
        setTela('enviar')
      }}
      irParaConvite={() => setTela('convite')}
      sair={sair}
    />
  }
  if(tela === 'enviar'){
    return <TelaEnviarDocumento
      documento={documentoAtual}
      voltar={() => setTela('inicio')}
    />
  }
  if(tela === 'processosRH'){
    return <TelaListaProcessos
      irParaDetalhe={(resumo) => {
        setResumoAtual(resumo)
        setTela('detalheProcesso')
      }}
      irParaNovoProcesso={() => setTela('novoProcesso')}
      sair={sair}
    />
  }
  if(tela === 'detalheProcesso'){
    return <TelaDetalheProcesso
      resumo={resumoAtual}
      voltar={() => setTela('processosRH')}
    />
  }
  if(tela === 'novoProcesso'){
    return <TelaNovoProcesso voltar={() => setTela('processosRH')} />
  }
    return <RecuperarAcesso
    voltarParaLogin={() => setTela('login')}
    avancarParaVerificacao={(email) => {
      setEmailRecuperacao(email)
      setTela('verificacao')
    }}
  />
}