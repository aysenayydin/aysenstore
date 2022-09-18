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
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLoginMutation } from "../store/store-service.js";

export const LoginModal = ({ isModalOpen, setIsModalOpen }) => {
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
    form.reset();
  };

  return (
    <Modal opened={isModalOpen} onClose={handleModalClose} title="Login">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <TextInput
            mt="md"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          {loginError && (
            <Alert mt="md" title="Error!" color="red">
              {loginError.data.message.constructor === Array
                ? loginError.data.message.join(", ")
                : loginError.data.message}
            </Alert>
          )}
          {/*{loginError && <div>{loginError.data.message}</div>}*/}
          <Group position="right" mt="md">
            <Button variant="gradient" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};
