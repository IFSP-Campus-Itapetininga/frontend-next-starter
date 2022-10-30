import { Eventos } from 'views';
import * as eventService from 'services/eventos';

export default function EventosPage(props) {
  return <Eventos {...props} />;
}

export const getServerSideProps = async (ctx) => {
  const events = await eventService.getEvents();

  return {
    props: {
      events,
    },
  };
};
