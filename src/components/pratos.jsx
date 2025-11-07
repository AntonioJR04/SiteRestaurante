import pratos from './pratos.json';
import '../style/pratos.css'

export default function Pratos() {
  return (
    <div className="lista-pratos">
      {pratos.map((prato) => (
        <div key={prato.id} className="card-prato">
          <img src={prato.imagem} alt={prato.nome} />
          <h3>{prato.nome}</h3>
          <p>{prato.descricao}</p>
          <span>R$ {prato.preco.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
