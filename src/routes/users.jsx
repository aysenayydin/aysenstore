import { useGetAllUsersQuery } from "../store/store-service";
import { Grid, Group, Avatar, Loader, Text } from "@mantine/core";

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
              <Text>{user.name}</Text>
            </Group>
          </Grid.Col>
        ))}
    </Grid>
  );
};
