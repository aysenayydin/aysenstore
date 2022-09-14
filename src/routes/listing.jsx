import {Link, useParams} from "react-router-dom";
import { useLazyGetProductsQuery } from "../store/store-slice.js";
import { useEffect } from "react";

const Listing = () => {
  const [trigger, { data, error, isLoading }] = useLazyGetProductsQuery();
  const { id } = useParams();

  useEffect(() => {
    trigger(id)
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
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
      {data &&
        data.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <a>
              <div key={product.id}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <img
                  src={"https://via.placeholder.com/200x100"}
                  alt={product.name}
                />
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default Listing;
