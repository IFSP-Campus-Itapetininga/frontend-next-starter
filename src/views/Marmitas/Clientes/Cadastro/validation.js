import * as yup from 'yup';

export default yup.object().shape({
  nome: yup.string().required('Campo nome é obrigatório'),
  telefone: yup.string().required('Campo telefone obrigatório'),
  rua: yup.string().required('Campo rua obrigatório'),
  bairro: yup.string().required('Campo bairro obrigatório'),
  numero: yup.string().required('Campo numero obrigatório'),
});
