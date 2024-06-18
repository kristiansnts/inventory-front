/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const ShowProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [url, setUrl] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const URL = import.meta.env.VITE_URL;
    const key = import.meta.env.VITE_PHOTOSTOCK_API;
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL}/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
                axios.get(`https://pixabay.com/api/`, {
                    params: {
                        key: key,
                        q: res.data.productName
                    }
                })
                .then((res) => {
                    setUrl(res.data.hits[0].webformatURL)
                })
                .catch(err => {
                    console.log("Error in request")
                })
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const onDelete = () => {
        const con = confirm("Are you sure to delete this product?")
        if(con) {
            axios.delete(`${URL}/${id}`)
            .then((res) => {
                navigate('/')
            })
            .catch(err => {
                console.log("Error on delete Product")
            })
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    {product ? (
                        <>
                            <div className="col-md-6">
                                <h4 className="my-4 pb-2 border-bottom">
                                    {product.productName}
                                </h4>
                            </div>
                            <img src={product.imageUrl ? product.imageUrl : url} alt={product.productName} style={{ width: '100%' }} />
                            {product.category ? (
                                <p className="mt-1">{product.category.categoryName}</p>
                            ) : (
                                <p></p>
                            )}
                            <span className="h4">${product.price}</span>
                            <p className="mt-2">Description: </p>
                            <p>{product.description}</p>
                            <a href={`/update/${id}`} className="btn my-2 btn-secondary">Update Product</a>
                            <a onClick={onDelete} className="btn btn-danger">Delete Product</a>
                        </>
                    ) : (
                        <p>Product not found</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ShowProductDetails;
