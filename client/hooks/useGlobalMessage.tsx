import * as React from 'react';

export type Severity = 'success' | 'info' | 'warning' | 'error';

const useGlobalMessage = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string | undefined>(undefined);
  const [severity, setSeverity] = React.useState<Severity | undefined>(
    undefined
  );
  const onSendMessage = (_message: string, _severity: Severity): void => {
    setOpen(true);
    setMessage(_message);
    setSeverity(_severity);
  };
  const onCloseMessage = () => {
    setOpen(false);
  };

  return { onSendMessage, onCloseMessage, open, message, severity };
};

export default useGlobalMessage;
