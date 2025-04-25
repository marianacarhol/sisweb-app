import { useEffect, useState } from "react";
import { Product } from "my-types";
import { getAllProducts, deleteProduct } from "../api/ProductAPI";
import { getAllDonations, deleteDonation } from "../api/DonationAPI"
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

  const handleDelete = async (productId: number) => {
    if (!confirm("¿Estás seguro que quieres eliminar este producto?")) return;
  
    const relatedDonation = donations.find(
      (donation) => donation.productId === productId
    );
  
    if (relatedDonation) {
      try {
        await deleteDonation(relatedDonation.id);
      } catch (err) {
        console.error("Error eliminando donación:", err);
        alert("Hubo un error al eliminar la donación.");
        return;
      }
    }

    await deleteProduct(productId);

    const [productData, donationData] = await Promise.all([
      getAllProducts(),
      getAllDonations(),
    ]);
  
    setProducts(productData || []);
    setFilteredProducts(productData || []);
    setDonations(donationData || []);
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
