import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const UserList = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log("Error fetching users:", err));
  }, [page, navigate]);

  const handleEditClick = (selectedUser) => {
    setEditId(selectedUser.id);
    setUser({
      first_name: selectedUser.first_name,
      last_name: selectedUser.last_name,
      email: selectedUser.email,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${editId}`, user);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editId ? { ...u, ...user } : u))
      );
      setEditId(null);
      Swal.fire("Success", "User updated successfully!", "success");
    } catch (error) {
      console.log("Error updating user:", error);
      Swal.fire("Error", "Failed to update user!", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://reqres.in/api/users/${id}`);
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          Swal.fire("Deleted!", "User has been removed.", "success");
        } catch (error) {
          console.log("Error deleting user:", error);
          Swal.fire("Error", "Failed to delete user!", "error");
        }
      }
    });
  };

  const filteredUsers = users.filter((u) =>
    `${u.first_name} ${u.last_name} ${u.email}`
      .toLowerCase()
      .includes(searchQuery)
  );

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <div>
        {filteredUsers.map((u) => (
          <div key={u.id} className="user-card">
            <img src={u.avatar} alt={u.first_name} />
            <div className="user-info">
              <p>
                <strong>
                  {u.first_name} {u.last_name}
                </strong>
              </p>
              <p>{u.email}</p>
            </div>
            <button className="edit-btn" onClick={() => handleEditClick(u)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => handleDelete(u.id)}>
              Delete
            </button>
            {editId === u.id && (
              <div className="edit-form">
                <h3>Edit User</h3>
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    value={user.first_name}
                    onChange={(e) =>
                      setUser({ ...user, first_name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={user.last_name}
                    onChange={(e) =>
                      setUser({ ...user, last_name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <button disabled={page > 1} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
