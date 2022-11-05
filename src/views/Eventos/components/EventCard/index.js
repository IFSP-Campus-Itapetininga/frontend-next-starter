import { useState } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';
import ConfirmationModal from '../ConfirmationModal';
import UpdateEventModal from '../UpdateEventModal';
import styles from './EventCard.module.scss';

const formatDateToBrazilianStandard = (_date) => {
  const date = parseISO(_date.split('.')[0]);
  return format(date, "dd'/'MM'/'yyyy HH':'mm");
};

const EventCard = (props) => {
  const { data } = props;
  const { id, titulo, local, dataInicio, descricao, dataTermino } = data;
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  return (
    <Card>
      <Card.Body className={styles.cardBody}>
        <div>
          <h5>
            #{id} {titulo} | {formatDateToBrazilianStandard(dataInicio)} -{' '}
            {formatDateToBrazilianStandard(dataTermino)}
          </h5>
          <p>{local}</p>
          <p>{descricao}</p>
        </div>
        <div className={styles.buttonActions}>
          <Button
            variant="warning"
            className={styles.buttonAction}
            onClick={() => setUpdateModalOpen(true)}
          >
            <Image
              width="20"
              height="20"
              src="/icons/pencil-fill.svg"
              alt="Imagem de uma caneta indicando botão de edição do evento"
            />
          </Button>
          <Button
            variant="danger"
            className={styles.buttonAction}
            onClick={() => setConfirmationModalOpen(true)}
          >
            <Image
              width="20"
              height="20"
              src="/icons/trash3-fill.svg"
              alt="Imagem de uma lixeira indicando a deleção do evento"
            />
          </Button>
        </div>
      </Card.Body>
      <UpdateEventModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        data={data}
      />
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        eventId={data.id}
      />
    </Card>
  );
};

export default EventCard;
