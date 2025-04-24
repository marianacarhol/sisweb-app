import { useEffect, useState } from "react";
import { Product } from "my-types";
import { getAllProducts, deleteProduct } from "../api/ProductAPI";
import FilterBar from "../components/FilterBar";
import ProductTable from "../components/ProductTable";
import SimpleBarChart from "../components/SimpleBarChart";
import SimpleAreaChart from "../components/SimpleAreaChart";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      } else {
        setProducts([]);
        setFilteredProducts([]);
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
      <nav className="panel">
        <p className="panel-heading">Productos</p>

        <FilterBar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          searchName={searchName}
          setSearchName={setSearchName}
          handleFilter={handleFilter}
        />

        <div className="panel-block">
          <h2>Resultados</h2>
        </div>

        <ProductTable products={filteredProducts} onDelete={handleDelete} />
      </nav>
    </>
  );
};

export default ProductPage;
