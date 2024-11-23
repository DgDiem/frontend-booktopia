import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Cookies from "js-cookie"; //cài thư viện để lấy cookie
import { CiHeart } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import "../../index.css";
import CommentList from "../../components/Comment/CommentList";
import { add } from "../../redux/slices/favouritesSlide";
import Title from "../../components/Title/Title";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ProductItem from "../../components/Product/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartslide";
import LightGallery from "lightgallery/react";
import "react-image-gallery/styles/css/image-gallery.css";
import { ToastContainer, toast } from "react-toastify";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { showSwalFireSuccess } from "../../helpers/helpers";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { URL_API } from "../../constants/constants";
import ReviewList from "../../components/Review/ReviewList";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [inforUser, setInforUser] = useState({});
  const { id } = useParams();
  const [productDetailData, setProductDetailData] = useState(null);
  const [commentDetailData, setCommentDetailData] = useState(null);
  const [reviewDetailData, setReviewDetailData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityDetail, setQuantityDetail] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contentComment, setContentComment] = useState("");
  const [contentReview, setContentReview] = useState("");
  const [rating, setRating] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isReviewed, setIsReviewed] = useState(false);
  const favouriteItems = useSelector((state) => state.favourite?.items) || [];

  const userId = inforUser?._id;
  const { id: productId } = useParams();
  const cartItems = useSelector((state) => state.cart?.items) || [];  // Lấy cartItems ngoài hàm
  useEffect(() => {}, [favouriteItems]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${URL_API}/products/${id}`);
        setProductDetailData(response.data);
      } catch (error) {
        setError("Unable to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const fetchOrderStatus = async (userId, productId) => {
    try {
      const response = await fetch(
        `${URL_API}/orders/status/${userId}/${productId}`
      );
      const data = await response.json();
      console.log("Trạng thái đơn hàng:", data);

      if (data.product?.status === "Chưa đánh giá") {
        setOrderStatus("Giao thành công");
      } else if (data.product?.status === "Đã đánh giá") {
        setOrderStatus("Đã đánh giá");
      } else {
        setOrderStatus("Không tìm thấy");
      }
    } catch (error) {
      console.error("Lỗi khi lấy trạng thái:", error);
      setOrderStatus("Không tìm thấy");
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        if (userData?.user?._id) {
          setInforUser(userData.user);
        } else {
          console.error("Không tìm thấy userId trong cookie");
        }
      } catch (err) {
        console.error("Lỗi khi parse cookie:", err);
      }
    } else {
      console.log("Cookie không tồn tại");
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      console.warn("userId chưa được xác định.");
    } else if (id) {
      console.log("userId đã xác định:", userId);
      fetchOrderStatus(userId, id); // Chỉ gọi khi đủ điều kiện
    }
  }, [userId, id]);

  // show bình luận
  const fetchComment = async () => {
    try {
      const response = await axios.get(`${URL_API}/comment/product/${id}`);
      setCommentDetailData(response.data);
    } catch (error) {
      setError("Unable to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // show đánh giá
  const fetchReview = async () => {
    try {
      const response = await axios.get(`${URL_API}/review/product/${id}`);
      console.log("Review data:", response.data); // Kiểm tra dữ liệu review nhận được từ API
      if (response.data === null) {
        setReviewDetailData([]); // Nếu API trả về null, gán dữ liệu rỗng
      } else {
        setReviewDetailData(response.data); // Lưu dữ liệu vào state nếu có
      }
    } catch (error) {
      setError("Unable to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("Product ID:", id);
  //   fetchReview();
  // }, [id]);

  // lát nữa show cái fetchReview ra đây vào useEffect

  useEffect(() => {
    fetchReview();
    fetchComment();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = (item) => {
    const itemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
  
    if (itemInCart) {
      const currentQuantity = itemInCart.quantity;
      if (currentQuantity >= item.quantity) {
        showSwalFireError(`Sản phẩm này chỉ còn ${item.quantity} sản phẩm trong kho.`);
        return;
      } else {
        showSwalFireSuccess();
        dispatch(addToCart({ item, quantity: quantityDetail }));
      }
    } else {
      showSwalFireSuccess();
      dispatch(addToCart({ item: productDetailData, quantity: quantityDetail }));
    }
  };
  
  const handleIncreaseQuantity = () => {
    const newQuantity = quantityDetail + 1;
    if (newQuantity <= quantity) { // Kiểm tra không vượt quá số lượng trong kho
      setQuantityDetail(newQuantity);
    }
  };
  
  const handleDecreaseQuantity = () => {
    const newQuantity = Math.max(quantityDetail - 1, 1); // Đảm bảo số lượng không nhỏ hơn 1
    setQuantityDetail(newQuantity);
  };
  
  const handleBuyNow = (item) => {
    const itemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
  
    if (itemInCart) {
      const currentQuantity = itemInCart.quantity;
      if (currentQuantity >= item.quantity) {
        showSwalFireError(`Sản phẩm này chỉ còn ${item.quantity} sản phẩm trong kho.`);
        return;
      } else {
        showSwalFireSuccess();
        dispatch(addToCart({ item, quantity: quantityDetail }));
      }
    } else {
      showSwalFireSuccess();
      dispatch(addToCart({ item: productDetailData, quantity: quantityDetail }));
    }
  
    navigate("/cart");
  };
  const showSwalFireError = (message) => {
    Swal.fire({
      title: 'Không thể thêm',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  };
  if (!productDetailData) {
    return <div>Product details not available.</div>;
  }

  const {
    name,
    image1,
    image2,
    image3,
    image4,
    price1,
    price2,
    sale,
    description,
    quantity,
    publish,
    author,
    category,
  } = productDetailData;

  // lấy thông tin user
  const handleConment = async () => {
    if (!inforUser) {
      toast.error("Vui lòng đăng nhập để bình luận");
      return;
    }
    if (!contentComment) {
      toast.error("Vui lòng nhập nội dung để bình luận");
      return;
    }
    const data = {
      content: contentComment,
      user: inforUser?._id,
      book: id,
    };
    await axios.post(`${URL_API}/comment`, data);
    toast.success("Bình luận thành công");
    setContentComment("");
    fetchComment();
  };

  const handleReview = async () => {
    const reviewStatus = localStorage.getItem(`reviewed-${id}`);
    if (reviewStatus === "true") {
      toast.info("Bạn đã đánh giá sản phẩm này rồi.");
      setIsReviewed(true); // Ẩn form khi đã đánh giá
      return;
    }

    if (!inforUser) {
      toast.error("Vui lòng đăng nhập và mua hàng để đánh giá");
      return;
    }

    if (!contentReview) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    if (!rating) {
      toast.error("Vui lòng chọn đánh giá sao");
      return;
    }

    if (orderStatus !== "Giao thành công") {
      toast.error(
        "Bạn chỉ có thể đánh giá sản phẩm khi đơn hàng đã được giao thành công."
      );
      return;
    }

    const data = {
      content: contentReview,
      user: inforUser?._id,
      book: id,
      rating: rating,
    };

    try {
      // Gửi đánh giá
      const response = await axios.post(`${URL_API}/review`, data);

      if (response.status === 201) {
        toast.success("Đánh giá thành công");
        setOrderStatus("Đã đánh giá");
        setIsReviewed(true);
        localStorage.setItem(`reviewed-${id}`, "true");
        const updateResponse = await fetch(`${URL_API}/order/${orderId}`, {
          method: "PUT",
          body: JSON.stringify({ status: "Đã đánh giá" }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (updateResponse.ok) {
          toast.success("Trạng thái đơn hàng đã được cập nhật.");
        } else {
          const errorData = await updateResponse.json();
          console.error("Lỗi khi cập nhật trạng thái:", errorData);
        }

        setContentReview("");
        setRating(0);
        fetchReview();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
      console.error("Error posting review:", error);
    }
  };

  // xóa bình luận
  const handleDeleteComment = async (id) => {
    console.log(id);

    await axios.delete(`${URL_API}/comment/${id}`);
    toast.success("Xóa thành công");
    fetchComment();
  };

  // xóa đánh giá

  const handleDeleteReview = async (id) => {
    console.log(id);

    await axios.delete(`${URL_API}/review/${id}`);
    toast.success("Xóa thành công");
    fetchReview();
  };

  const handleAddToFavourite = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Thêm sản phẩm yêu thích thành công",
      showConfirmButton: false,
      timer: 1000,
    });
    dispatch(add({ item: productDetailData, quantity: 1 }));
  };

  return (
    <div className="py-10">
      <ToastContainer autoClose={1000} />
      <div className="container">
        <nav>
          <Link to="/" className="text-gray-500">
            Sản phẩm
          </Link>
          <span className="text-gray-500"> / </span>
          <Link to="#" className="text-mainDark font-semibold leading-normal">
            {name}
          </Link>
        </nav>
        <div className="flex justify-between py-10 gap-10 max-md:flex-col max-lg:gap-2">
          <div className="w-[65%] max-xl:w-3/5 max-md:w-full">
            <div className="flex gap-10 items-center">
              <div className="max-w-[130px] w-full max-xl:hidden">
                <div className="flex flex-col gap-10">
                  {[image1, image2, image3, image4].map((img, index) =>
                    img ? (
                      <div key={index} className="w-full">
                        <LightGallery
                          plugins={[lgZoom, lgThumbnail]}
                          mode="lg-fade"
                          thumbnail={true}
                          elementClassNames={"gallery"}
                        >
                          <a href={`${URL_API}/images/${img}`}>
                            <img
                              src={`${URL_API}/images/${img}`}
                              alt={`product-detail-img-${index}`}
                              className="w-full h-[120px]"
                            />
                          </a>
                          {/* Đoạn mã này lặp qua các ảnh còn lại (image2, image3, image4) và nếu có
                          ảnh tồn tại (img ? ... : null), nó sẽ tạo các liên kết tới các ảnh này. */}
                          {[image2, image3, image4].map((img, index) =>
                            img ? (
                              <a key={index} href={`${URL_API}/images/${img}`}>
                                <img
                                  src={`${URL_API}/images/${img}`}
                                  alt={`product-detail-img-${index}`}
                                  className="hidden"
                                />
                              </a>
                            ) : null
                          )}
                        </LightGallery>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
              {image1 && (
                <div className="w-full">
                  <LightGallery
                    plugins={[lgZoom, lgThumbnail]}
                    mode="lg-fade"
                    elementClassNames={"gallery"}
                    thumbnail={true}
                  >
                    <a href={`${URL_API}/images/${image1}`}>
                      <img
                        src={`${URL_API}/images/${image1}`}
                        alt="product-detail-img-main"
                        className="w-full h-[500px] object-cover max-md:h-[400px]"
                      />
                    </a>
                    {[image2, image3, image4].map((img, index) =>
                      img ? (
                        <a key={index} href={`${URL_API}/images/${img}`}>
                          <img
                            src={`${URL_API}/images/${img}`}
                            alt={`product-detail-img-${index}`}
                            className="hidden"
                          />
                        </a>
                      ) : null
                    )}
                  </LightGallery>
                </div>
              )}
            </div>
          </div>
          <div className="w-[45%] max-md:w-full">
            <PageTitle
              title={name}
              className="mb-5 max-xl:text-xl text-2xl leading-8"
            />
            <div className="flex items-center gap-8 max-md:gap-2 max-lg:gap-2">
              <div className="text-red">
                {price1.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="flex items-center gap-10 max-lg:gap-4">
                <div className="line-through">
                  {price2.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="w-[1px] h-4 bg-text"></div>
                <div className="text-gray-500">{sale} Đã bán</div>
              </div>
            </div>
            <div className="flex justify-between mt-8 gap-5 max-md:hidden max-lg:gap-3">
              <div className="w-full flex flex-col gap-3 text-text">
                <div>
                  Tác giả:{" "}
                  <span className="text-mainDark leading-normal">
                    {author.authorName}
                  </span>
                </div>
                <div>
                  Nhà xuất bản:{" "}
                  <span className="text-mainDark leading-normal">
                    {publish.publishName}
                  </span>
                </div>
                <div>
                  Danh mục:{" "}
                  <span className="text-mainDark leading-normal">
                    {category.categoryName}
                  </span>
                </div>
                <div>
                  Kho:{" "}
                  {quantity === 0 ? (
                    <span className="text-red">Hết hàng</span>
                  ) : (
                    quantity
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col gap-6">
                <div>Năm xuất bản: 2023</div>
                <div>Ngôn ngữ: Tiếng Việt</div>
                <div>Số trang: 280</div>
                <div>Hình thức: Bìa mềm</div>
              </div>
            </div>
            <div className="mt-10 text-text font-normal max-sm:mt-3 max-sm:flex max-sm:items-center max-sm:gap-2 max-sm:leading-[34px]">
              <div className="mt-5">Số lượng</div>
              <div className="flex items-center mt-5">
                <div className="py-2 px-5 flex items-center border border-gray-300 rounded-xl max-sm:py-1 max-sm:px-3">
                  <button className="px-3 py-1 max-sm:px-2">
                    <FaMinus onClick={handleDecreaseQuantity} />
                  </button>
                  <input
                    type="text"
                    className="quantity-input w-12 text-center border-0 focus:ring-0"
                    value={quantityDetail}
                    readOnly
                  />
                  <button className="px-3 py-1">
                    <FaPlus
                      onClick={handleIncreaseQuantity}
                      disabled={quantityDetail >= quantity}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-2 ml-4 text-text font-normal">
                  <CiHeart
                    className="w-8 h-8 cursor-pointer"
                    onClick={handleAddToFavourite}
                  />
                  Yêu thích
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 mt-10">
              {quantity === 0 || quantityDetail > quantity ? (
                <div className="text-red font-bold mt-3">Không đủ số lượng</div>
              ) : (
                <>
                  <Button
                    onClick={() => handleBuyNow(productDetailData)}
                    className="rounded-md w-full"
                  >
                    Mua ngay
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(productDetailData)}
                    className="rounded-md button-add w-full bg-white flex items-center justify-center gap-2"
                  >
                    <HiOutlineShoppingBag />
                    Thêm vào giỏ hàng
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <h3
            className={`text-[18px] font-semibold cursor-pointer ${
              activeTab === "info" ? "text-text" : "text-grayText"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Thông tin sản phẩm
          </h3>
          <h3
            className={`text-[18px] font-semibold cursor-pointer ${
              activeTab === "comments" ? "text-text" : "text-grayText"
            }`}
            onClick={() => setActiveTab("comments")}
          >
            Bình luận
          </h3>
          <h3
            className={`text-[18px] font-semibold cursor-pointer ${
              activeTab === "reviews" ? "text-text" : "text-grayText"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá
          </h3>
        </div>
        {activeTab === "info" && (
          <div className="mt-7">
            <p className="text-text font-normal leading-normal">
              {description}
            </p>
          </div>
        )}
        {activeTab === "comments" && (
          <div className="mt-10">
            <PageTitle title={`${commentDetailData.length} lượt bình luận`} />

            <CommentList
              handleDeleteComment={handleDeleteComment}
              commentDetailData={commentDetailData}
            />
            <form action="" className="mt-7">
              <div className="flex justify-between items-center">
                <div className="w-[100%] flex gap-2 ">
                  <input
                    onChange={(e) => setContentComment(e.target.value)}
                    type="text"
                    placeholder="Hãy nhận xét gì đó ...."
                    className="input input-bordered w-full "
                  />
                  <Button
                    className="text-nowrap"
                    onClick={() => handleConment()}
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="mt-10">
            <PageTitle title={`${reviewDetailData.length} lượt đánh giá`} />
            <ReviewList
              handleDeleteReview={handleDeleteReview}
              reviewDetailData={reviewDetailData || []}
            />

            {!isReviewed && orderStatus === "Giao thành công" ? (
              <form action="" className="mt-7">
                {/* Form đánh giá */}
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      onClick={() => setRating(value)}
                      className={`cursor-pointer ${
                        rating >= value ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="w-[100%] flex gap-2 mt-3">
                  <input
                    onChange={(e) => setContentReview(e.target.value)}
                    type="text"
                    placeholder="Hãy nhập đánh giá của bạn..."
                    className="input input-bordered w-full"
                  />
                  <Button
                    className="text-nowrap"
                    onClick={() => handleReview()}
                  >
                    Gửi
                  </Button>
                </div>
              </form>
            ) : orderStatus === "Đã đánh giá" ? (
              <p className="text-gray-500 mt-5">
                Bạn đã đánh giá sản phẩm này.
              </p>
            ) : (
              <p className="text-gray-500 mt-5">
                Bạn chỉ có thể đánh giá sản phẩm khi đơn hàng đã được giao thành
                công.
              </p>
            )}
          </div>
        )}

        <div>
          <ProductRelated id={id} />
        </div>
      </div>
    </div>
  );
};

const ProductRelated = ({ id }) => {
  const [productListRelated, setProductListRelated] = useState(null);

  useEffect(() => {
    const fetchProductListRelated = async () => {
      try {
        const response = await axios.get(
          `${URL_API}/products/related/${id}/related`
        );
        setProductListRelated(response.data);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };
    fetchProductListRelated();
  }, [id]);

  if (!productListRelated) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-10">
      <Title children="Sản phẩm liên quan" className="text-mainDark" />
      <div className="grid grid-cols-5 max-lg:grid-cols-2 max-md:grid-cols-2 gap-10 mt-5">
        {productListRelated.map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
