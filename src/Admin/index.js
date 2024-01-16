import React, { useEffect, useState } from 'react'
import './admin.css'

import { auth, db } from '../firebaseConection'
import { signOut } from 'firebase/auth'
import { 
  addDoc, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  where, 
  doc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore'

const Admin = () => {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [tarefas, setTarefas] = useState([])
  const [edit, setEdit] = useState({})

  useEffect(() => {
    async function loadTarefas(){
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))

      if(userDetail){
        const data = JSON.parse(userDetail)

        const tarefaRef = collection(db, "tarefas")

        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

        const unsub = onSnapshot(q, (snapshort) => {
          let lista = []

          snapshort.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })

          console.log(lista)
          setTarefas(lista)

          return () => {
            unsub()
          }
          
        })
      }
    }

    loadTarefas()
  }, [])

  async function handleRegister(e) {
    e.preventDefault()

    if(tarefaInput === ''){
      alert('Digite uma tarefa')
      return
    }

    if(edit?.id){
      handleUpdateTarefa()
      return
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        console.log('TAREFA REGISTRADA!')
        setTarefaInput('')
      })
      .catch((error) => {
        console.log('ERRO AO REGISTAR', error)
      })
  }

  async function handleLogout(){
    await signOut(auth)
  }

  async function deletarTarefa(id){
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)
  }

  function editarTarefa(item){
    setTarefaInput(item.tarefa)
    setEdit(item) 
  }

  async function handleUpdateTarefa(){
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
    .then(() => {
      console.log("TAREFA ATUALIZADA")
      setTarefaInput('')
      setEdit({})
    })
    .catch(() => {
      console.lol("ERRO AO ATUALIZAR")
      setEdit({})
      setTarefaInput('')
    })
  }

  return (
    <div className='admin-container'>
      <h1>Minhas Tarefas</h1>

      <form className='form' onSubmit={handleRegister}>
        <textarea 
          placeholder='Digite sua tarefa'
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
         {Object.keys(edit).length > 0 ? (
           <button className='btn-register' type='submit'style={{backgroundColor: '#6add39'}}>Editar Tarefa</button>
        ): (
          <button className='btn-register' type='submit'>Registar Tarefa</button>
        )}
      </form>
      
      {tarefas.map((item) => ( 
        <article className='list' key={item.id}>
          <p>{item.tarefa}</p>

          <div>
            <button onClick={() => editarTarefa(item)}>Editar</button>
            <button className='btn-delete' onClick={() => deletarTarefa(item.id)}>Excluir</button>
          </div>
        </article>
      ))}
      
      <button className='btn-logout' onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Admin