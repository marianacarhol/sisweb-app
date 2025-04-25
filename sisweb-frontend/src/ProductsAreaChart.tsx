import React, { useState, useEffect } from 'react';
import AreaChartComponent from './components/SimpleAreaChart';
import { Donation } from 'my-types';

const DonationsAreaChart: React.FC = () => {
  const [data, setData] = useState<Donation[]>([]);

  useEffect(() => {
    fetch('donation/areachart')
      .then(res => res.json())
      .then((d: Donation[]) => setData(d))
      .catch(err => console.error(err));
  }, []);

  return <AreaChartComponent data={data} />;
};

export default DonationsAreaChart;
