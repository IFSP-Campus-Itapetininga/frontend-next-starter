import Form from 'react-bootstrap/Form';
import { useFormContext, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

export default function Input({
  name,
  label,
  options,
  placeholder,
  findNewData,
  isRequired,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const filterColors = async (inputValue) => {
    findNewData(inputValue);
    return await options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  console.log(isRequired, errors);

  const promiseOptions = (inputValue) =>
    new Promise(async (resolve) => {
      resolve(filterColors(inputValue));
    });

  const customStyles = {
    control: (base) => {
      const hasErro = Object.keys(errors).length > 0;

      const color = hasErro ? '#ff4136' : 'hsl(0, 0%, 80%)';
      const shadow = hasErro
        ? '0 0 0px 3.5px rgb(223 71 89 / 30%)'
        : '0 0 0 1px #2684FF';

      return {
        ...base,
        borderColor: `${color}`,
        boxShadow: `${shadow}`,
      };
    },
    dropdownIndicator: (base) => {
      const hasErro = Object.keys(errors).length > 0;
      const color = hasErro ? '#ff4136' : 'hsl(0, 0%, 40%)';

      return {
        ...base,
        color: `${color}`,
      };
    },
  };

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>

      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            name={name}
            id={name}
            defaultOptions
            cacheOptions
            isClearable
            loadOptions={promiseOptions}
            value={field.value}
            placeholder={placeholder || label}
            styles={customStyles}
          />
        )}
      />
      <div className={`invalid-feedback d-block`}>
        {Object.keys(errors).length > 0 && errors[name]?.message}
      </div>
    </Form.Group>
  );
}
