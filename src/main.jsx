/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

import ShowProductList from './component/Product/ShowProductList.jsx'
import CreateProduct from './component/Product/CreateProduct.jsx'
import ShowProductDetails from './component/Product/ShowProductDetails.jsx'
import UpdateProductInfo from './component/Product/UpdateProductInfo.jsx'

const router = createBrowserRouter([
  {path: '/', element: <ShowProductList />},
  {path: '/create-product', element: <CreateProduct />},
  {path: '/:id', element: <ShowProductDetails />},
  {path: '/update/:id', element: <UpdateProductInfo />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
