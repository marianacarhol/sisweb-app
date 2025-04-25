import { useEffect, useState } from "react";
import { Product } from "my-types";
import { getAllProducts, deleteProduct } from "../api/ProductAPI";
import { getAllDonations } from "../api/DonationAPI"
import FilterBar from "../components/FilterBar";
import ProductTable from "../components/ProductTable";
import './ProductPage.css'

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    Promise.all([
      getAllProducts(),
      getAllDonations(),
    ]).then(([productData, donationData]) => {
      if (productData) {
        setProducts(productData);
        setFilteredProducts(productData);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }

      if (donationData) {
        setDonations(donationData);
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
        <p className="title">PRODUCTOS</p>
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
          donations={donations}
          onDelete={handleDelete}
        />
      </nav>

    </>
  );
};
      

export default ProductPage;
