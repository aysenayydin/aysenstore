import { useAddCategoryMutation } from "../store/store-slice.js";
import { Modal, TextInput, Button, Select } from "@mantine/core";
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
        <h3>Add Category</h3>
        <TextInput required label="Name" {...form.getInputProps("name")} />
        <TextInput required label="Image" {...form.getInputProps("image")} />
        {/*<TextInput required label="Image" {...form.getInputProps("image")} />*/}
        <Button type="submit" disabled={isLoading}>
          Add a Category
        </Button>
      </form>
    </Modal>
  );
};
