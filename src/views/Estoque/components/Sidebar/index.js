import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import styles from './Sidebar.module.scss';


const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Gestão de estoque</h2>
      <ul className={styles.sidebarMenu}>
        <li>
          <h3 className={styles.subtitle}>Inventário</h3>
          <ul>
            <li>
              <Link href={'/estoque'}>
                <a className="nav-link">Cadastrar item</a>
              </Link>
            </li>
            <li>
              <Link href={'/estoque/buscar-produto'}>
                <a className="nav-link">Buscar item</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className={styles.subtitle}>Fornecedores</h3>
          <ul>
            <li>
              <Link href={'/estoque/cadastrar-fornecedor'}>
                <a className="nav-link">Cadastrar fornecedor</a>
              </Link>
            </li>
            <li>
              <Link href={'/estoque/buscar-fornecedor'}>
                <a className="nav-link">Buscar fornecedor</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className={styles.subtitle}>Relatórios</h3>
          <ul>
            <li>
              <Link href={'/estoque/movimentacoes'}>
                <a className="nav-link">Movimentação de estoque</a>
              </Link>
            </li>
            <li>
              <Link href={'/estoque/saldo-inventario'}>
                <a className="nav-link">Saldo do inventário</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  )
}

export default Sidebar;