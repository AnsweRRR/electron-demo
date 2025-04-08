import { useSerialPorts } from "../hooks/useSerialPorts";

const SerialPortPage = () => {
  const serialPorts = useSerialPorts();

  console.log("Serial Ports: ", serialPorts);

  return (
    <div>
      <h1>Serial Port Page</h1>
      <p>This is the Serial Port Page.</p>
    </div>
  );
}

export default SerialPortPage;