import { useState, useEffect } from "react";
import { Button, Table, InputGroup, Form } from "react-bootstrap";
import { getProducts, getVendorHasItem } from "services/estoque";
import { handleAddItemToVendor } from "services/estoque";
import DeleteModal from "../DeleteModal";
import Link from "next/link";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const ListItems = ({ fornecedorid, justList, setNewItem }) => {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIds, setDeleteIds] = useState();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const { isLoading, error, data: dataItems } = useQuery(['vendorItems'],
    () => getVendorHasItem(fornecedorid).then(res => {
      return res.response.item
    }));

  async function getItems() {
    const newProducts = await getProducts();
    setProducts(newProducts);
  }
  useEffect(() => {
    getItems();
  }, [])

  const {
    mutate: createItemToVendor,
    isLoading: isCallLoading,
    isError: isCallError,
  } = useMutation(handleAddItemToVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['vendorItems']);
      setNewItem();
    },
  });

  async function addItemToVendor(id) {
    const newVendorHasItem = {
      fornecedorid,
      itemid: id
    }
    createItemToVendor(newVendorHasItem);
  }

  function handleShowDeleteModal(itemid) {
    const delIds = {
      itemid: +itemid,
      fornecedorid: fornecedorid
    }
    setDeleteIds(delIds);
    setShowDeleteModal(!showDeleteModal);
  }


  if (isLoading) return "Loading..."

  if (error) return 'Ocorreu um erro: ' + error.message;

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
        {
          justList ?
            <tbody>
              {
                dataItems
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
                      <tr key={item.itemid}>
                        <td className="text-center">{item.itemid}</td>
                        <td><Link href={`/estoque/produto/${item.itemid}`}>{item.descricao}</Link></td>
                        <td>
                          <div className="text-center">
                            <Button variant="danger" onClick={() => handleShowDeleteModal(item.itemid)}>Excluir</Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
              }
            </tbody>
            :
            <tbody>
              {
                products
                  .filter(item => {
                    const checkFilter = dataItems.some((i) => i.itemid === item.itemid);
                    if (!checkFilter) return item;
                  })
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
                      <tr key={item.itemid + 10}>
                        <td className="text-center">{item.itemid}</td>
                        <td><Link href={`/estoque/produto/${item.itemid}`}>{item.descricao}</Link></td>
                        <td>
                          <div className="text-center">
                            <Button variant="success" onClick={() => addItemToVendor(item.itemid)}>Adicionar</Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
              }
            </tbody>}
      </Table>
      {!justList && <div className="d-flex justify-content-between">
        <Button onClick={() => { setPage(page - 10) }} disabled={page === 0}>
          Anterior
        </Button>
        <Button onClick={() => { setPage(page + 10) }} disabled={items.length <= page + 10}>
          Próximo
        </Button>
      </div>}
      <DeleteModal showModal={showDeleteModal} type="itemHasVendor" id={deleteIds} setShow={() => setShowDeleteModal(false)} getData={getItems} />
    </>
  )
}

export default ListItems;