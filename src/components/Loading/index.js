import Spinner from 'react-bootstrap/Spinner';

import styled from './loading.module.scss';

export default function Loading({ show }) {
  return (
    <div className={`${styled.overlay} ${show ? styled['show'] : ''}`}>
      <Spinner animation="grow" />
    </div>
  );
}
