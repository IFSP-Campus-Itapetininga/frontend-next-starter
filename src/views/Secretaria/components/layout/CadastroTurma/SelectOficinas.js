import Form from 'react-bootstrap/Form';

function SelectOficinas({ propsDados, valor, handleOnChange  }) {
    return (
        <Form.Select  onChange={handleOnChange} value={valor || ''}>
            <option>Selecione a opção</option>
            {propsDados?.map((option) => (
                <option value={option.id} key={option.id}>
                    {option.oficina}
                </option>
            ))}
        </Form.Select>
    )
}

export default SelectOficinas;