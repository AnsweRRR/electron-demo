import { useEffect, useState } from 'react';

export function useSerialPorts(): SerialPortInfo[] {
  const [value, setValue] = useState<SerialPortInfo[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeSerialPorts((stats) =>
      setValue(stats)
    );
    return unsub;
  }, []);

  console.log(value);

  return value;
}
