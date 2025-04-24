import { useEffect, useState } from "react";
import { Product } from "my-types";
import { getAllProducts, deleteProduct } from "../api/ProductAPI";
import SimpleBarChart from "../components/SimpleBarChart";
import SimpleAreaChart from "../components/SimpleAreaChart";

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      getAllProducts().then((data) => {
        if (data) setProducts(data);
        else setProducts([]);
      });
    }, []);
  
    return (
      <div className="container mt-5">
        <h1 className="title">Dashboard</h1>
  
        <div className="pt-6">
          <SimpleBarChart data={products} />
        </div>
  
        <div className="pt-6">
          <SimpleAreaChart data={products} />
        </div>
      </div>
    );
  };
  
  export default Dashboard;