import React, { useState, useEffect } from 'react';
import AreaChartComponent from './components/SimpleAreaChart';
import { Product } from 'my-types';

const ProductsAreaChart: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('product/areachart')
      .then(res => res.json())
      .then((d: Product[]) => setData(d))
      .catch(err => console.error(err));
  }, []);

  return <AreaChartComponent data={data} />;
};

export default ProductsAreaChart;
