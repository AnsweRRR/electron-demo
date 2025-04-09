import { useEffect, useState } from 'react';

const SerialDataDisplay = () => {
  const [serialData, setSerialData] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = window.electron.subscribeSerialData((data) => {
      console.log(data);
      setSerialData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Soros port adatok</h2>
      {serialData ? (
        <div>
          <p>Adat: {serialData}</p>
        </div>
      ) : (
        <p>Várakozás adatra...</p>
      )}
    </div>
  );
};

export default SerialDataDisplay;