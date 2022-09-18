import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../store/store-service.js";
import {
  Modal,
  Alert,
  TextInput,
  Button,
  Select,
  Group,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export const AddProductModal = ({
  isProductModalOpen,
  setIsProductModalOpen,
}) => {
  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  console.log("categories, ", categories);

  // function to map categories object with value and name
  const mapCategories = (categories) => {
    return categories.map((category) => {
      return { value: category.id, label: category.name };
    });
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      price: "",
      images: ["https://api.lorem.space/image?w=640&h=480"],
      categoryId: "",
    },
  });

  const handleSubmit = async (values) => {
    addProduct(values)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
        setIsProductModalOpen(false);
        form.reset();
      });
  };

  const handleCloseModal = () => {
    setIsProductModalOpen(false);
  };

  return (
    <Modal
      closeOnClickOutside={false}
      title="Add a product"
      opened={isProductModalOpen}
      onClose={handleCloseModal}
      size="sm"
      transition="slide-down"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          mt="md"
          required
          label="Title"
          {...form.getInputProps("title")}
        />
        <TextInput
          mt="md"
          required
          label="Description"
          {...form.getInputProps("description")}
        />
        <TextInput
          mt="md"
          required
          label="Price"
          {...form.getInputProps("price")}
        />
        {/*<TextInput required label="Image" {...form.getInputProps("image")} />*/}
        <Select
          mt="md"
          data={mapCategories(categories)}
          label="Category"
          {...form.getInputProps("categoryId")}
        />
        {error && (
          <Alert mt="md" title="Error!" color="red">
            {error.data.message.join(", ")}
          </Alert>
        )}
        <Group position="right" mt="md">
          <Button variant="gradient" type="submit" disabled={isLoading}>
            Add product
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
