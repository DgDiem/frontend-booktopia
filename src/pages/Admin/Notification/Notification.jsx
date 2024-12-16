import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { FaRegBell } from "react-icons/fa";
import "./Notification.css";
import { Link } from "react-router-dom";
import { FcPaid } from "react-icons/fc";

const socket = io("http://localhost:3000", {
    transports: ["websocket"],
    withCredentials: true,
});

const Notification = () => {
    const [notifications, setNotifications] = useState(
        () => JSON.parse(localStorage.getItem("notifications")) || []
    );
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        socket.on("newOrder", (data) => {
            const updatedNotifications = [data, ...notifications];
            setNotifications(updatedNotifications);
            localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
        });

        return () => {
            socket.off("newOrder");
        };
    }, [notifications]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleNotificationClick = (orderId) => {
        const updatedNotifications = notifications.map((notification) => {
            if (notification.orderId === orderId) {
                notification.isRead = true;
            }
            return notification;
        });
        setNotifications(updatedNotifications);
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
        setShowNotifications(false);
        // alert(`Xem chi tiết đơn hàng: ${orderId}`);
    };
    const unreadCount = notifications.filter(notification => !notification.isRead).length;


    return (
        <div className="notifications-container">
            <button
                onClick={toggleNotifications}
                className="notifications-button"
            >
                <div className="flex">
                    <span><FaRegBell className="w-5 h-5" /></span>
                    <span className="notification-count">{unreadCount}</span>
                </div>
            </button>

            {showNotifications && (
                <div className="notifications-list">
                    {notifications.length === 0 ? (
                        <p>Không có thông báo mới</p>
                    ) : (
                        notifications.map((notification, index) => (
                            <div key={index} className="notification-item flex-" style={{ position: "relative" }}>
                                <Link to={`/admin/detail-order/${notification._id}`}>

                                    <button className="button-notifi flex bg-transparent gap-1 "
                                        onClick={() => handleNotificationClick(notification.orderId)}
                                    >
                                        <div className="">
                                            <FcPaid size="30px" />
                                        </div>
                                        <div className="grid">
                                            <div className="flex text-center">
                                                <span className="text-[12px] font-medium ml-2 ">Bạn có đơn hàng mới !!</span>
                                            </div>
                                            <div className=" text-[12px] text-slate-700 mt-1 ">
                                                Khách hàng {notification.name} với mã đơn hàng <span className="font-medium">{notification.orderId}</span>
                                            </div>
                                        </div>
                                        {!notification.isRead && (
                                            <span
                                                className="notification-new text-center mt-6 ml-3"
                                                style={{
                                                    position: "absolute",
                                                    top: "5px",
                                                    right: "5px",
                                                    backgroundColor: "blue",
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                }}
                                            ></span>
                                        )}
                                    </button>
                                </Link>

                            </div>
                        ))
                    )}
                </div>
            )
            }
        </div >
    );
};

export default Notification;
