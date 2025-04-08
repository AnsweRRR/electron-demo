import { useSerialPorts } from "../hooks/useSerialPorts";
import tableify from "tableify";

const SerialPortPage = () => {
  const serialPorts = useSerialPorts();

  console.log(serialPorts);

  // Convert the serialPorts object into HTML table using tableify
  const tableHTML = tableify(serialPorts);

  return (
    <div>
      <h1>Soros Portok</h1>
      {/* Render the HTML table using dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: tableHTML }} />
    </div>
  );
};

export default SerialPortPage;