import RecuperarAcesso from './RecuperarAcesso'
import TelaLogin from './TelaLogin'
import TelaCodigoVerificacao from './TelaCodigoVerificacao'
import {useState} from 'react' 

export default function App(){
  const[tela, setTela] = useState('login')
 
  if(tela === 'login'){
    return <TelaLogin irParaRecuperar={() => setTela('recuperar')} />
  }
  if(tela === 'verificacao'){
    return <TelaCodigoVerificacao voltarParaLogin={() => setTela('login')} />
  }
  return <RecuperarAcesso voltarParaLogin={()=> setTela('login')}
          RecuperarAcesso avancarParaVerificacao={()=> setTela('verificacao')}
  />

  
}

