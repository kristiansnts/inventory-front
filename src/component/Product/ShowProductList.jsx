/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import '../../App.css';
import axios from "axios";
import Layout from "../layout/Layout";
import ProductCard from "./ProductCard";

const ShowProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [value, setValue] = useState('');
    const URL = import.meta.env.VITE_URL;
    const token = import.meta.env.VITE_VERCEL_TOKEN;

    useEffect(() => {
        axios.get(`${URL}`)
            .then((res) => {
                setProducts(res.data);
                setFilteredProducts(res.data);
                console.log(res)  // Initialize filteredProducts with all products
            })
            .catch(err => {
                console.log("Error in products")})
    }, []);

    const onChange = (value) => {
        setValue(value);
        let searchProduct = products.filter(entry => {
            return entry.productName.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredProducts(searchProduct);
    };

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <div className="input-group mb-3 mt-5">
                            <input
                                type="text"
                                onChange={(e) => onChange(e.currentTarget.value)}
                                className="form-control"
                                placeholder="Find Product: ex. Laptop Acer O21L"
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="d-inline-flex justify-content-between">
                            <span className="h3">Product List</span>
                            <a href="/create-product" className="btn btn-primary">Add Product</a>
                        </div>
                        <hr className="mt-2" />
                        {filteredProducts.length > 0 ? filteredProducts.map((product, k) => (
                            <div className="col-12 col-md-4" key={k}>
                                <ProductCard
                                    productName={product.productName}
                                    description={product.description}
                                    price={product.price}
                                    id={product._id}
                                    image={product.imageUrl}
                                />
                            </div>
                        )) : <div>Product not found</div>}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ShowProductList;
