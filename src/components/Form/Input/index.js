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
  disabled,
  ...rest
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChande = (evt) => {
    if (mask) {
      return chooseMask({ evt, mask });
    }

    return evt;
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
              {...rest}
              type={type || 'text'}
              size={size}
              inputMode={inputMode || 'text'}
              value={field.value || ''}
              placeholder={placeholeder || label}
              isInvalid={!!errors[name]}
              disabled={disabled}
              onChange={(evt) => {
                handleChande(evt);
                field.onChange(evt);
              }}
            />
          );
        }}
      />
      <Form.Control.Feedback type="invalid">
        {Object.keys(errors).length > 0 && errors[name]?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
