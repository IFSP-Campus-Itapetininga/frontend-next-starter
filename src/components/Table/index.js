import Table from 'react-bootstrap/Table';

export default function TableComponent({ header, data }) {
  const renderTabelBody = () =>
    data?.map((item, id) => (
      <tr key={id}>
        {header.map((row, id) => (
          <td key={id}>
            {typeof item[row.acessor] === 'function'
              ? item[row.acessor]()
              : item[row.acessor]}
          </td>
        ))}
      </tr>
    ));

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          {header.map((el, id) => (
            <th key={id}>{el.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTabelBody()}</tbody>
    </Table>
  );
}
