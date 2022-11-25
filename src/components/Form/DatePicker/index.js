import Form from 'react-bootstrap/Form';
import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export default function DatePickerComponent({
  name,
  clearble = true,
  defaultDate,
  placeholder,
  ...props
}) {
  const [date, setDate] = useState(defaultDate);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange = (dateChange) => {
    setValue(name, dateChange, {
      shouldDirty: true,
    });
    setDate(dateChange);
  };

  useEffect(() => {
    setValue(name, defaultDate);
  }, []);

  return (
    <Form.Group controlId={name}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            {...props}
            locale={ptBR}
            dateFormat="dd/MM/yyyy"
            withPortal
            isClearable={clearble}
            autocomplete="new-password"
            placeholderText={placeholder}
            selected={date}
            onChange={handleChange}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
          />
        )}
      />
      <div className={`invalid-feedback d-block`}>
        {Object.keys(errors).length > 0 && errors[name]?.message}
      </div>
    </Form.Group>
  );
}
