import React from 'react'
import Header from '../components/header.jsx'
import Produto from '../components/produto.jsx'

export default function drink() {

  return (
    <div>
      <Header />
      <Produto categoria="bebidas"/>
    </div>
  )
}