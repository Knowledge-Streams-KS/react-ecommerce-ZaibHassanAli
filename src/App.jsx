import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [setSortBy] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (type) => {
    let sortedProducts = [...products];
    switch (type) {
      case "price_asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "title_asc":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setSortBy(type);
    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={() => handleSort("price_asc")}>
        Sort by Price Ascending
      </button>
      <button onClick={() => handleSort("price_desc")}>
        Sort by Price Descending
      </button>
      <button onClick={() => handleSort("title_asc")}>
        Sort by Title Ascending
      </button>
      <button onClick={() => handleSort("title_desc")}>
        Sort by Title Descending
      </button>
      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>

            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
