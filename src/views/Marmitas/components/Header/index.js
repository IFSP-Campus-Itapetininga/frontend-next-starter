import React from 'react';
import Image from 'next/image';
//import { Slot } from '@radix-ui/react-slot';
import styles from './header.module.scss';
import Link from 'next/link';

const CustomButton = ({ variant, icon, action, asChild, ...rest }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={`${variant} d-flex rounded-1 flex-row align-items-center py-2 px-3 gap-3`}
      onClick={action}
      {...rest}
    />
  );
};

export default function Headers({
  route,
  action,
  sectionTitle,
  showButton = true,
}) {
  return (
    <div className={styles.contentWrapper}>
      <h1>{sectionTitle}</h1>
      <div className="d-flex flex-row align-items-center gap-3 mt-3">
        <Link href={route}>
          <div
            role="button"
            className="bg-light text-dark text-decoration-none d-flex rounded-1 flex-row align-items-center py-2 px-3 gap-3"
          >
            <Image
              src="/icons/chevron-left.svg"
              width="16px"
              height="16px"
              alt="Icone botão"
            />
            <a>Voltar</a>
          </div>
        </Link>

        {showButton && (
          <CustomButton
            action={action}
            variant="bg-success text-white"
            icon="/icons/plus-lg.svg"
          >
            <>
              <Image
                src="/icons/plus-lg.svg"
                width="16px"
                height="16px"
                alt="Icone botão"
              />

              <span>Novo</span>
            </>
          </CustomButton>
        )}
      </div>
    </div>
  );
}
