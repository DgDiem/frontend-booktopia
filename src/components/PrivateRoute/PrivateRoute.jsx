import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, allowedRoles }) => {
  try {
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;
    const userRole = user?.user?.role;
    if (userRole === 1 && !allowedRoles.includes(1)) {
      return <Navigate to="/sign-in" replace />;
    }
    if (
      (user && allowedRoles.includes(-1) && userRole !== 1) ||
      allowedRoles.includes(userRole) ||
      allowedRoles.includes(0) ||
      allowedRoles.includes(-2)
    ) {
      return children;
    }

    // Chuyển hướng về trang đăng nhập
    return <Navigate to="/sign-in" replace />;
  } catch (error) {
    console.error("Lỗi khi đọc cookie:", error);
    return <Navigate to="/sign-in" replace />;
  }
};

export default PrivateRoute;
// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   try {
//     const userCookie = Cookies.get("user");
//     const user = userCookie ? JSON.parse(userCookie) : null;
//     const userRole = user ? user.role : null; // Sửa lỗi lấy user.role

//     // Kiểm tra vai trò người dùng và quyền truy cập
//     if (
//       (user &&
//         (allowedRoles.includes(userRole) ||
//           (userRole === -1 && allowedRoles.includes(-1)) ||
//           (userRole === -2 && allowedRoles.includes(0)))) ||
//       (!user && allowedRoles.includes(0))
//     ) {
//       return children;
//     }

//     // Chuyển hướng đến trang đăng nhập nếu không có quyền truy cập
//     return <Navigate to="/sign-in" replace />;
//   } catch (error) {
//     console.error("Lỗi khi đọc cookie:", error);
//     return <Navigate to="/sign-in" replace />;
//   }
// };

// export default PrivateRoute;
