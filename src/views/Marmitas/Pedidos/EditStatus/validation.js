import * as yup from 'yup';

export default yup.object().shape({
  status: yup.object().nullable().required('Campo obrigatório'),
});
