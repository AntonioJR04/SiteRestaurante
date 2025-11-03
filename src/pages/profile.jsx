import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header.jsx'

export default function Cadastro() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    foto: null, 
  })

  const [preview, setPreview] = useState(null)
  const [erroFoto, setErroFoto] = useState('')

 
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
  
      if (file.size > 2 * 1024 * 1024) {
        setErroFoto('A foto deve ter no máximo 2MB')
        return
      } else {
        setErroFoto('')
      }

      setFormData({ ...formData, foto: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

 
    if (formData.foto) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const data = { ...formData, foto: reader.result }
        localStorage.setItem('user', JSON.stringify(data))
        alert('Cadastro feito com sucesso!')
        navigate('/profile')
      }
      reader.readAsDataURL(formData.foto)
    } else {
      localStorage.setItem('user', JSON.stringify(formData))
      alert('Cadastro feito com sucesso!')
      navigate('/profile')
    }
  }

  return (
    <div className="page">
      <Header />

      <div className="container">
        <div className="card">
          <h2 className="title">Cadastro</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className={`photo-area ${preview ? 'has-photo' : 'empty'}`}>
              {preview ? (
                <img src={preview} alt="Preview" className="photo" />
              ) : (
                <div className="photo-empty">Sem foto</div>
              )}
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {erroFoto && <div className="text-red-500 mt-1">{erroFoto}</div>}
            </div>

            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome"
              required
              className="input"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="input"
            />

            <button
            
              type="submit"
              className="btn"
              disabled={!formData.nome || !formData.email}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
