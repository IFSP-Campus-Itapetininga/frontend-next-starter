import Form from 'react-bootstrap/Form';

function Select({ propsDados, valor, handleOnChange  }) {
    return (
        <Form.Select  onChange={handleOnChange} value={valor || ''}>
            <option>Selecione a opção</option>
            {propsDados.map((option) => (
                <option value={option.id} key={option.id}>
                    {option.nome}
                </option>
            ))}
        </Form.Select>
    )
}

export default Select;