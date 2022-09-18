import { useAddCategoryMutation } from "../store/store-service.js";
import { Modal, TextInput, Button, Select, Group, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";

export const AddCategoryModal = ({
  isCategoryModalOpen,
  setIsCategoryModalOpen,
}) => {
  const [addCategory, { isLoading, error }] = useAddCategoryMutation();

  const form = useForm({
    initialValues: {
      name: "",
      image: "https://api.lorem.space/image?w=640&h=480",
    },
  });

  const handleSubmit = async (values) => {
    addCategory(values)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
        setIsCategoryModalOpen(false);
      });
  };

  const handleCloseModal = () => {
    setIsCategoryModalOpen(false);
    form.reset();
  };

  return (
    <Modal
      closeOnClickOutside={false}
      title="Add a category"
      opened={isCategoryModalOpen}
      onClose={handleCloseModal}
      size="sm"
      transition="slide-down"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput mt='md' required label="Name" {...form.getInputProps("name")} />
        <TextInput mt='md' required label="Image" {...form.getInputProps("image")} />
        {error && (
          <Alert mt="md" title="Error!" color="red">
            {error.data.message.join(", ")}
          </Alert>
        )}
        <Group position="right" mt="md">
          <Button variant="gradient" type="submit" disabled={isLoading}>
            Add a Category
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
