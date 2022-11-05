import { Input, ButtonIcon } from 'components';
import { useForm, FormProvider } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';

export function Step1({ nextStep, setFormData }) {
  const methods = useForm();

  const onSubmit = methods.handleSubmit(async (values) => {
    setFormData((state) => {
      return { ...state, cliente: values };
    });

    nextStep();
  });

  return (
    <FormProvider {...methods}>
      <form className="py-2" onSubmit={onSubmit}>
        <div className="mb-3 d-flex align-items-center gap-3">
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
            action={() => console.log('abriu')}
          />

          <button onClick={onSubmit}>Prox</button>
        </div>
      </form>
    </FormProvider>
  );
}
