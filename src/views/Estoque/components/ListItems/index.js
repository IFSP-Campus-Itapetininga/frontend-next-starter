import { useState, useEffect } from "react";
import { Button, Table, InputGroup, Form } from "react-bootstrap";
import api from "services";
import { getProducts, getVendorHasItem } from "services/estoque";

const ListItems = ({ fornecedorid, justList, setNewItem }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
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
    <>
      <InputGroup className="mb-3 d-flex align-items-end">
        <Form.Control
          placeholder="Procure um item..."
          aria-label="Procure um item..."
          aria-describedby="basic-addon2"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </InputGroup>
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
            items
              .filter(item => item.ativo === 1)
              .filter(val => {
                if (searchTerm == "") {
                  return val;
                } else if (val.descricao.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val;
                }
              })
              .slice(page, page + 10)
              .map(item => {
                return (
                  <tr key={justList ? item.itemid : item.itemid + 10}>
                    <td className="text-center">{item.itemid}</td>
                    <td>{item.descricao}</td>
                    <td>
                      <div className="text-center">
                        {justList ?
                          <Button variant="danger">Excluir</Button> :
                          <Button variant="success" onClick={() => handleAddItemToVendor(item.itemid)}>Adicionar</Button>
                        }

                      </div>
                    </td>
                  </tr>
                )
              })
          }
        </tbody>
      </Table>
      {!justList && <div className="d-flex justify-content-between">
        <Button onClick={() => { setPage(page - 10) }} disabled={page === 0}>
          Anterior
        </Button>
        <Button onClick={() => { setPage(page + 10) }} disabled={items.length <= page + 10}>
          Próximo
        </Button>
      </div>}
    </>
  )
}

export default ListItems;