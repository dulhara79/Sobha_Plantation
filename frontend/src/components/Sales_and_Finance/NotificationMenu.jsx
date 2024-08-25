import React from "react";
import { Menu } from "antd";

const NotificationMenu = ({ notifications }) => {
  return (
    <Menu>
      {notifications.map((notification, index) => (
        <Menu.Item key={index}>{notification.message}</Menu.Item>
      ))}
    </Menu>
  );
};

export default NotificationMenu;
