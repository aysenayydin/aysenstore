import { Grid, Card, Button } from "@mantine/core";
import { useGetCategoriesQuery } from "../store/store-slice.js";
import { useState } from "react";
import { AddCategoryModal } from "../components/add-category-modal";

export const Categories = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  console.log("data, ", data);

  if (isLoading) {
    return <div>Loading...</div>;
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
        <Grid.Col>
          <Button onClick={() => setIsCategoryModalOpen(true)}>
            Add a Category
          </Button>
        </Grid.Col>
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
