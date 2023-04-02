import { Menu } from "antd";
import Link from "next/link";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const TopNav = () => {
  return (
    <Menu mode="horizontal">
      <Item icon={<HomeOutlined />}>
        <Link href="/">App</Link>
      </Item>

      <Item icon={<LoginOutlined />}>
        <Link href="/login">Login</Link>
      </Item>

      <Item icon={<UserAddOutlined />}>
        <Link href="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
