import { Grid, Card, Pagination, Center, Button, Select } from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyGetAllProductsQuery } from "../store/store-slice.js";
import { useSelector } from "react-redux";
import { AddProductModal } from "../components/add-product-modal.jsx";

export const Products = () => {
  const [products, { data, error, isLoading }] = useLazyGetAllProductsQuery();
  const [activePage, setPage] = useState(1);
  const { token } = useSelector((state) => state.auth);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    products(activePage * 10)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
      });
  }, [products, activePage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <Grid gutter="xl">
        <AddProductModal
          isProductModalOpen={isProductModalOpen}
          setIsProductModalOpen={setIsProductModalOpen}
        />
        {token && (
          <Grid.Col>
            <Button onClick={() => setIsProductModalOpen(true)}>
              Add Product
            </Button>
          </Grid.Col>
        )}
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
        <Grid.Col span={12}>
          <Center>
            <Pagination page={activePage} total={10} onChange={setPage} />
          </Center>
        </Grid.Col>
      </Grid>
    </div>
  );
};
