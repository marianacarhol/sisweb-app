import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Donation } from 'my-types';

interface Props {
  data: Donation[];
}

function groupDonationsByDay(data: Donation[]) { //Función recibe data, arreglo de donaciones
  const groupedData = data.reduce((acc, donation) => { //data.reduce procesa cada donación una por una , acc contenedor donde se guardan suma de donaciones
    //donation cada donacion de la lista mientras se procesan
    const date = new Date(donation.updatedAt);
    const yearMonthDay = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //le da formato

    if (!acc[yearMonthDay]) { //si no esta en acc (caja) crea una en donde iguale a 0
      acc[yearMonthDay] = 0;
    }
    acc[yearMonthDay] += donation.cantidad; //si si esta en la caja le suma la cantidad

    return acc;
  }, {} as Record<string, number>);

  return Object.entries(groupedData).map(([yearMonthDay, cantidad]) => ({
    yearMonthDay,
    cantidad,
  }));
}

export default class Example1 extends PureComponent<Props> {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-area-chart-4y9cnl';

  render() {
    const testData = [...this.props.data];

    // Donación de prueba con fecha diferente
    testData.push({
      id: 999,
      cantidad: 100,
      updatedAt: new Date('2025-06-18T12:00:00Z'),
      personId: 1,
      productId: 1,
    });
    
    const processedData = groupDonationsByDay(testData);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={400}
          data={processedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="yearMonthDay" /> 
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="cantidad" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}