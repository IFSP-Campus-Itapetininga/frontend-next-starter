import Image from 'next/image';
import { Button, Container } from 'react-bootstrap';
import { Layout } from 'layout';
import EventCard from './components/EventCard';
import styles from './Eventos.module.scss';
import CreateEventModal from './components/CreateEventModal';
import { useState } from 'react';

export default function Eventos(props) {
  const { events } = props;
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <Layout session={'Eventos'}>
      <Container className="py-5">
        <div className={styles.heading}>
          <h1>Eventos</h1>
          <Button variant="success" onClick={() => setCreateModalOpen(true)}>
            <Image
              src="/icons/plus-circle.svg"
              alt="Ícone com o simbolo de adição indicando a ação de criar um novo evento."
              width="20"
              height="20"
            />
          </Button>
        </div>
        <div className={styles.wrapper}>
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} data={event} />)
          ) : (
            <p>Nenhum evento cadastrado!</p>
          )}
        </div>
      </Container>
      <CreateEventModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </Layout>
  );
}
