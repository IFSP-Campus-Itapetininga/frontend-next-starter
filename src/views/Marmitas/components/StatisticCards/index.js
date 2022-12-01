import styled from './statistics.module.scss';
import Image from 'next/image';

export function StatisticCard({ icon, title, description, statistic, color }) {
  return (
    <div className={`${styled.card} ${styled[color]}`}>
      <div className={styled.cardTop}>
        <Image width="24px" height="24px" alt="icone" src={icon} />
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>

      <h3>{statistic}</h3>
    </div>
  );
}
