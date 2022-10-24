import Form from 'react-bootstrap/Form';
import { useFormContext, Controller } from 'react-hook-form';

import { chooseMask } from './mask';

// Tipos de mascára de input aceitos
// 'phone' | 'cpf' | 'date' | 'zipcode' | 'currency'

export default function Input({
  name,
  type,
  label,
  placeholeder,
  inputMode,
  isRequired,
  mask,
  size,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleKeyUp = (evt) => {
    if (mask) {
      return chooseMask({ evt, mask });
    }
  };

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>

      <Controller
        name={name}
        control={control}
        rules={{ required: isRequired }}
        render={({ field }) => {
          return (
            <Form.Control
              {...field}
              type={type || 'text'}
              size={size}
              inputMode={inputMode || 'text'}
              value={field.value || ''}
              placeholder={placeholeder || label}
              onKeyUp={handleKeyUp}
            />
          );
        }}
      />

      <Form.Control.Feedback type="invalid">
        {errors && errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
