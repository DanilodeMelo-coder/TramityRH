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
import { realizarLogout } from './auth'
import { useState } from 'react'

export default function App(){
  const [tela, setTela] = useState('login')
  const [documentoAtual, setDocumentoAtual] = useState(null)
  const [resumoAtual, setResumoAtual] = useState(null)

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
    return <TelaCodigoVerificacao voltarParaLogin={() => setTela('login')} />
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
    avancarParaVerificacao={() => setTela('verificacao')}
  />
}