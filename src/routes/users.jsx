import { useGetAllUsersQuery } from "../store/store-service";
import { Link } from "react-router-dom";
import { Grid, Group, Avatar, Loader } from "@mantine/core";

export const Users = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid>
      <Grid.Col span={12}>
        <h1>Users</h1>
      </Grid.Col>

      {data &&
        data.map((user) => (
          <Grid.Col key={user.id}>
            <Group>
              <Avatar>
                <img src={user.avatar} alt={user.name} />
              </Avatar>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </Group>
          </Grid.Col>
        ))}
    </Grid>
  );
};
