import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { getItemHasVendor, getVendors } from "services/estoque";
import { handleAddItemToVendor } from "services/estoque";
import DeleteModal from "../DeleteModal";
import Link from "next/link";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

const ListVendors = ({ itemid, justList, setNewVendor }) => {

  const [vendors, setVendors] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIds, setDeleteIds] = useState();
  const queryClient = useQueryClient();

  const { isLoading, error, data: dataVendors } = useQuery(['itemVendors'],
    () => getItemHasVendor(itemid).then(res => {
      return res.result
    }));

  async function getListVendors() {
    const newVendors = await getVendors();
    setVendors(newVendors);
  }


  async function addVendorToItem(id) {
    const newVendorHasItem = {
      fornecedorid: id,
      itemid
    }
    createVendorToItem(newVendorHasItem);
  }

  useEffect(() => {
    getListVendors();
    if (!justList) console.log(vendors);
  }, []);

  const {
    mutate: createVendorToItem,
    isLoading: isCallLoading,
    isError: isCallError,
  } = useMutation(handleAddItemToVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['itemVendors']);
      setNewVendor();
    },
  });


  function handleShowDeleteModal(vendorid) {
    const delIds = {
      itemid: +itemid,
      fornecedorid: vendorid
    }
    setDeleteIds(delIds);
    setShowDeleteModal(!showDeleteModal);
  }
  if (isLoading) return "Loading..."

  if (error) return 'Ocorreu um erro: ' + error.message;

  return (
    <>
      {justList ?
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Código</th>
              <th className="text-center">Fornecedor</th>
              <th className="text-center">Descrição</th>
              <th className="text-center">CNPJ</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              dataVendors
                .filter(vendor => vendor.ativo === '1')
                .map(vendor => {
                  return (
                    <tr key={vendor.fornecedorid}>
                      <td className="text-center">{vendor.fornecedorid}</td>
                      <td><Link href={`/estoque/fornecedor/${vendor.fornecedorid}`}>{vendor.fornecedor}</Link></td>
                      <td>{vendor.descricao}</td>
                      <td>{vendor.cnpj}</td>
                      <td>
                        <div className="text-center">
                          <Button variant="danger" onClick={() => handleShowDeleteModal(vendor.fornecedorid)}>Excluir</Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </Table> :
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Código</th>
              <th className="text-center">Fornecedor</th>
              <th className="text-center">Descrição</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              vendors
                .filter(vendor => {
                  const checkFilter = dataVendors.some((i) => i.fornecedorid === vendor.fornecedorid);
                  if (!checkFilter) return vendor;
                })
                .filter(vendor => vendor.ativo === '1')
                .map(vendor => {
                  return (
                    <tr key={vendor.fornecedorid + 10}>
                      <td className="text-center">{vendor.fornecedorid}</td>
                      <td><Link href={`/estoque/fornecedor/${vendor.fornecedorid}`}>{vendor.fornecedor}</Link></td>
                      <td>{vendor.descricao}</td>
                      <td>
                        <div className="text-center">
                          <Button variant="success" onClick={() => addVendorToItem(vendor.fornecedorid)}>Adicionar</Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </Table>
      }
      <DeleteModal showModal={showDeleteModal} type="itemHasVendor" id={deleteIds} setShow={() => setShowDeleteModal(false)} getData={getListVendors} />
    </>
  )
}

export default ListVendors