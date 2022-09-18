import { Grid, Card, Loader, Title } from "@mantine/core";
import { useGetCategoriesQuery } from "../store/store-service.js";
import { Link } from "react-router-dom";

function Index() {
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h1>Categories</h1>
      <Grid gutter="xl">
        {data.map((category) => (
          <Grid.Col sm={12} md={6} lg={4} xl={3} key={category.id}>
            <Link to={`/listing/${category.id}`} key={category.id}>
              <Card shadow="sm" p="lg" withBorder>
                <Card.Section>
                  <img src={category.image} alt={category.name} />
                </Card.Section>
                <Title size={"h3"} mt="md">
                  {category.name}
                </Title>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default Index;
