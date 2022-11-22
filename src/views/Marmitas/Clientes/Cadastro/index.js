import { Modal, Input, Loading } from 'components';
import { useForm, FormProvider } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createMarmitaClient,
  getMarmitaClient,
  editMarmitaClient,
} from 'services';

import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';

export function Cadastro({ showModal, setShowModal }) {
  const methods = useForm({ resolver: yupResolver(schema) });

  const queryClient = useQueryClient();
  const enableModal = showModal.split(' ');

  const { isLoading: isLoadingEdit, isFetching } = useQuery(
    ['fetchProductInfo', enableModal[1]],
    () => getMarmitaClient(enableModal[1]),
    {
      enabled: enableModal[0] === 'edit',
      onSuccess: (data) => {
        methods.setValue('nome', data.nome);
        methods.setValue('telefone', data.telefone);
        methods.setValue('rua', data.rua);
        methods.setValue('bairro', data.bairro);
        methods.setValue('numero', data.numero);
      },
    }
  );

  const { mutate: createMamita, isLoading } = useMutation(createMarmitaClient, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAllMarmitaClients']);
      handleCloseModal();
    },
  });

  const { mutate: editMamita, isLoading: isEditLoading } = useMutation(
    editMarmitaClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllMarmitaClients']);
        handleCloseModal();
      },
    }
  );

  const onSubmit = methods.handleSubmit(async (values) => {
    const data = {
      ...values,
      telefone: values.telefone.replace(/[^\w]/g, ''),
    };
    if (enableModal[0] === 'edit') {
      editMamita({ id: enableModal[1], data });
      return;
    }

    createMamita(data);
  });

  const handleCloseModal = () => {
    setShowModal('');
    methods.reset('');
  };

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={handleCloseModal}
        title="Cadastro de Produto"
        buttonText={enableModal[0] === 'edit' ? 'Editar' : 'Cadastrar'}
        handleButton={onSubmit}
      >
        <FormProvider {...methods}>
          <form className="py-2" onSubmit={onSubmit}>
            <div className="mb-3 d-flex align-items-center gap-3 ">
              <div className="w-50">
                <Input
                  name="nome"
                  placeholeder="Nome do cliente"
                  label="Nome"
                />
              </div>
              <div className="w-50">
                <Input
                  name="telefone"
                  placeholeder="Celular do cliente"
                  label="Celular"
                  mask="phone"
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="mb-3 d-flex align-items-center gap-3 ">
              <div className="w-50">
                <Input name="rua" placeholeder="Rua do cliente" label="Rua" />
              </div>
              <div className="w-50">
                <Input
                  name="bairro"
                  placeholeder="Bairro do cliente"
                  label="Bairro"
                />
              </div>
            </div>
            <div className="mb-3 d-flex align-items-center gap-3 ">
              <div className="w-25">
                <Input name="numero" placeholeder="000" label="Número" />
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
      <Loading
        show={(isLoadingEdit && isFetching) || isLoading || isEditLoading}
      />
    </>
  );
}
