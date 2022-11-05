import { Input, ButtonIcon } from 'components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Spinner } from 'react-bootstrap';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';

import schema from './validation';
import { getMarmitaClientByPhone, createMarmitaClient } from 'services';
import { useState } from 'react';

const ClientForm = ({ hasData }) => {
  return (
    <>
      <div className="mb-3 d-flex align-items-center gap-3 ">
        <div className="w-75">
          <Input
            name="nome"
            placeholeder="Nome do cliente"
            label="Nome"
            disabled={hasData}
          />
        </div>
        <div className="w-25">
          <Input
            name="numero"
            placeholeder="000"
            label="Número"
            disabled={hasData}
          />
        </div>
      </div>
      <div className="mb-3 d-flex align-items-center gap-3 ">
        <div className="w-50">
          <Input
            name="rua"
            placeholeder="Rua do cliente"
            label="Rua"
            disabled={hasData}
          />
        </div>
        <div className="w-50">
          <Input
            name="bairro"
            placeholeder="Bairro do cliente"
            label="Bairro"
            disabled={hasData}
          />
        </div>
      </div>
    </>
  );
};

export function Step1({ nextStep, setFormData }) {
  const [search, setSearch] = useState(false);
  const [hasClient, setHasClient] = useState(true);
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    formState: { errors },
  } = methods;

  const clientPhone = methods.watch('telefone')?.replace(/[^\w]/g, '');

  const { data, isLoading, isFetching, isFetched } = useQuery(
    ['getMarmitaClientByPhone', { search: clientPhone }],
    () => getMarmitaClientByPhone({ search: clientPhone }),
    {
      enabled: search,
      onSuccess: (data) => {
        setSearch(false);

        if (!data) {
          setHasClient(false);
          methods.resetField('nome');
          methods.resetField('numero');
          methods.resetField('rua');
          methods.resetField('bairro');
          return;
        }

        setHasClient(true);
        methods.setValue('nome', data.nome);
        methods.setValue('numero', data.numero);
        methods.setValue('rua', data.rua);
        methods.setValue('bairro', data.bairro);

        methods.clearErrors('');
      },
      onError: () => {
        setSearch(false);
      },
    }
  );

  const { mutate, isLoading: isClientLoading } = useMutation(
    createMarmitaClient,
    {
      onSuccess: (data, sended) => {
        const response = {
          ...data,
          ...sended,
        };

        setFormData((state) => {
          return { ...state, cliente: response };
        });

        nextStep();
      },
    }
  );

  const onSubmit = methods.handleSubmit(async (values) => {
    const clients = {
      ...values,
      telefone: values.telefone?.replace(/[^\w]/g, ''),
    };

    if (!hasClient) {
      mutate(clients);

      return;
    }

    setFormData((state) => {
      return { ...state, cliente: { id: data.id, ...clients } };
    });

    nextStep();
  });

  return (
    <FormProvider {...methods}>
      <div>
        <h5 className="card-title">Buscar clientes</h5>
      </div>

      <form className="py-2" onSubmit={onSubmit}>
        <div
          className={`mb-3 d-flex gap-3 ${
            !!errors['telefone']?.message
              ? 'align-items-center'
              : 'align-items-end'
          }`}
        >
          <div className="w-100">
            <Input
              name="telefone"
              placeholeder="Celular do cliente"
              label="Celular"
              mask="phone"
              inputMode="numeric"
            />
          </div>
          <ButtonIcon
            icon="/icons/search.svg"
            tip="Editar cliente"
            variant="primary"
            isLoading={isLoading && isFetching}
            action={() => {
              if (!!methods.watch('telefone')) {
                setSearch(true);
              }
            }}
          />
        </div>

        <div>{isFetched && <ClientForm hasData={!!data} />}</div>
      </form>

      <div className="w-100 d-flex justify-content-end">
        <Button variant="outline-primary" onClick={onSubmit}>
          {isClientLoading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Aguarde...
            </>
          ) : (
            'Próximo'
          )}
        </Button>
      </div>
    </FormProvider>
  );
}
