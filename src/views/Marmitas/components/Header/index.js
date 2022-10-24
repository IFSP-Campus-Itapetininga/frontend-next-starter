import React from 'react';
import Image from 'next/image';
import { Slot } from '@radix-ui/react-slot';
import styles from './header.module.scss';
import Link from 'next/link';

const CustomButton = ({ variant, icon, asChild, children }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={`${variant} d-flex rounded-1 flex-row align-items-center py-2 px-3 gap-3`}
      onClick={() => alert('click')}
    >
      <Image src={icon} width="16px" height="16px" alt="Icone botão" />
      {children}
    </Comp>
  );
};

const NextLink = React.forwardRef(function CustomComponent(props, ref) {
  return (
    <CustomButton variant="bg-light text-dark" icon="/icons/chevron-left.svg">
      <a>Voltar</a>
    </CustomButton>
  );
});

export default function Headers() {
  return (
    <div className={styles.contentWrapper}>
      <h1>Produtos</h1>
      <div className="d-flex flex-row align-items-center gap-3 mt-3">
        <Link href="/marmitas">
          <NextLink />
        </Link>
        <CustomButton variant="bg-success text-white" icon="/icons/plus-lg.svg">
          Novo
        </CustomButton>
      </div>
    </div>
  );
}
