import * as yup from 'yup';

export default yup.object().shape({
  titulo: yup.string().required('Campo obrigatório'),
  preco: yup.string().required('Campo obrigatório'),
});
