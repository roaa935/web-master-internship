import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error("Error fetching product details:", error));
    }, [id]);

    if (!product) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col-md-5">
                    <img src={product.thumbnail} alt={product.title} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-7">
                    <h1 className="fw-bold">{product.title}</h1>
                    <div className="d-flex align-items-center mb-3">
                        <span className="text-warning fs-4">★★★★☆</span>
                        <span className="text-primary ms-2">12,345 ratings</span>
                    </div>
                    <hr />
                    <h2 className="fw-bold">${product.price} <span className="text-muted fs-6">(${(product.price * 1.2).toFixed(2)} with tax)</span></h2>
                    <p className="text-muted">Available at a lower price from other sellers.</p>
                    <h5 className="fw-bold">About this item</h5>
                    <p>{product.description}</p>
                    <button className="btn btn-warning me-2">Add to Cart</button>
                    <button className="btn btn-orange">Buy Now</button>
                </div>
            </div>
            <div className="bg-light p-4 rounded">
                <h4 className="fw-bold">Product Specifications</h4>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Stock:</strong> {product.stock} units available</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Rating:</strong> {product.rating} / 5</p>
                        <p><strong>Discount:</strong> {product.discountPercentage}%</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h4 className="fw-bold">Customer Reviews</h4>
                <div className="d-flex align-items-center mb-3">
                    <span className="text-warning fs-4">★★★★☆</span>
                    <span className="fs-5 ms-2">4 out of 5 stars</span>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Positive Reviews:</strong> 85%</p>
                        <p><strong>Negative Reviews:</strong> 15%</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Top Review:</strong> "Great product, highly recommended!"</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
