import styles from './AlertModal.module.scss';

export const AlertModal = ({ title, text, showAlertModal }) => {

  return (
    showAlertModal ?
      <div className={styles.alertModal}>
        <div className={styles.alertContent}>
          <span>{title}</span>
          <p>{text}</p>
        </div>
      </div>
      : null
  )
}
