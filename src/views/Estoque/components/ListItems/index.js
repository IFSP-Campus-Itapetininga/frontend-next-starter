import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import api from "services";
import { getProducts, getVendorHasItem } from "services/estoque";

const ListItems = ({ fornecedorid, justList, setNewItem }) => {
  const [items, setItems] = useState([]);

  async function handleFilterItems() {
    const products = await getProducts();
    const vendorProducts = await getVendorHasItem(fornecedorid);
    const filteredItems = products.filter((item) => {
      const checkFilter = vendorProducts.response.item.some((i) => i.itemid === item.itemid);
      if (!checkFilter) return item;
    });
    console.log(filteredItems);
    setItems(filteredItems);
  }
  async function getItems() {
    if (justList) {
      const data = await getVendorHasItem(fornecedorid);
      setItems(data.response.item);
    } else {
      handleFilterItems();
    }
  }
  useEffect(() => {
    getItems();
  }, [])

  async function handleAddItemToVendor(id) {
    const newVendorHasItem = {
      fornecedorid,
      itemid: id
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/item/vendor`, JSON.stringify(newVendorHasItem), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        alert("Item adicionado ao fornecedor!");
        getVendorHasItem(fornecedorid);
        setNewItem();
      });
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center">Código</th>
          <th className="text-center">Produto</th>
          <th className="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          items?.filter(item => item.ativo === 1).map(item => {
            return (
              <tr key={justList ? item.itemid : item.itemid + 10}>
                <td className="text-center">{item.itemid}</td>
                <td>{item.descricao}</td>
                <td>
                  <div className="text-center">
                    {justList ?
                      <Button variant="danger">Excluir</Button> :
                      <Button variant="success" onClick={() => handleAddItemToVendor(item.itemid)}>Adicionar ao fornecedor</Button>
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

export default ListItems;