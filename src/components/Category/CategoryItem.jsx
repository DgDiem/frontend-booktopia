import React from "react";

const CategoryItem = ({ title, items, onCategoryClick, onAuthorClick, onPublishClick }) => {
  const handleClick = (e, id, name, type) => {
    e.preventDefault(); // Chặn hành vi mặc định của thẻ <a>

    if (type === "category") {
      onCategoryClick(id, name);
    } else if (type === "author") {
      onAuthorClick(id, name);
    } else if (type === "publish") {
      onPublishClick(id, name);
    }
  };

  const getTypeFromTitle = () => {
    if (title === "Danh mục") return "category";
    if (title === "Tác giả") return "author";
    if (title === "Nhà xuất bản") return "publish";
    return null;
  };

  const type = getTypeFromTitle();

  return (
    <div>
      {title && (
        <h3 className="text-mainDark text-price font-semibold leading-normal mb-7">{title}</h3>
      )}
      <ul className="flex flex-col gap-7">
        {title === "Danh mục" && (
          <li>
            <a
              href="#"
              className="text-text leading-normal font-normal menu-link"
              onClick={(e) => handleClick(e, null, "Tất cả sản phẩm", "category")}>
              Tất cả sản phẩm
            </a>
          </li>
        )}
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <li key={item._id}>
              <a
                href="#"
                className="text-text leading-normal font-normal menu-link"
                onClick={(e) => handleClick(e, item._id, item.name, type)}>
                {item.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryItem;
