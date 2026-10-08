import RecuperarAcesso from './RecuperarAcesso'
import TelaLogin from './TelaLogin'
import {useState} from 'react'

export default function App(){
  const[tela, setTela] = useState('login')
 
  if(tela === 'login'){
    return <TelaLogin irParaRecuperar={() => setTela('recuperar')} />
  }
  return <RecuperarAcesso voltarParaLogin={()=> setTela('login')}/>
}
