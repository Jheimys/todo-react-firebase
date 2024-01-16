import React, { useState } from 'react'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'

//Firebase
import { auth } from '../firebaseConection'
import { signInWithEmailAndPassword } from "firebase/auth";


const Home = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin =  async (e) => {
    e.preventDefault()

    if(email !== '' && password !== ''){
      
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', {replace: true})
        })
        .catch(() => {
          console.log('Erro ao fazer login')
        })

    } else {
      alert('Preencha todos os campos')
    }
  }

  return (
    <div className='container-home'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma fácil</span>

      <form className='form' onSubmit={handleLogin}>
        <input 
          type='text'
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder='*********'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'> Acessar </button>
      </form>

      <Link to='/register' className='button-link'>
        Não possui uma conta? cadastre-se 
      </Link>

    </div>
  )
}

export default Home