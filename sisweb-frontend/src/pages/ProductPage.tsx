import { useEffect, useState } from "react";
import { Product } from "my-types";
import { Donation } from "my-types"
import { getAllProducts, deleteProduct } from "../api/ProductAPI";
import { getAllDonations } from "../api/DonationAPI"
import FilterBar from "../components/FilterBar";
import ProductTable from "../components/ProductTable";
import SimpleBarChart from "../components/SimpleBarChart";
import SimpleAreaChart from "../components/SimpleAreaChart";
import './ProductPage.css'

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [donations, setDonations] = useState<any[]>([]); // Add donations state
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    // Fetch both products and donations
    Promise.all([
      getAllProducts(),
      getAllDonations(), // Assuming you have a function to fetch donations
    ]).then(([productData, donationData]) => {
      if (productData) {
        setProducts(productData);
        setFilteredProducts(productData);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }

      if (donationData) {
        setDonations(donationData); // Set donations data
      } else {
        setDonations([]);
      }
    });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás segura de eliminar este producto?")) return;

    await deleteProduct(id);
    const data = await getAllProducts();

    if (data) {
      setProducts(data);
      setFilteredProducts(data);
    } else {
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  const handleFilter = () => {
    let filtrados = products;

    if (selectedType !== "") {
      filtrados = filtrados.filter(
        (p) => p.productTypeId?.toString() === selectedType
      );
    }

    if (searchName.trim() !== "") {
      filtrados = filtrados.filter((p) =>
        p.nombre.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredProducts(filtrados);
  };  

  return (
    <>
      <nav className="container">
        <p className="title">Productos</p>
        <hr />
        <FilterBar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          searchName={searchName}
          setSearchName={setSearchName}
          handleFilter={handleFilter}
        />

        <ProductTable
          products={filteredProducts}
          donations={donations} // Pass donations prop
          onDelete={handleDelete}
        />
      </nav>

    </>
  );
};
      

export default ProductPage;
