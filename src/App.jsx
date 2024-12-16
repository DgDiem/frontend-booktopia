import { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Main from "./layouts/Main";
import About from "./pages/About/About";
import Menu from "./pages/Menu/Menu";
import Contact from "./pages/Contact/Contact";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Profile from "./pages/Profile/Profile";
import MyOrders from "./pages/MyOrders/MyOrders";
import Favorite from "./pages/Favorite/Favorite";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";

import AddProduct from "./pages/Admin/AddProduct/AddProduct";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import ManageProduct from "./pages/Admin/ManageProduct/ManageProduct";
import ManageCategory from "./pages/Admin/ManageCategory/ManageCategory";
import AddCategory from "./pages/Admin/AddCategory/AddCategory";
import EditCategory from "./pages/Admin/EditCategory/EditCategory";
import ManageUser from "./pages/Admin/ManageUser/ManageUser";
import ManageBlog from "./pages/Admin/ManageBlog/ManageBlog";
import AddBlog from "./pages/Admin/AddBlog/AddBlog";
import ManageAuthor from "./pages/Admin/ManageAuthor/ManageAuthor";
import AddAuthor from "./pages/Admin/AddAuthor/AddAuthor";
import ManagePublishes from "./pages/Admin/ManagePublishes/ManagePublishes";
import AddPublishes from "./pages/Admin/AddPublishes/AddPublishes";
import EditBlog from "./pages/Admin/EditBlog/EditBlog";
import ManageOrder from "./pages/Admin/ManageOrder/ManageOrder";
import DashBoard from "./pages/Admin/Dashboard/DashBoard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MyOrderDetail from "./pages/MyOrderDetail/MyOrderDetail";
import PurchaseHistory from "./pages/Admin/PurchaseHistory/PurchaseHistory";
import DetailOrder from "./pages/Admin/DetailOrder/DetailOrder";
import ManageVoucher from "./pages/Admin/ManageVoucher/ManageVoucher";
import AddVoucher from "./pages/Admin/AddVoucher/AddVoucher";
import EditVoucher from "./pages/Admin/EditVoucher/EditVoucher";
import ManageContact from "./pages/Admin/ManageContact/ManageContact";
import Notification from "./pages/Admin/Notification/Notification";
import Stock from "./pages/Admin/Stock/Stock";
import ManageComment from "./pages/Admin/ManageComment/ManageComment";
import ManageReview from "./pages/Admin/ManageReview/ManageReview";
import DetailComment from "./pages/Admin/DetailComment/DetailComment";
import DetailReview from "./pages/Admin/DetailReview/DetailReview";
function App() {
  return (
    // <Fragment>
    //   <Routes>
    //     {/*user*/}
    //     <Route element={<Main />}>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="/menu" element={<Menu />} />
    //       <Route path="/about-us" element={<About />} />
    //       <Route path="/contact-us" element={<Contact />} />
    //       <Route path="/blog" element={<Blog />}></Route>
    //       <Route path="/blog-detail/:id" element={<BlogDetail />} />
    //       <Route path="/sign-in" element={<SignInPage />} />
    //       <Route path="/sign-up" element={<SignUpPage />} />
    //       <Route path="/cart" element={<Cart />} />
    //       <Route path="/checkout" element={<Checkout />} />
    //       <Route path="/checkout/:id" element={<Checkout />} />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route path="/my-orders" element={<MyOrders />} />
    //       <Route path="/order-detail/:id" element={<MyOrderDetail />} />
    //       <Route path="/favorites" element={<Favorite />} />
    //       <Route path="/product-detail/:id" element={<ProductDetail />} />
    //     </Route>
    //     {/* admin */}
    //     <Route path="/admin/dashboard" element={<DashBoard />}></Route>
    //     <Route path="/admin/manage-product" element={<ManageProduct />} />
    //     <Route path="/admin/manage-category" element={<ManageCategory />} />
    //     <Route path="/admin/manage-user" element={<ManageUser />} />
    //     <Route path="/admin/manage-blog" element={<ManageBlog />} />
    //     <Route path="/admin/manage-author" element={<ManageAuthor />} />
    //     <Route path="/admin/manage-order" element={<ManageOrder />} />
    //     <Route path="/admin/manage-voucher" element={<ManageVoucher />} />
    //     <Route path="/admin/purchase-history/:id" element={<PurchaseHistory />} />
    //     <Route path="/admin/detail-order/:id" element={<DetailOrder />} />
    //     {/* <Route path="/admin/manage-items" element={<EditOrder />} /> */}
    //     <Route path="/admin/manage-publishes" element={<ManagePublishes />} />
    //     <Route path="/admin/add-author" element={<AddAuthor />} />
    //     <Route path="/admin/add-publishes" element={<AddPublishes />} />
    //     <Route path="/admin/add-product" element={<AddProduct />} />
    //     <Route path="/admin/add-category" element={<AddCategory />} />
    //     <Route path="/admin/add-blog" element={<AddBlog />} />
    //     <Route path="/admin/add-voucher" element={<AddVoucher />} />
    //     <Route path="/admin/edit-voucher/:id" element={<EditVoucher />} />
    //     {/* <Route
    //       path="/admin/edit-voucher"
    //       element={
    //         <PrivateRoute allowedRoles={[1]}>
    //           <EditVoucher />
    //         </PrivateRoute>
    //       }
    //     /> */}
    //     <Route path="/admin/edit-product/:id" element={<EditProduct />} />
    //     <Route path="/admin/edit-category/:id" element={<EditCategory />} />
    //     <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
    //     <Route path="/admin/manage-contact" element={<ManageContact />} />
    //     <Route path="/admin/notification" element={<Notification />} />
    //   </Routes>
    // </Fragment>
    <Fragment>
      <Routes>
        {/*user*/}
        <Route element={<Main />}>
          <Route
            path="/"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <Blog />
              </PrivateRoute>
            }></Route>
          <Route
            path="/blog-detail/:id"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <BlogDetail />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route
            path="/sign-up"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <SignUpPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute allowedRoles={[-1]}>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <MyOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-detail/:id"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <MyOrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute allowedRoles={[-1]}>
                <Favorite />
              </PrivateRoute>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <PrivateRoute allowedRoles={[0]}>
                <ProductDetail />
              </PrivateRoute>
            }
          />
        </Route>
        {/* admin */}

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <DashBoard />
            </PrivateRoute>
          }></Route>
        <Route
          path="/admin/manage-product"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-category"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-user"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-blog"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-author"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageAuthor />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-order"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-voucher"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageVoucher />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/purchase-history/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <PurchaseHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/detail-order/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <DetailOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/detail-comment/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <DetailComment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/detail-review/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <DetailReview />
            </PrivateRoute>
          }
        />
        {/* <Route path="/admin/manage-items" element={<EditOrder />} /> */}
        <Route
          path="/admin/manage-publishes"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManagePublishes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-author"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddAuthor />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-publishes"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddPublishes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-category"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-blog"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-voucher"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AddVoucher />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-voucher/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <EditVoucher />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-category/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <EditCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-blog/:id"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <EditBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-contact"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/notification"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <Notification />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <Stock />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-comment"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageComment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-review"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <ManageReview />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
