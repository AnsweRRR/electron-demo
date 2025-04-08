import { useSerialPorts } from "../hooks/useSerialPorts";

const SerialPortPage = () => {
  const serialPorts = useSerialPorts();

  console.log(serialPorts);

  return (
    <div>
      <h1>Soros Portok</h1>

      <table>
        <thead>
          <tr>
            <th>Port</th>
            <th>Manufacturer</th>
            <th>Serial Number</th>
            <th>Vendor ID</th>
            <th>Product ID</th>
          </tr>
        </thead>
        <tbody>
          {serialPorts.map((port, index) => (
            <tr key={index}>
              <td>{port.path}</td>
              <td>{port.manufacturer || 'N/A'}</td>
              <td>{port.serialNumber || 'N/A'}</td>
              <td>{port.vendorId || 'N/A'}</td>
              <td>{port.productId || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SerialPortPage;