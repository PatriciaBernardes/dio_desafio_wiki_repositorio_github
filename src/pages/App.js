import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';
import { Container } from './styles'
import { api } from '../services/api';

function App() {

const [curentRepo, setCurentRepo] = useState('');

const [repos, setRepos] = useState([]);

const handleSearchRepo = async () => {

    const {data} =  await api.get(`repos/${curentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){
        setRepos(prev => [...prev, data])
        setCurentRepo('')
        return
      }
     
    }
    alert('Repositório não encontrado ou já existe')
}


const handleRemoveRepo = (id) =>{
    //console.log('Removendo', id);
    setRepos((repos) => {
      return repos.filter(repo => repo.id !== id)
    })
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="GitHub logo"/>
      <Input value={curentRepo} onChange={(e) => setCurentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
      
    </Container>
  );
}

export default App;
