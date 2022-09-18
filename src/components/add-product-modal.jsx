import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../store/store-service.js";
import { Modal, TextInput, Button, Select } from "@mantine/core";
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
      title="Urun ekle"
      opened={isProductModalOpen}
      onClose={handleCloseModal}
      size="sm"
      transition="slide-down"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <h3>Add product</h3>
        <TextInput required label="Title" {...form.getInputProps("title")} />
        <TextInput
          required
          label="Description"
          {...form.getInputProps("description")}
        />
        <TextInput required label="Price" {...form.getInputProps("price")} />
        {/*<TextInput required label="Image" {...form.getInputProps("image")} />*/}
        <Select
          data={mapCategories(categories)}
          label="Category"
          {...form.getInputProps("categoryId")}
        />
        <Button
          variant="gradient"
          type="submit"
          disabled={isLoading}
        >
          Add product
        </Button>
      </form>
    </Modal>
  );
};
