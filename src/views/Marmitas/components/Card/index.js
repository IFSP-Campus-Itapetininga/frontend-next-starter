import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import styled from './card.module.scss';
import { formatMoney } from 'utils';
import { OffCanvas } from 'components';

const renderTooltip = ({ text, ...props }) => (
  <Tooltip id="button-tooltip" {...props}>
    {text}
  </Tooltip>
);

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
            <OverlayTrigger
              placement="right"
              delay={{ show: 150, hide: 50 }}
              overlay={(evt) => renderTooltip({ text: 'Ver mais', ...evt })}
            >
              <button type="button" onClick={() => setShow(true)}>
                <img src="/icons/chevron-double-down.svg" alt="Ver mais" />
              </button>
            </OverlayTrigger>
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
            <OverlayTrigger
              placement="right"
              delay={{ show: 150, hide: 50 }}
              overlay={(evt) =>
                renderTooltip({ text: 'Cancelar pedido', ...evt })
              }
            >
              <Button variant="dark">
                <img src="/icons/x-lg.svg" alt="icone de cancelar" />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="right"
              delay={{ show: 150, hide: 50 }}
              overlay={(evt) =>
                renderTooltip({ text: 'Confirmar pedido', ...evt })
              }
            >
              <Button variant="primary">
                <img src="/icons/check-lg.svg" alt="icone de concordo" />
              </Button>
            </OverlayTrigger>
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
