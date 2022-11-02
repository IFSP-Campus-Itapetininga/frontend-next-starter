import { Button } from 'react-bootstrap';
import { Tooltip } from 'components';

export default function ButtonIcon({ action = 'primary', icon, variant, tip }) {
  return (
    <Tooltip text={tip}>
      <Button
        className="py-2 px-2 d-flex align-items-center justify-content-center"
        variant={variant}
        onClick={action}
      >
        <img src={icon} alt={`icone ${tip}`} />
      </Button>
    </Tooltip>
  );
}
