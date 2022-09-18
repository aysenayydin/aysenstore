import { Link, useParams } from "react-router-dom";
import { useLazyGetProductsQuery } from "../store/store-slice.js";
import { useEffect } from "react";
import { Grid, Card } from "@mantine/core";

const Listing = () => {
  const [trigger, { data, error, isLoading }] = useLazyGetProductsQuery();
  const { id } = useParams();

  useEffect(() => {
    trigger(id)
      .unwrap()
      .then((result) => {
        // console.log("result, ", result);
      });
  }, [id, trigger]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Listing</h1>
      <Grid gutter="xl">
        {data &&
          data.map((product) => (
            <Grid.Col sm={12} md={6} lg={4} xl={3} key={product.id}>
              <Link to={`/product/${product.id}`} key={product.id}>
                  <Card shadow="sm" p="lg" withBorder>
                    <div key={product.id}>
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <p>${product.price}</p>
                      <Card.Section>
                        <img
                          // src={"https://via.placeholder.com/200x100"}
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </Card.Section>
                    </div>
                  </Card>
              </Link>
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
};

export default Listing;
