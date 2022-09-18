import { useEffect, useState } from "react";
import { authActions } from "../store/auth-slice.js";
import { useDispatch } from "react-redux";
import {
  Modal,
  Box,
  TextInput,
  Group,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLoginMutation } from "../store/store-service.js";

export const LoginModal = ({ isModalOpen, setIsModalOpen }) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  useEffect(() => {
    if (loginError) {
      if (error?.status === 401) {
        setError("Invalid email or password");
        return;
      }
      setError(loginError);
    }
  }, [loginError]);

  const handleLogin = (values) => {
    login(values)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
        dispatch(authActions.login(result.access_token));
        handleModalClose();
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setError("");
    form.reset();
  };

  return (
    <Modal opened={isModalOpen} onClose={handleModalClose} title="Giris yap">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          {error && <div>{error}</div>}
          {/*{loginError && <div>{loginError.data.message}</div>}*/}
          <Group position="right" mt="md">
            <Button
              variant="gradient"
              type="submit"
            >
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};
