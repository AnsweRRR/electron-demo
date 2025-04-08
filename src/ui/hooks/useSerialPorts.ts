import { useEffect, useState } from 'react';
import { SerialPort } from 'serialport';

export function useSerialPorts(): Awaited<ReturnType<typeof SerialPort.list>>[number][] {
  const [value, setValue] = useState<Awaited<ReturnType<typeof SerialPort.list>>[number][]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeSerialPorts((ports) =>
      setValue(ports)
    );
    return unsub;
  }, []);

  return value;
}
