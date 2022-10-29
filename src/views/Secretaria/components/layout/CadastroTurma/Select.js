import Form from 'react-bootstrap/Form';

function Select({propsDados}) {
    return (
        <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            {propsDados.map((option) => (
                <option value={option.id} key={option.id}>
                    {option.nome}
                </option>
            ))}
        </Form.Select>
    );
}

export default Select;