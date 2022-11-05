import * as yup from 'yup';

export default yup.object().shape({
  telefone: yup
    .string()
    .min(15, 'Campo obrigatório')
    .max(15, 'Campo obrigatório')
    .required('Campo obrigatório'),
  nome: yup.string().required('Campo nome é obrigatório'),
  rua: yup.string().required('Campo rua obrigatório'),
  bairro: yup.string().required('Campo bairro obrigatório'),
  numero: yup.string().required('Nº obrigatório'),
});
