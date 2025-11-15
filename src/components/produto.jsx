import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/produtos.css";

export default function Produto({ categoria = "pratos", addToBag }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const id_cliente = Number(localStorage.getItem("idCliente"));

  async function carregarProdutos() {
    try {
      setLoading(true);
      setErro("");

      const response = await axios.get(`http://localhost:3000/${categoria}`);

      if (response.data.success) {
        setProdutos(response.data.produtos);
      } else {
        setErro("Resposta inesperada do servidor.");
      }
    } catch (error) {
      setErro("Falha na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, [categoria]);

  function handleComprar(produto) {
    if (!id_cliente) {
      alert("Faça login primeiro.");
      window.location.href = "/login";
      return;
    }

    const nome = produto.nome_prato || produto.nome_bebida;
    const preco = parseFloat(produto.preco_prato || produto.preco_bebida);
    const img = produto.img_url_prato || produto.img_url_bebida;

    addToBag({
      id: produto.id_prato || produto.id_bebida,
      nome,
      preco,
      img,
      qtd: 1
    });

  }

  if (loading) return <p className="produto-loading">Carregando...</p>;
  if (erro) return <p className="produto-erro">{erro}</p>;

  return (
    <div className="produto-container">
      {produtos.length === 0 ? (
        <p className="produto-vazio">Nenhum item encontrado.</p>
      ) : (
        produtos.map((p) => {

          const nome = p.nome_prato || p.nome_bebida;
          const preco = parseFloat(p.preco_prato || p.preco_bebida || 0).toFixed(2);
          const descricao = p.descricao_prato || p.descricao_bebida;

          return (
            <div key={p.id_prato || p.id_bebida} className="produto-card">

              <img
                src={p.img_url_prato || p.img_url_bebida || "/default.jpg"}
                className="produto-imagem"
                alt={nome}
              />

              <div className="produto-detalhes">
                <h3>{nome}</h3>
                <p>{descricao}</p>
                <p className="produto-preco">R$ {preco}</p>

                <button onClick={() => handleComprar(p)} className="produto-botao-comprar">
                  Comprar
                </button>
              </div>

            </div>
          );
        })
      )}
    </div>
  );
}