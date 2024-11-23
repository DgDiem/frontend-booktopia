import React, { useEffect, useState } from "react";
import CategoryItem from "../../components/Category/CategoryItem";
import ProductList from "../../components/Product/ProductList";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./Menu.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductItem from "../../components/Product/ProductItem";
import { URL_API } from "../../constants/constants";

const Menu = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [sortOption, setSortOption] = useState("Mới nhất");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [publishId, setPublishId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const pagesPerGroup = 3;
  const [currentCategoryName, setCurrentCategoryName] = useState("Tất cả sản phẩm");
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = searchTerm.trim()
          ? `${URL_API}/products/search/${searchTerm.trim()}`
          : `${URL_API}/products`;
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  // Lấy danh mục, tác giả và nhà xuất bản
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL_API}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục", error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${URL_API}/authors`);
        setAuthors(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy tác giả", error);
      }
    };

    const fetchPublishers = async () => {
      try {
        const response = await axios.get(`${URL_API}/publishes`);
        setPublishers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy nhà xuất bản", error);
      }
    };

    fetchCategories();
    fetchAuthors();
    fetchPublishers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const limit = 12;
        let url = `${URL_API}/products/paginated/products?pageNumber=${
          currentPage - 1
        }&limit=${limit}`;

        if (categoryId) {
          url = `${URL_API}/products/paginated/categoryId/${categoryId}?pageNumber=${
            currentPage - 1
          }&limit=${limit}`;
        } else if (authorId) {
          url = `${URL_API}/products/paginated/authorId/${authorId}?pageNumber=${
            currentPage - 1
          }&limit=${limit}`;
        } else if (publishId) {
          url = `${URL_API}/products/paginated/publisherId/${publishId}?pageNumber=${
            currentPage - 1
          }&limit=${limit}`;
        }

        if (sortOption) {
          url += `&sortBy=${
            sortOption === "Mới nhất"
              ? "new"
              : sortOption === "Giá tăng dần"
              ? "priceAsc"
              : "priceDesc"
          }`;
        }

        const response = await axios.get(url);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, categoryId, authorId, publishId, currentPage, sortOption]);

  const categoryClick = (newCategoryId, categoryName) => {
    if (categoryId === newCategoryId) {
      return;
    }
    setCategoryId(newCategoryId);
    setAuthorId(null);
    setPublishId(null);
    setCurrentCategoryName(categoryName);
    setCurrentPage(1);
    setProducts([]);
    setSortOption("Mới nhất");
    setPageGroup(0);
    setCurrentPage(1);
  };

  //click tác giả
  const authorClick = (authorId, authorName) => {
    setAuthorId(authorId);
    setCategoryId(null);
    setPublishId(null);
    setCurrentCategoryName(authorName);
    setSortOption("Mới nhất");
    setPageGroup(0);
    setCurrentPage(1);
  };

  //click nhà xuất bản
  const publishClick = (publishId, publishName) => {
    setPublishId(publishId);
    setCategoryId(null);
    setAuthorId(null);
    setCurrentCategoryName(publishName);
    setSortOption("Mới nhất");
    setPageGroup(0);
    setCurrentPage(1);
  };

  const handleNextGroup = () => {
    const nextPageGroup = pageGroup + 1;
    const totalPages = Math.ceil(totalProducts / pagesPerGroup);
    const firstPageOfNextGroup = nextPageGroup * pagesPerGroup;
    if (nextPageGroup < totalPages && products.length > 0) {
      setPageGroup(nextPageGroup);
      setCurrentPage(firstPageOfNextGroup + 1);
    }
  };

  //khong cho chuyen trang khong có san pham
  const isNextGroupDisabled = () => {
    const nextPageGroup = pageGroup + 1;
    const totalPages = Math.ceil(totalProducts / pagesPerGroup);
    const firstPageOfNextGroup = nextPageGroup * pagesPerGroup;
    return nextPageGroup >= totalPages || firstPageOfNextGroup >= totalProducts;
  };

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const url = "http://localhost:3000/products/products/total";
        const response = await axios.get(url);

        if (response.status === 200) {
          setTotalProducts(response.data.total);
        }
      } catch (error) {
        console.error("Lỗi khi lấy tổng số sản phẩm:", error);
      }
    };

    fetchTotalProducts();
  }, []);
  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      const prevPageGroup = pageGroup - 1;
      setPageGroup(prevPageGroup); // Quay về nhóm trước
      setCurrentPage(prevPageGroup * pagesPerGroup + 1); // Đặt trang đầu của nhóm trước
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    const newGroup = Math.floor((pageNumber - 1) / pagesPerGroup);
    if (newGroup !== pageGroup) {
      setPageGroup(newGroup); // Đồng bộ nhóm nếu trang thay đổi vượt nhóm
    }
  };

  const renderPageButtons = () => {
    const startPage = pageGroup * pagesPerGroup + 1;
    const pages = Array.from({ length: pagesPerGroup }, (_, i) => startPage + i);

    return pages.map((page) => (
      <span
        key={page}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          currentPage === page ? "bg-mainDark text-white" : "border text-grayText"
        } text-[20px] font-semibold cursor-pointer`}
        onClick={() => handlePageClick(page)}>
        {page}
      </span>
    ));
  };

  return (
    <div className="mt-8">
      <div className="container mx-auto">
        <nav>
          <a href="#" className="text-gray-500">
            Trang chủ
          </a>
          <span className="text-gray-500"> / </span>
          <a href="#" className="text-mainDark font-semibold leading-normal">
            Sản phẩm
          </a>
        </nav>
        <div className="py-8 max-lg:py-4">
          <div className="flex justify-between gap-5 mt-12 max-lg:mt-4">
            <div className="max-w-[275px] w-full max-lg:hidden">
              <div className="w-full border rounded-[30px] py-14 px-12">
                <div className="flex flex-col gap-9">
                  <CategoryItem
                    title="Danh mục"
                    items={categories}
                    onCategoryClick={categoryClick}
                  />
                  <CategoryItem title="Tác giả" items={authors} onAuthorClick={authorClick} />
                  <CategoryItem
                    title="Nhà xuất bản"
                    items={publishers}
                    onPublishClick={publishClick}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <PageTitle title={currentCategoryName || "Tất cả sản phẩm"} />

                <div className="flex items-center gap-4">
                  <select
                    className="select select-bordered w-full max-w-xs custom-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}>
                    <option disabled value="">
                      Sắp xếp theo:
                    </option>
                    <option value="Mới nhất">Mới nhất</option>
                    <option value="Giá tăng dần">Giá tăng dần</option>
                    <option value="Giá giảm dần">Giá giảm dần</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center">Đang tải sản phẩm...</div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {products.map((item) => (
                    <ProductItem key={item._id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Không có sản phẩm nào trong danh mục này.
                </div>
              )}
              <div className="flex items-center justify-center gap-5 mt-6">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center border text-grayText text-[20px] font-semibold hover:bg-mainDark hover:text-white cursor-pointer"
                  onClick={handlePrevGroup}>
                  <FaLongArrowAltLeft />
                </span>

                {renderPageButtons()}

                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center border text-grayText text-[20px] font-semibold ${
                    isNextGroupDisabled()
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-mainDark hover:text-white cursor-pointer"
                  }`}
                  onClick={isNextGroupDisabled() ? null : handleNextGroup} // Ngăn chặn sự kiện click nếu nút bị vô hiệu hóa
                >
                  <FaLongArrowAltRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
