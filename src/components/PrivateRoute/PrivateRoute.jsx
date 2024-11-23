// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   try {
//     const userCookie = Cookies.get("user");
//     const user = userCookie ? JSON.parse(userCookie) : null;
//     if (!user) {
//       return <Navigate to="/sign-in" replace />;
//     }
//     // profile thì role phải bằng 0
//     if (allowedRoles.includes(0) && user.user.role !== 0) {
//       return <Navigate to="/sign-in" replace />;
//     }
//     if (allowedRoles.includes(1) && user.user.role !== 1) {
//       return <Navigate to="/sign-in" replace />;
//     }
//     return children;
//   } catch (error) {
//     console.error("Lỗi khi đọc cookie:", error);
//     return <Navigate to="/sign-in" replace />;
//   }
// };

// export default PrivateRoute;
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, allowedRoles }) => {
  try {
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;
    const userRole = user ? user.user.role : null; //role từ user

    // // Kiểm tra role
    if (allowedRoles.includes(userRole) || (!user && allowedRoles.includes(0))) {
      return children; // Cho phép truy cập
    }

    //về trang đăng nhập, không có quyền
    return <Navigate to="/sign-in" replace />;
  } catch (error) {
    console.error("Lỗi khi đọc cookie:", error);
    return <Navigate to="/sign-in" replace />;
  }
};

export default PrivateRoute;
