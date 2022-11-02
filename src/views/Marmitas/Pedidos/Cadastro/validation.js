import * as yup from 'yup';

export default yup.object().shape({
  telefone: yup.string().required('Campo obrigatório'),
  produto: yup.object().nullable().required('Campo obrigatório'),
});
