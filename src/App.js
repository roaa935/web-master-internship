import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails"; // Create this component

const App = () => {
    const [products, setProducts] = useState([]);
    const [fakestoreProducts, setFakestoreProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch products from dummyjson.com
        axios.get("https://dummyjson.com/products")
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => console.error("Error fetching products:", error));

        // Fetch products from fakestoreapi.com
        axios.get("https://fakestoreapi.com/products")
            .then(response => {
                setFakestoreProducts(response.data);
            })
            .catch(error => console.error("Error fetching fakestore products:", error));
    }, []);

    // Define category mappings
    const categoryMapping = {
        "Home Essentials": ["furniture"],
        "Women": ["beauty"],
        "Electronics": ["furniture"],
        "Fragrances": ["fragrances"],
        "Skincare": ["fragrances"],
        "Groceries": ["groceries"],
        "Men's Fashion": ["fragrances"],
        "Accessories": ["beauty"]
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Categorize products
    const categorizedProducts = Object.keys(categoryMapping).map(category => ({
        category,
        items: filteredProducts.filter(product =>
            categoryMapping[category].includes(product.category)
        ).slice(0, 4) // Limit to 4 products per category
    }));

    // Filter fakestore products for Men's Clothing, Jewelry, Electronics, and Women's Clothing
    const mensClothing = fakestoreProducts.filter(product => product.category === "men's clothing").slice(0, 4);
    const womensClothing = fakestoreProducts.filter(product => product.category === "women's clothing").slice(0, 4);
    const jewelry = fakestoreProducts.filter(product => product.category === "jewelery").slice(0, 4);
    const electronics = fakestoreProducts.filter(product => product.category === "electronics").slice(0, 4);

    // Combine all categories into one array for the new grid
    const newCategories = [
        { category: "Men's Clothing", items: mensClothing },
        { category: "Women's Clothing", items: womensClothing },
        { category: "Jewelry", items: jewelry },
        { category: "Electronics", items: electronics }
    ];

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage
                    categorizedProducts={categorizedProducts}
                    newCategories={newCategories}
                    mensClothing={mensClothing}
                    womensClothing={womensClothing}
                    electronics={electronics}
                    jewelry={jewelry}
                />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

const HomePage = ({ categorizedProducts, newCategories, mensClothing, womensClothing, electronics, jewelry }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`); // Navigate to the product details page
    };

    return (
        <div>
            {/* Hero Section */}
            <div
                className="position-relative"
                style={{
                    height: "100vh",
                    backgroundImage: `url('https://s3-alpha-sig.figma.com/img/f2fb/e9b8/4327c8c1db6cabbeef327465bbb07fca?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BaQ8euOTOJiF-CqdMsOjqjKp~Ej5BxZ2FqDxVkAeWUPHLkcYHw3G~ZZzqquAELdK2JlinhsNpnw28Yr-s6Ti99XeSmPZn8Da6HupbsgVbRxgQpbN6ODvbcavmWJz4FioZHO8bHkY3VlgPnrsxmoenj3GLC-h4aQ0uPImoVryXHkAbtm-VZ56Q2lZKEzZfgB7UkVAtzCYf~DZzruoDCYQ41QoSfklcINqq1EKbehrE7mLIHdAQd-yPG1d6wW~xz3Aj~Iap2DRcRLrS6wYhUaHWVi0gglbuKN7mgOxYp5JW~r6SsRfT2zv-QH2vMf-F9PJkqwmBsGbacDXLSDFAjPFNQ__')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="position-absolute top-50 start-50 translate-middle text-center">
                    <h2 className="text-white">Product Store</h2>
                </div>
            </div>

            {/* 2-Row, 4-Column Grid for Categories */}
            <div className="container mt-n5 position-relative z-1">
                <div className="row g-4">
                    {categorizedProducts.map(({ category, items }) => (
                        <div key={category} className="col-md-3">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title text-center fs-6">{category}</h3>
                                    <div className="row g-2">
                                        {items.map(product => (
                                            <div key={product.id} className="col-6 text-center" onClick={() => handleProductClick(product.id)}>
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    className="img-fluid rounded"
                                                    style={{ height: "80px", objectFit: "cover" }}
                                                />
                                                <p className="mt-2 fs-6">
                                                    {product.title.length > 12 ? product.title.substring(0, 12) + '...' : product.title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Existing Section for Men's & Women's Clothing */}
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h3 className="text-center mb-4">Men's & Women's Clothing</h3>
                        <div className="d-flex overflow-auto gap-3 p-2">
                            {[...mensClothing, ...womensClothing].map(product => (
                                <div key={product.id} className="card shadow-sm" style={{ width: "150px" }} onClick={() => handleProductClick(product.id)}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="card-img-top"
                                        style={{ height: "100px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <p className="card-text fs-6">
                                            {product.title.length > 15 ? product.title.substring(0, 12) + '...' : product.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* New Section for Men's Clothing, Jewelry, Electronics, and Women's Clothing */}
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h3 className="text-center mb-4">Featured Categories</h3>
                        <div className="row g-4">
                            {newCategories.map(({ category, items }) => (
                                <div key={category} className="col-md-3">
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body">
                                            <h3 className="card-title text-center fs-6">{category}</h3>
                                            <div className="row g-2">
                                                {items.map(product => (
                                                    <div key={product.id} className="col-6 text-center" onClick={() => handleProductClick(product.id)}>
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="img-fluid rounded"
                                                            style={{ height: "80px", objectFit: "cover" }}
                                                        />
                                                        <p className="mt-2 fs-6">
                                                            {product.title.length > 12 ? product.title.substring(0, 12) + '...' : product.title}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;