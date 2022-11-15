import { useEffect } from 'react';
import styles from './AlertModal.module.scss';

export const AlertModal = ({ title, text }) => {
  function showAlert() {
    const modal = document.querySelector('.alert-modal');
    modal?.classList.add('active');
    setTimeout(() => {
      modal?.classList.remove('active');
    }, 2000);
  }

  useEffect(() => {
    showAlert();
  })
  return (
    <div className={styles.alertModal}>
      <div className={styles.alertContent}>
        <span>{title}</span>
        <p>{text}</p>
      </div>
    </div>
  )
}
