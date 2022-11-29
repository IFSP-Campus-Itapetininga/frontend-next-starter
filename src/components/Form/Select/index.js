import Form from 'react-bootstrap/Form';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

export default function Input({
  name,
  label,
  options,
  placeholder,
  isRequired,
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
        render={({ field }) => (
          <Select
            {...field}
            name={name}
            id={name}
            isClearable
            value={field.value}
            placeholder={placeholder || label}
            options={options}
          />
        )}
      />
      <div className={`invalid-feedback d-block`}>
        {Object.keys(errors).length > 0 && errors[name]?.message}
      </div>
    </Form.Group>
  );
}
