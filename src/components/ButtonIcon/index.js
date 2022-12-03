import { Button, Spinner } from 'react-bootstrap';
import { Tooltip } from 'components';

export default function ButtonIcon({
  action = 'primary',
  icon,
  variant,
  tip,
  isLoading,
}) {
  return (
    <Tooltip text={tip}>
      <Button
        className="py-2 px-2 d-flex align-items-center justify-content-center"
        variant={variant}
        onClick={action}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <img src={icon} alt={`icone ${tip}`} />
        )}
      </Button>
    </Tooltip>
  );
}
