import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useLazyGetProductQuery,
} from "../store/store-slice.js";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";

const Product = () => {
  const [trigger, { data, error, isLoading }] = useLazyGetProductQuery();
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    trigger(id)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
      });
  }, [id, trigger]);

  const handleDeleteProduct = () => {
    deleteProduct(id)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
        navigate(-1);
      });
  };

  return (
    <div>
      <h1>Product</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <>
          {token && (
            <Button onClick={() => handleDeleteProduct(id)}>Delete Product</Button>
          )}
          <div>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <p>{data.price}</p>
            <img
              // src={"https://via.placeholder.com/200x100"}
              src={data.images[0]}
              alt={data.name}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
