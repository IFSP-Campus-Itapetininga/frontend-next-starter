import { useFormContext, Controller } from 'react-hook-form';

import Form from 'react-bootstrap/Form';

export default function Input({
  name,
  type,
  label,
  placeholeder,
  isRequired,
  size,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
              value={field.value || ''}
              placeholder={placeholeder || label}
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
