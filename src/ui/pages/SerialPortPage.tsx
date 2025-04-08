import { useEffect, useState } from "react";

interface SerialPortInfo {
  path: string;
  manufacturer?: string;
  serialNumber?: string;
  vendorId?: string;
  productId?: string;
}

const SerialPortPage = () => {
  const [ports, setPorts] = useState<SerialPortInfo[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribePorts = window.electron.subscribeSerialPorts(setPorts);
    const unsubscribeData = window.electron.subscribeSerialPortData(
      ({ path, data }: { path: string; data: string }) => {
        if (path === selectedPath) {
          setLog((prev) => [...prev, data]);
        }
      }
    );

    return () => {
      unsubscribePorts();
      unsubscribeData();
      if (selectedPath) {
        window.electron.closeSerialPort(selectedPath);
      }
    };
  }, [selectedPath]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPath = e.target.value;
    if (selectedPath) {
      window.electron.closeSerialPort(selectedPath);
    }
    setLog([]); // reset log
    setSelectedPath(newPath);
    window.electron.openSerialPort(newPath);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Soros Port Monitor</h1>

      <label>
        <strong>Válaszd ki a portot:</strong>
        <select value={selectedPath ?? ""} onChange={handleSelect}>
          <option value="" disabled>-- Válassz --</option>
          {ports.map((port) => (
            <option key={port.path} value={port.path}>
              {port.path} ({port.manufacturer ?? "ismeretlen"})
            </option>
          ))}
        </select>
      </label>

      <h2>Bejövő adatok:</h2>
      <div
        style={{
          whiteSpace: "pre-wrap",
          border: "1px solid #ccc",
          padding: "0.5rem",
          marginTop: "1rem",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {log.length === 0 ? (
          <em>Nincs adat</em>
        ) : (
          log.map((line, idx) => <div key={idx}>{line}</div>)
        )}
      </div>
    </div>
  );
};

export default SerialPortPage;
