import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tạo tài khoản
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Đăng nhập bằng Google
  const signUpWithGmail = async () => {
    googleProvider.setCustomParameters({
      prompt: "select_account", // Yêu cầu chọn tài khoản mỗi khi đăng nhập
    });

    return signInWithPopup(auth, googleProvider);
  };

  // Đăng nhập với email và mật khẩu
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = result.user;

      if (!loggedInUser.photoURL) {
        loggedInUser.photoURL = "./images/avatar.png"; // Ảnh mặc định nếu không có
      }

      setUser(loggedInUser);
      setLoading(false);
      return loggedInUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Đăng xuất
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sau khi đăng xuất thành công
        setUser(null); // Đặt lại thông tin người dùng trong context
        Cookies.remove("user"); // Xóa thông tin người dùng trong cookie (nếu có)
        navigate("/sign-in"); // Chuyển hướng đến trang đăng nhập
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Đăng xuất không thành công:", error);
      });
  };

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
