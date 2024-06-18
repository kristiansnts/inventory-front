/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCard = ({ productName, description, price, id, image }) => {
    const [url, setUrl] = useState(null)

    const key = import.meta.env.VITE_PHOTOSTOCK_API

    useEffect(() => {
        axios.get(`https://pixabay.com/api/`, {
            params: {
                key: key,
                q: productName
            }
        })
        .then((res) => {
            setUrl(res.data.hits[0].webformatURL)
        })
        .catch(err => {
            console.log("Error in request")
        })
    },[])
    
    return ( 
        <div className="card mb-2">
            <img src={image ? image : url} className="card-img-top" alt={`${productName}`}/>
            <div className="card-body">
                <a href={`/${id}`} className="h5 card-title text-decoration-none text-primary font-weight-bold">{productName}</a>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <span className='h5'>${price}</span>
                </div>
            </div>
        </div>
     );
}
 
export default ProductCard;