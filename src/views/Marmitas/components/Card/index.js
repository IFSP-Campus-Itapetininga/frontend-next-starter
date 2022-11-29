import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styled from './card.module.scss';
import { convertMonetary } from 'utils';
import { OffCanvas, Tooltip } from 'components';
import Image from 'next/image';
import { OrderModal } from '../OrderModal';

const renderOrders = (data) => {
  return data?.map((el, id) => (
    <div key={id} className={styled.cardContainer}>
      <p>{el.titulo}</p>
      <p>
        {el.quantidade}x - {convertMonetary(el.preco)}
      </p>
    </div>
  ));
};

export default function CardComponent({ order, ...rest }) {
  const [show, setShow] = useState(false);
  const [showOrderModal, setShowOrderModa] = useState('');

  return (
    <Card>
      <Card.Header as="h5">Pedido - #{order}</Card.Header>
      <Card.Body>
        <div className={styled.cardBodyWrapp}>
          {renderOrders(rest?.produtos.slice(0, 2))}
          {rest?.produtos.length > 2 && (
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
            <p>{convertMonetary(rest.valor_total)}</p>
          </div>

          <div>
            <Tooltip text="Cancelar pedido">
              <Button
                variant="dark"
                onClick={() => setShowOrderModa(`canceled ${order}`)}
              >
                <Image
                  width="14px"
                  height="14px"
                  src="/icons/x-lg.svg"
                  alt="icone de cancelar"
                />
              </Button>
            </Tooltip>
            <Tooltip text="Confirmar pedido">
              <Button
                variant="primary"
                onClick={() => setShowOrderModa(`finalized ${order}`)}
              >
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

      <OrderModal setShowModal={setShowOrderModa} showModal={showOrderModal} />

      <OffCanvas
        placement="end"
        show={show}
        title={`Pedido - #${order}`}
        setShow={setShow}
      >
        <div className={styled.offCanvaBody}>
          <div>
            <p>Listagem completa dos pedidos:</p>
            {renderOrders(rest?.produtos)}

            <div className={styled.cardContainer}>
              <p>Total</p>
              <p>{convertMonetary(rest.valor_total)}</p>
            </div>
          </div>

          <div className={styled.offcanvaFooter}>
            <Button
              variant="dark"
              onClick={() => setShowOrderModa(`canceled ${order}`)}
            >
              Cancelar pedido
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowOrderModa(`finalized ${order}`)}
            >
              Concluir pedido
            </Button>
          </div>
        </div>
      </OffCanvas>
    </Card>
  );
}
