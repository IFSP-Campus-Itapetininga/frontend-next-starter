import Pagination from 'react-bootstrap/Pagination';

export default function PaginationComponent({ handlePaginate, page, end }) {
  return (
    <Pagination>
      {page > 2 && <Pagination.First onClick={() => handlePaginate('first')} />}

      <Pagination.Prev
        disabled={page < 2}
        onClick={() => handlePaginate('prev')}
      />

      {page > 1 && (
        <Pagination.Item onClick={() => handlePaginate('prev')}>
          {page - 1}
        </Pagination.Item>
      )}

      <Pagination.Item active>{page}</Pagination.Item>

      {!end && (
        <Pagination.Item onClick={() => handlePaginate('next')}>
          {page + 1}
        </Pagination.Item>
      )}
      <Pagination.Next disabled={end} onClick={() => handlePaginate('next')} />
    </Pagination>
  );
}
