import React, { useState, useEffect } from 'react';
import BarChartComponent from './components/SimpleBarChart';
import { Product } from 'my-types';

const ProductsBarChart: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('product/chart')
      .then(res => res.json())
      .then((d: Product[]) => setData(d))
      .catch(err => console.error(err));
  }, []);

  return <BarChartComponent data={data} />;
};

export default ProductsBarChart;
