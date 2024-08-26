import { Dropdown, Menu, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const NotificationDropdown = ({ notifications }) => {
  const menu = (
    <Menu>
      {notifications.map((notification, index) => (
        <Menu.Item key={index}>
          {notification.message}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Badge dot color="green">
        <BellOutlined className="text-xl cursor-pointer" />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;