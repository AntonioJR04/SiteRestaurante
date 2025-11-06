import React, { useState, useEffect } from 'react'
import Header from '../components/header.jsx'
import Produto from '../components/produto.jsx'
import axios from 'axios'

export default function Prato() {
  const [pratos, setPratos] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [pratoAtual, setPratoAtual] = useState({
    id: '',
    nome: '',
    descricao: '',
    preco: '',
    categoria: 'pratos',
    imagem: ''
  })

  const API_URL = 'http://localhost/.../api/pratos/index.php' // aqui tem q colocar o caminho do back

  const carregarPratos = async () => {
    try {
      const resposta = await axios.get(API_URL)
      if (resposta.data.success) {
        setPratos(resposta.data.data.data || resposta.data.data)
      } else {
        setPratos([]) 
      }
    } catch (erro) {
      console.error('Erro ao carregar pratos:', erro)
      setPratos([]) 
    }
  }

  useEffect(() => {
    carregarPratos()
  }, [])

  const abrirModal = (prato = null) => {
    if (prato) {
      setModoEdicao(true)
      setPratoAtual(prato)
    } else {
      setModoEdicao(false)
      setPratoAtual({
        id: '',
        nome: '',
        descricao: '',
        preco: '',
        categoria: 'pratos',
        imagem: ''
      })
    }
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
  }

  const salvarPrato = async (e) => {
    e.preventDefault()
    const tipo = modoEdicao ? 'update' : 'insert'
    const formData = new FormData()
    formData.append('tipo', tipo)
    Object.entries(pratoAtual).forEach(([chave, valor]) => {
      formData.append(chave, valor)
    })

    try {
      const resposta = await axios.post(API_URL, formData)
      if (resposta.data.success) {
        alert(resposta.data.message)
        fecharModal()
        carregarPratos()
      } else {
        alert(resposta.data.message)
      }
    } catch (erro) {
      console.error('Erro ao salvar prato:', erro)
    }
  }

  const excluirPrato = async (id) => {
    if (!window.confirm('Deseja realmente excluir este prato?')) return

    const formData = new FormData()
    formData.append('tipo', 'delete')
    formData.append('id', id)

    try {
      const resposta = await axios.post(API_URL, formData)
      if (resposta.data.success) {
        alert('Prato excluído com sucesso!')
        carregarPratos()
      } else {
        alert(resposta.data.message)
      }
    } catch (erro) {
      console.error('Erro ao excluir prato:', erro)
    }
  }

  return (
    <div>
      <Header />
      <Produto categoria="pratos" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Gerenciar Pratos</h1>

        <button
          onClick={() => abrirModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Novo Prato
        </button>

        <div className="mt-4 mb-2 text-gray-700 font-medium">
          {pratos.length === 0
            ? 'Nenhum prato adicionado ainda.'
            : `Total de pratos: ${pratos.length}`}
        </div>

        {pratos.length > 0 ? (
          <table className="w-full mt-2 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Descrição</th>
                <th className="border p-2">Preço</th>
                <th className="border p-2">Imagem</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pratos.map((p) => (
                <tr key={p.id}>
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.nome}</td>
                  <td className="border p-2">{p.descricao}</td>
                  <td className="border p-2">R$ {p.preco}</td>
                  <td className="border p-2">
                    {p.imagem ? (
                      <img
                        src={p.imagem}
                        alt={p.nome}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      'Sem imagem'
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => abrirModal(p)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirPrato(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

   
        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form
              onSubmit={salvarPrato}
              className="bg-white p-6 rounded-lg w-[400px] shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">
                {modoEdicao ? 'Editar Prato' : 'Novo Prato'}
              </h2>

              <input
                type="text"
                placeholder="Nome"
                value={pratoAtual.nome}
                onChange={(e) =>
                  setPratoAtual({ ...pratoAtual, nome: e.target.value })
                }
                className="border p-2 mb-2 w-full rounded"
                required
              />

              <textarea
                placeholder="Descrição"
                value={pratoAtual.descricao}
                onChange={(e) =>
                  setPratoAtual({ ...pratoAtual, descricao: e.target.value })
                }
                className="border p-2 mb-2 w-full rounded"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={pratoAtual.preco}
                onChange={(e) =>
                  setPratoAtual({ ...pratoAtual, preco: e.target.value })
                }
                className="border p-2 mb-2 w-full rounded"
                required
              />

              <input
                type="text"
                placeholder="URL da Imagem"
                value={pratoAtual.imagem}
                onChange={(e) =>
                  setPratoAtual({ ...pratoAtual, imagem: e.target.value })
                }
                className="border p-2 mb-4 w-full rounded"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  {modoEdicao ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
