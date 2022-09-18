import { Grid, Card } from "@mantine/core";
// import "./App.css";
import {
  useGetCategoriesQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useAddProductMutation,
} from "./store/store-slice.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice.js";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetCategoriesQuery();
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery();
  const [addProduct, { isLoading: addProductLoading, error: addProductError }] =
    useAddProductMutation();

  // console.log("userData, ", userData);
  // dispatch(authActions.login({ token: "123" }));

  useEffect(() => {
    console.log("userData, ", userData);
    if (!userData) {
      return;
    }
  }, []);

  const handleAddProduct = () => {
    addProduct({
      title: "test",
      description: "test",
      categoryId: 2,
      price: 100,
      images: ["https://api.lorem.space/image/fashion?w=640&h=480"],
    })
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("data, ", data);
  return (
    <div className="App">
      <h1>Categories</h1>
      <Grid gutter="xl">
        {data.map((category) => (
          <Grid.Col sm={12} md={6} lg={4} xl={3}>
            <Link to={`/listing/${category.id}`} key={category.id}>
              <Card shadow="sm" p="lg" withBorder>
                <Card.Section>
                  <img src={category.image} alt={category.name} />
                </Card.Section>
                <div>{category.name}</div>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default App;
