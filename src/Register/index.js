import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//firebase
import {auth } from '../firebaseConection'
import { createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = async(e) => {
    e.preventDefault()

    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', {replace: true})
        })
        .catch(() => {
          console.log("Erro ao fazer cadastro")
        })
    } else {
      alert('Preencha todos os campos')
    }
  }

  return (
    <div className='container-home'>
      <h1>Cadastre-se</h1>
      <span>Vasmos criar sua conta</span>

      <form className='form' onSubmit={handleRegister}>
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

        <button type='submit'> Cadastrar </button>
      </form>

      <Link to='/' className='button-link'>
        Já possui uma conta? Faça login!
      </Link>

    </div>
  )
}

export default Register