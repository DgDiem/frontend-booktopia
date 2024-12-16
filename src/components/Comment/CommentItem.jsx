import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import { URL_API } from "../../constants/constants";

const CommentItem = ({ dataComent, handleDeleteComment }) => {
  const [inforUser, setInforUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setInforUser(userData?.user);
    } else {
      console.log("Không có user trong cookie");
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="">
        {dataComent && dataComent.length > 0 ? (
          dataComent.map((comment) => (
            <div
              key={comment._id}
              className="flex items-center  mb-2 justify-between"
            >
              <div className="w-[100%]">
                <div className="border flex justify-between  rounded-[10px] py-4 px-5 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="text-grayText flex font-normal leading-normal">
                      <div className="flex gap-2 items-center">
                        <img
                          src={
                            comment?.user?.image
                              ? `${URL_API}/images/${comment.user.image}`
                              : "./images/avatar.png"
                          }
                          className="w-10 h-10 rounded-full"
                          alt={comment?.user?.name || "User Avatar"}
                        />
                        <div className="flex flex-col">
                          <h3 className="text-[18px] text-text font-semibold leading-normal">
                            {comment?.user?.name}
                          </h3>
                          <span className="text-[12px]">
                            {new Date(comment?.day).toLocaleString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-text font-normal leading-normal">
                      {comment?.content}
                    </p>
                  </div>
                  {comment?.user?._id === inforUser?._id ? (
                    <div className="cursor-pointer font-medium">
                      <AiOutlineDelete
                        onClick={() => handleDeleteComment(comment?._id)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Không có bình luận</h1>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
