import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <p key={user._id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Home;