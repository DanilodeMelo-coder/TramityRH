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
import { processoSimulado } from './documentos'
import { useState } from 'react'

export default function App(){
  const [tela, setTela] = useState('login') // Definido para 'login' para iniciar na tela de login
  const [processo, setProcesso] = useState(processoSimulado)
  const [documentoAtual, setDocumentoAtual] = useState(null)
  const [resumoAtual, setResumoAtual] = useState(null)

  // Depois do envio, o documento passa para EM_ANALISE (RN10)
  function marcarEnviado(idDocumento){
    setProcesso({
      ...processo,
      documentos: processo.documentos.map(d =>
        d.id === idDocumento ? {...d, status: 'EM_ANALISE', motivoRecusa: null} : d
      ),
    })
  }

  if(tela === 'login'){
    return <TelaLogin
      irParaRecuperar={() => setTela('recuperar')}
      irParaCadastro={() => setTela('cadastro')}
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
      voltar={() => setTela('login')}
      irParaInicio={() => setTela('inicio')}
    />
  }
  if(tela === 'inicio'){
    return <TelaInicio
      processo={processo}
      irParaEnviar={(documento) => {
        setDocumentoAtual(documento)
        setTela('enviar')
      }}
    />
  }
  if(tela === 'enviar'){
    return <TelaEnviarDocumento
      documento={documentoAtual}
      voltar={() => setTela('inicio')}
      aoEnviar={marcarEnviado}
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