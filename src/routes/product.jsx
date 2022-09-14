import { useParams } from "react-router-dom";
import { useLazyGetProductQuery } from "../store/store-slice.js";
import { useEffect } from "react";

const Product = () => {
  const { id } = useParams();
  const [trigger, { data, error, isLoading }] = useLazyGetProductQuery();

  useEffect(() => {
    trigger(id)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
      });
  }, [id, trigger]);

  return (
    <div>
      <h1>Product</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          <p>{data.price}</p>
          <img src={"https://via.placeholder.com/200x100"} alt={data.name} />
        </div>
      )}
    </div>
  );
};

export default Product;
