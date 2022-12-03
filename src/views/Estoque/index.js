import { Container } from 'react-bootstrap'; 
import { Layout } from 'layout';

import styles from './Estoque.module.scss' 
import CadastrarProduto from './CadastrarProduto';
import Sidebar from './components/Sidebar';
import { StockLayout } from './layout';

export default function Estoque() { 
  return (
    <Layout session={'Estoque'} >
      <StockLayout>
        <CadastrarProduto />
      </StockLayout>
    </Layout>
    ) 
}