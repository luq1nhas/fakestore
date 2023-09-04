import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setprodutoSelecionado] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  const abrirModal = (produto) => {
    setprodutoSelecionado(produto);
  };

  const fecharModal = () => {
    setprodutoSelecionado(null);
  };

  return (
  <>
    <nav className="navbar bg-body-tertiary nav-espaco">
        <div className="container-fluid">
          <span className="navbar-brand">Loja Virtual</span>
        </div>
      </nav>
    <div className="App">
      <div className="produto-lista">
        {produtos.map((product) => (
          <div className="produto-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Preço: ${product.price}</p>
            <button onClick={() => abrirModal(product)}>Ver Detalhes</button>
          </div>
        ))}
      </div>

      {produtoSelecionado && (
        <div className="modal">
          <div className="modal-content">
            <span className="fechar" onClick={fecharModal}>
              &times;
            </span>
            <h2>{produtoSelecionado.title}</h2>
            <p>Descrição: {produtoSelecionado.description}</p>
            <p>Preço: ${produtoSelecionado.price}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
