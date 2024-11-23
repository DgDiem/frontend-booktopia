import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import axios from "axios";
import ProductItem from "../../components/Product/ProductItem";
import { URL_API } from "../../constants/constants";

const ProductForYou = () => {
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected category
  const [products, setProducts] = useState([]);

  // Fetch list of categories
  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        const response = await axios.get(`${URL_API}/category`);
        const categories = response.data;
        setListCategory(categories);

        // Set default category (e.g., Văn học) if it exists
        const defaultCategory = categories.find((cat) => cat.name === "Văn học");
        if (defaultCategory) {
          setSelectedCategory(defaultCategory._id);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchListCategory();
  }, []);

  // Fetch products when a category is selected
  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(`${URL_API}/products/categoryId/${selectedCategory}`);
          const data = response.data;
          setProducts(data);
        } catch (error) {
          console.log("Error fetching products:", error);
        }
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id); // Set the selected category ID
  };

  return (
    <div className="py-5">
      <div className="container">
        <Title children="Dành cho bạn" />
        <div className="py-5 max-lg:py-5 max-md:py-5 max-xl:py-5">
          <div className="p-6 rounded-lg mb-5 max-lg:mb-0 max-md:hidden max-xl:hidden">
            <ul className="flex items-center justify-center gap-8 max-lg:grid max-lg:grid-cols-3 max-lg:gap-5">
              {listCategory.map((item) => (
                <li key={item._id}>
                  <a
                    href="#"
                    className={`menu-link ${
                      selectedCategory === item._id ? "menu-link-active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      handleCategoryClick(item._id);
                    }}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2">
            {products.slice(0, 5).map((item) => (
              <ProductItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForYou;
