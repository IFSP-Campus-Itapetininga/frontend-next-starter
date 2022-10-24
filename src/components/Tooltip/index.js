import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const renderTooltip = ({ text, ...props }) => (
  <Tooltip id="button-tooltip" {...props}>
    {text}
  </Tooltip>
);

export default function TooltipComponent({ children, text }) {
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 50 }}
      overlay={(evt) => renderTooltip({ text, ...evt })}
    >
      {children}
    </OverlayTrigger>
  );
}
