
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/produtos.css"; 

export default function Produto({ categoria = "pratos" }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Função para buscar produtos do backend
  async function carregarProdutos() {
    try {
      setLoading(true);
      setErro("");

      // Faz requisição ao backend conforme a categoria
      const response = await axios.get(`http://localhost:3000/${categoria}`);

      if (response.data.success && Array.isArray(response.data.produtos)) {
        setProdutos(response.data.produtos);
      } else {
        setErro("Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setErro("Falha na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  // Executa uma vez ao montar o componente
  useEffect(() => {
    carregarProdutos();
  }, [categoria]);

  // Função para o botão "Comprar"
  function handleComprar(produto) {
    console.log("Produto selecionado:", produto);
    alert(`Você selecionou: ${produto.nome_prato}`);
  }

  // Exibição condicional
  if (loading) {
    return <p className="produto-loading">Carregando {categoria}...</p>;
  }

  if (erro) {
    return <p className="produto-erro">{erro}</p>;
  }

  return (
    <div className="produto-container">
      {produtos.length === 0 ? (
        <p className="produto-vazio">Nenhum item encontrado.</p>
      ) : (
        produtos.map((p) => (
          <div key={p.id_prato || p.id_bebida || p.id_produto} className="produto-card">
            <img
              src={p.img_url_prato || p.img_url_bebida || "/drink.jpg"}
              alt={p.nome_prato || p.nome_bebida || "Produto"}
              className="produto-imagem"
            />
            <div className="produto-detalhes">
              <h3 className="produto-nome">{p.nome_prato || p.nome_bebida}</h3>
              <p className="produto-descricao">{p.descricao_prato || p.descricao_bebida}</p>
              <p className="produto-preco">
                R$ {parseFloat(p.preco_prato || p.preco_bebida || 0).toFixed(2)}
              </p>
              <button
                className="produto-botao-comprar"
                onClick={() => handleComprar(p)}
              >
                Comprar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}