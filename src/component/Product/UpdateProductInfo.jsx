/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import Layout from '../layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProductInfo = () => {
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const URL = `https://inventory-system-orpin.vercel.app/api/products/`;
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const image = watch('imageUrl');

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('description', data.description);
        formData.append('imageUrl', data.imageUrl[0]);
        formData.append('price', data.price);

        try {
            await axios.put(`${URL}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Successfully updated");
            reset({});
            navigate('/');
        } catch (error) {
            console.error('There was an error uploading the file!', error);
            setError('Unable to add product. Please try again.');
        }
    };

    useEffect(() => {
        if (image && image[0]) {
            const file = image[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [image]);
    
    useEffect(() => {
        axios.get(`${URL}/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch(err => console.log("Error fetch data"))
    },[id])

    return ( 
        <Layout>
            <div className="container">
                <div className="row">
                    <h4 className="my-4 pb-2 border-bottom">
                        Create New Product
                    </h4>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {product ? (
                             <form onSubmit={handleSubmit(onSubmit)}> 
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="productName" defaultValue={product.productName} {...register('productName')} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" defaultValue={product.description} {...register('description')}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imageUrl" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="imageUrl" {...register('imageUrl')} />
                                </div>
                                {preview && (
                                    <div>
                                        <img src={preview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />
                                        <p></p>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" defaultValue={product.price} {...register('price')}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Update Product</button>
                            </form>
                        ) : (
                            <p>There is No Product</p>
                        )}
                       
                    </div>
                </div>
            </div>
        </Layout>
    )
}
 
export default UpdateProductInfo;