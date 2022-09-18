import {
  Button,
  AppShell,
  Navbar,
  UnstyledButton,
  Avatar,
  Group,
  Text,
  Header,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { LoginModal } from "./login-modal.jsx";
import { RegisterModal } from "./register-modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice.js";

export const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Link to={`/`}>
            <UnstyledButton>
              <Group>
                <Avatar size={40} color="blue">
                  🏠
                </Avatar>
                <div>
                  <Text>Home</Text>
                </div>
              </Group>
            </UnstyledButton>
          </Link>
          <Link to={`/products`}>
            <UnstyledButton>
              <Group>
                <Avatar size={40} color="blue">
                  📦
                </Avatar>
                <div>
                  <Text>Products</Text>
                </div>
              </Group>
            </UnstyledButton>
          </Link>
          <Link to={`/categories`}>
          <UnstyledButton>
            <Group>
              <Avatar size={40} color="blue">
                🗃
              </Avatar>
              <div>
                <Text>Categories</Text>
              </div>
            </Group>
          </UnstyledButton>
        </Link>
          <UnstyledButton>
            <Group>
              <Avatar size={40} color="blue">
                👥
              </Avatar>
              <div>
                <Text>Users</Text>
              </div>
            </Group>
          </UnstyledButton>
          <Group>
            {!token && (
              <Button onClick={() => setIsModalOpen(true)}>Login</Button>
            )}
            {!token && (
              <Button onClick={() => setIsRegisterModalOpen(true)}>
                Register
              </Button>
            )}
            {token && <Button onClick={logout}>Logout</Button>}
          </Group>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <div>Aysen Store Admin Dashboard</div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <LoginModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <RegisterModal
        isRegisterModalOpen={isRegisterModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
      />
      <Outlet />
    </AppShell>
  );
};
