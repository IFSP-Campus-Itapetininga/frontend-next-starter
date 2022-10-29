import Link from 'next/link';
import styled from './SectionButton.module.scss';

export default function Button({ color, goto, text }) {
  return (
    <Link href={goto}>
      <a className={`${styled.slotContent} ${styled[color]}`}>{text}</a>
    </Link>
  );
}
