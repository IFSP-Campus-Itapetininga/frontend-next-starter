import styled from './SectionButton.module.scss';
export default function Button({ children, color, buttonAction }) {
  return (
    <button
      type="button"
      onClick={buttonAction}
      className={`${styled.button} ${styled[color]}`}
    >
      {children}
    </button>
  );
}
