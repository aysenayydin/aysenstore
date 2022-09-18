import { Grid, Card, Button, Loader } from "@mantine/core";
import { useGetCategoriesQuery } from "../store/store-service.js";
import { useState } from "react";
import { AddCategoryModal } from "../components/add-category-modal";
import { useSelector } from "react-redux";

export const Categories = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AddCategoryModal
        isCategoryModalOpen={isCategoryModalOpen}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
      />
      <h1>Categories</h1>
      <Grid gutter="xl">
        {token && (
          <Grid.Col>
            <Button
              variant="gradient"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              Add a Category
            </Button>
          </Grid.Col>
        )}
        {data &&
          data.map((category) => (
            <Grid.Col sm={12} md={6} lg={4} xl={3} key={category.id}>
              <Card shadow="sm" p="lg" withBorder>
                <div key={category.id}>
                  <h3>{category.name}</h3>
                  <Card.Section>
                    <img
                      // src={"https://via.placeholder.com/200x100"}
                      src={category.image}
                      alt={category.name}
                    />
                  </Card.Section>
                </div>
              </Card>
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
};
