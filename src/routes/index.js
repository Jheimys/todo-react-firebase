import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../Home'
import Register from '../Register'
import Admin from '../Admin'
import Privete from '../Privite'

const RoutesApp = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element = {<Privete> <Admin /> </Privete>}/>
    </Routes>
  )
}

export default RoutesApp