import { useSerialPorts } from "../hooks/useSerialPorts";
import tableify from "tableify";

const SerialPortPage = () => {
  const serialPorts = useSerialPorts();
  const tableHTML = tableify(serialPorts);

  return (
    <div>
      <h1>Soros Portok</h1>
      <div dangerouslySetInnerHTML={{ __html: tableHTML }} />
    </div>
  );
};

export default SerialPortPage;