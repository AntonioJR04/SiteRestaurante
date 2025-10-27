import React from 'react'
import Header from '../components/header.jsx'
import Produto from '../components/produto.jsx'

export default function prato() {

  return (
    <div>
      <Header />
      <Produto categoria="pratos"/>
    </div>
  )
}

