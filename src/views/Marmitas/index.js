import { useForm, FormProvider } from 'react-hook-form';
import style from './Marmitas.module.scss';

import { Input } from '../../components';

const Marmitas = () => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit(async (values) => {
    console.log(values);
  });

  return (
    <div style={style.content}>
      <p>Marmitas page!</p>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            type="text"
            placeholeder="Nome"
            label="Nome do cliente"
          />

          <button>Enviar</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Marmitas;
