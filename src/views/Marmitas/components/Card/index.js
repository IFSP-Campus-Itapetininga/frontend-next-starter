import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styled from './card.module.scss';
import { formatMoney } from 'utils';
import { OffCanvas, Tooltip } from 'components';
import Image from 'next/image';

const renderOrders = (data) => {
  return data.map((el, id) => (
    <div key={id} className={styled.cardContainer}>
      <p>{el.name}</p>
      <p>
        {el.amount}x - {formatMoney(el.price)}
      </p>
    </div>
  ));
};

export default function CardComponent({ order, ...rest }) {
  const [show, setShow] = useState(false);

  return (
    <Card>
      <Card.Header as="h5">Pedido - #{order}</Card.Header>
      <Card.Body>
        <div className={styled.cardBodyWrapp}>
          {renderOrders(rest?.plate.slice(0, 2))}
          {rest?.plate.length > 2 && (
            <Tooltip text="Ver mais">
              <button type="button" onClick={() => setShow(true)}>
                <Image
                  width="14px"
                  height="14px"
                  alt="icone"
                  src="/icons/chevron-double-down.svg"
                />
              </button>
            </Tooltip>
          )}
        </div>
      </Card.Body>
      <Card.Footer>
        <div className={styled.cardFooterWrap}>
          <div>
            <span>Total:</span>
            <p>{formatMoney(rest.total)}</p>
          </div>

          <div>
            <Tooltip text="Cancelar pedido">
              <Button variant="dark">
                <Image
                  width="14px"
                  height="14px"
                  src="/icons/x-lg.svg"
                  alt="icone de cancelar"
                />
              </Button>
            </Tooltip>
            <Tooltip text="Confirmar pedido">
              <Button variant="primary">
                <Image
                  width="14px"
                  height="14px"
                  alt="icone"
                  src="/icons/check-lg.svg"
                />
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card.Footer>

      <OffCanvas
        placement="end"
        show={show}
        title={`Pedido - #${order}`}
        setShow={setShow}
      >
        <div className={styled.offCanvaBody}>
          <div>
            <p>Listagem completa dos pedidos:</p>
            {renderOrders(rest?.plate)}

            <div className={styled.cardContainer}>
              <p>Total</p>
              <p>{formatMoney(rest.total)}</p>
            </div>
          </div>

          <div className={styled.offcanvaFooter}>
            <Button variant="dark">Cancelar pedido</Button>
            <Button variant="primary">Concluir pedido</Button>
          </div>
        </div>
      </OffCanvas>
    </Card>
  );
}
