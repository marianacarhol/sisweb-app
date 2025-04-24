<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Product } from "my-types";
import { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from "../api/ProductAPI";
import Example from "../components/SimpleBarChart.tsx";
import Example1 from "../components/SimpleAreaChart.tsx";
import { Link } from "react-router-dom";

interface Props {}

const ProductPage = (_props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    getAllProducts().then((data: any) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmado = confirm("¿Estás segura de eliminar este producto?");
    if (!confirmado) return;

    await deleteProduct(id);
    const productos = await getAllProducts();
    if (productos) {
      setProducts(productos);
      setFilteredProducts(productos);
=======
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
>>>>>>> ea0fe6cd87ad626b4455292a38a27dbd9e12534a
    }
  };

  const handleFilter = () => {
<<<<<<< HEAD
    if (selectedType === "") {
      setFilteredProducts(products);
    } else {
      const filtrados = products.filter(
        (p) => p.productTypeId.toString() === selectedType
      );
      setFilteredProducts(filtrados);
    }
  };
=======
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
>>>>>>> ea0fe6cd87ad626b4455292a38a27dbd9e12534a

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Productos</p>

<<<<<<< HEAD
        <div className="panel-block">
          <div className="field is-grouped">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" />
              </div>
            </div>

            <div className="field">
              <label className="label">Tipo</label>
              <div className="control">
                <div className="select">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field is-align-content-flex-end mb-3">
              <div className="control">
                <button className="button is-link is-outlined" onClick={handleFilter}>
                  Filtrar
                </button>
              </div>
            </div>

            <div className="field is-align-content-flex-end mb-3">
              <div className="control">
                <Link to="/addProduct">
                  <button className="button is-link">Añadir</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
=======
        <FilterBar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          searchName={searchName}
          setSearchName={setSearchName}
          handleFilter={handleFilter}
        />
>>>>>>> ea0fe6cd87ad626b4455292a38a27dbd9e12534a

        <div className="panel-block">
          <h2>Resultados</h2>
        </div>

<<<<<<< HEAD
        <div className="panel-block">
          <table className="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Tipo de producto</th>
                <th>Fecha de actualización</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>
                    <a className="button is-ghost p-0">{product.nombre}</a>
                  </td>
                  <td>{product.cantidad}</td>
                  <td>{product.productTypeId}</td>
                  <td>
                    {new Date(product.updatedAt).toLocaleString("es-MX", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(product.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </nav>

      <div className="pt-6">
        <Example data={products} />
      </div>
      <div className="pt-6">
        <Example1 data={products} />
=======
        <ProductTable products={filteredProducts} onDelete={handleDelete} />
      </nav>

      <div className="pt-6">
        <SimpleBarChart data={products} />
      </div>

      <div className="pt-6">
        <SimpleAreaChart data={products} />
>>>>>>> ea0fe6cd87ad626b4455292a38a27dbd9e12534a
      </div>
    </>
  );
};

export default ProductPage;
