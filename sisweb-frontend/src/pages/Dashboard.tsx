import { useEffect, useState } from "react";
import { Product } from "my-types";
import { getAllProducts } from "../api/ProductAPI";
import { getAllDonations } from "../api/DonationAPI"
import SimpleBarChart from "../components/SimpleBarChart";
import SimpleAreaChart from "../components/SimpleAreaChart";
import './Dashboard.css'
import DonationsAreaChart from "../ProductsAreaChart";

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [donations, setDonations] = useState<any[]>([]); // Add donations state
  

    useEffect(() => {
      Promise.all([
        getAllProducts(),
        getAllDonations(), // Assuming you have a function to fetch donations
      ]).then(([productData, donationData]) => {
        if (productData) {
          setProducts(productData);}
        
        else {
          setProducts([]);
        }
        
        if (donationData) {
          setDonations(donationData); // Set donations data
        } else {
          setDonations([]);
        }
      });
    }, []);
  
    return (
      <div className="container mt-5">
        <h1 className="title">DASHBOARD</h1>
        <hr />
        <div className="pt-6">
          <SimpleBarChart data={products} />
        </div>
  
        <div className="pt-6">
          <SimpleAreaChart data={donations} />
        </div>
      </div>
    );
  };
  
  export default Dashboard;