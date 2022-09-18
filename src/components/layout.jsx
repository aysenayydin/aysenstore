import {
  Button,
  AppShell,
  Navbar,
  UnstyledButton,
  Avatar,
  Group,
  Text,
  Header,
  Title,
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
          <Navbar.Section mt="xs">
            <Link to={`/`}>
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
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
          </Navbar.Section>
          <Navbar.Section mt="xs">
            <Link to={`/products`}>
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
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
          </Navbar.Section>
          <Navbar.Section mt="xs">
            <Link to={`/categories`}>
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
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
          </Navbar.Section>
          <Navbar.Section mt="xs">
            <Link to={`/users`}>
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <Group>
                  <Avatar size={40} color="blue">
                    👥
                  </Avatar>
                  <div>
                    <Text>Users</Text>
                  </div>
                </Group>
              </UnstyledButton>
            </Link>
          </Navbar.Section>
          <Navbar.Section mt="xs">
            <Group grow>
              {!token && (
                <Button
                  variant="gradient"
                  gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Login
                </Button>
              )}
              {!token && (
                <Button
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Register
                </Button>
              )}
              {token && (
                <Button variant="gradient" onClick={logout}>
                  Logout
                </Button>
              )}
            </Group>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Title variant="gradient">🌕Moon Store Admin Dashboard</Title>
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
