import Swal from "sweetalert2";
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const showSwalFireSuccess = (title = "Thêm sản phẩm thành công") => {
  Swal.fire({
    position: "top-end",
    heightAuto: true,
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1000,
  });
};

export const updateProfile = async () => {
  try {
    // Thực hiện cập nhật hồ sơ (nếu có)

    // Hiển thị thông báo thành công
    await showSwalFireSuccess("Thông tin hồ sơ của bạn đã được cập nhật.");

    // Tải lại trang sau khi thông báo hiển thị xong
    window.location.reload();
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật hồ sơ:", error);
    // Xử lý lỗi nếu cần
  }
};

export const showSwalFireDelete = (text = "Sản phẩm của bạn đã bị xóa.") => {
  Swal.fire({
    title: "Bạn có chắc muốn xóa?",
    text: "Bạn sẽ không thể hoàn tác điều này!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "có, xóa nó!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Xóa!",
        text: text,
        icon: "success",
      }).then(() => {
        window.location.reload(); // Reload the page after deleting
      });
    }
  });
};
