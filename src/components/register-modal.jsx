import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextInput,
  Group,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRegisterMutation } from "../store/store-service.js";

export const RegisterModal = ({
  isRegisterModalOpen,
  setIsRegisterModalOpen,
}) => {
  const [error, setError] = useState("");
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

  useEffect(() => {
    if (registerError) {
      if (registerError?.status === 400) {
        setError(registerError.data.message.join(", "));
      }
    }
  }, [registerError]);

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
    setError("");
    form.reset();
  };

  return (
    <Modal
      opened={isRegisterModalOpen}
      onClose={handleModalClose}
      title="Kayit ol"
    >
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
          <TextInput
            withAsterisk
            label="Name"
            {...form.getInputProps("name")}
          />
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
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};
