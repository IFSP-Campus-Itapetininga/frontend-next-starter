import * as yup from 'yup';

export default yup.object().shape({
  produto: yup.object().nullable().required('Campo obrigatório'),
  quantidade: yup.string().required('Qty é obrigtório'),
});
