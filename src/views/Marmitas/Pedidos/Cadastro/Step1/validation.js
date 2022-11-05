import * as yup from 'yup';

export default yup.object().shape({
  telefone: yup
    .string()
    .min(15, 'Campo obrigatório')
    .max(15, 'Campo obrigatório')
    .required('Campo obrigatório'),
});
