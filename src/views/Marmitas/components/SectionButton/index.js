import { Slot } from '@radix-ui/react-slot';
import styled from './SectionButton.module.scss';

export default function Button({ asChild, color, buttonAction, ...rest }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      onClick={buttonAction}
      className={`${styled.slotContent} ${styled[color]}`}
      {...rest}
    />
  );
}
