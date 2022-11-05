import * as yup from 'yup';

export default yup.object().shape({
  produto: yup.object().required('Campo obrigatório'),
});
