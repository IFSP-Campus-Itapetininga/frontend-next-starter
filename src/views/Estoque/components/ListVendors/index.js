import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "services";
import { getItemHasVendor, getVendors } from "services/estoque";

const ListVendors = ({ itemid, justList, setNewVendor}) => {

  const [vendors, setVendors] = useState([]);

  async function handleFilterVendors() {
    const data = await getVendors();
    const itemVendors = await getItemHasVendor(itemid);
    const filteredVendors = data.filter((item) => {
      const checkFilter = itemVendors.result.some((i) => i.fornecedorid === item.fornecedorid);
      if (!checkFilter) return item;
    })
    setVendors(filteredVendors);
  }

  async function getListVendors() {
    if (justList) {
      const data = await getItemHasVendor(itemid);
      console.log(data);
      setVendors(data.result);
    } else {
      handleFilterVendors();
    }
  }

  async function handleAddVendorToItem(id) {
    const newVendorHasItem = {
      fornecedorid: id,
      itemid
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/item/vendor`, JSON.stringify(newVendorHasItem), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        alert("Fornecedor adicionado ao item!");
        setNewVendor();
        getListVendors();
      });
  }

  useEffect(() => {
    getListVendors();
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center">Código</th>
          <th className="text-center">Fornecedor</th>
          <th className="text-center">Descrição</th>
          {justList && <th className="text-center">CNPJ</th>}
          <th className="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          vendors?.map(vendor => {
            return (
              <tr key={vendor.fornecedorid}>
                <td className="text-center">{vendor.fornecedorid}</td>
                <td>{vendor.fornecedor}</td>
                <td>{vendor.descricao}</td>
                {justList && <td>{vendor.cnpj}</td>}
                <td>
                  <div className="text-center">
                    {justList ?
                      <Button variant="danger">Excluir</Button> :
                      <Button variant="success" onClick={() => handleAddVendorToItem(vendor.fornecedorid)}>Adicionar</Button>
                    }

                  </div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

export default ListVendors