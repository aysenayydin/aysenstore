import { useEffect, useState } from "react";
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
import { useRegisterMutation } from "../store/store-service.js";

export const RegisterModal = ({
  isRegisterModalOpen,
  setIsRegisterModalOpen,
}) => {
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleRegister = (values) => {
    register({
      ...values,
      avatar: "https://via.placeholder.com/200x100",
    })
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
        // dispatch(authActions.login(result.access_token));
        handleModalClose();
      });
  };

  const handleModalClose = () => {
    setIsRegisterModalOpen(false);
    form.reset();
  };

  return (
    <Modal
      opened={isRegisterModalOpen}
      onClose={handleModalClose}
      title="Sign Up"
    >
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
          <TextInput
            mt="md"
            withAsterisk
            label="Name"
            {...form.getInputProps("name")}
          />
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
          {registerError && (
            <Alert mt="md" title="Error!" color="red">
              {registerError.data.message.constructor === Array
                ? registerError.data.message.join(", ")
                : registerError.data.message}
            </Alert>
          )}
          <Group position="right" mt="md">
            <Button variant="gradient" type="submit">
              Register
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};
