import "./App.css";
import {
  useGetCategoriesQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
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

  console.log("userData, ", userData);

  // useEffect(() => {
  //   if (!userData) {
  //
  //   }
  // }

  const handleLogin = () => {
    login({ email: "nico@gmail.com", password: "123" })
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
        localStorage.setItem("token", result.access_token);
      });
  };

  const registerBtn = () => {
    register({
      name: "Nicolas",
      email: "nico@gmail.com",
      password: "123",
      avatar: "https://via.placeholder.com/200x100",
    })
      .unwrap()
      .then((result) => {
        console.log("result, ", result);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
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
      {data.map((category) => (
        <Link to={`/listing/${category.id}`} key={category.id}>
          <div>{category.name}</div>
        </Link>
      ))}
      {!userData && <button onClick={handleLogin}>Login</button>}
      {!userData && <button onClick={registerBtn}>Register</button>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
