import { useState, useEffect, ReactElement, CSSProperties } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import axios from "axios";
import { base_url } from "../../static/staticData";
import Avatar from "react-avatar"; 
import { SyncLoader } from "react-spinners";

import { toast } from "react-toastify";
import { getAuthHeader } from "../../common/methods";
interface UserType {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  avatar: ReactElement;
  action: ReactElement;
}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const MainSpinner: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: 380,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%, -50%)",
};


async function handleDelete(id: string, userfetch: () => void): Promise<void> {
    try {
      await axios.delete(`${base_url}/users/${id}`,{headers:getAuthHeader()});
      toast.success("User deleted");
      // Call userfetch to fetch updated user list after deletion
      userfetch();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
}


const columns: Column<UserType>[] = [
  {
    Header: <b>Avatar</b>,
    accessor: "avatar",
    Cell: ({ row }) => (
      <Avatar
        name={`${row.original.firstname} ${row.original.lastname}`}
        size={45}
        round={true}
      />
    ),
  },

  {
    Header: <b>Id</b>,
    accessor: "id",
  },
  {
    Header: <b>First Name</b>,
    accessor: "firstname",
  },
  {
    Header: <b>Last Name</b>,
    accessor: "lastname",
  },

  {
    Header: <b>Email</b>,
    accessor: "username",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // useEffect(() => {
  //   axios
  //     .get(`${base_url}/users/byrole`)
  //     .then((response) => {
  //       const Data: UserType[] = response.data.map((users: any) => ({
  //         id: users.id,
  //         firstname: users.firstname,
  //         lastname: users.lastname,
  //         username: users.username,
  //         action: (
  //           <button onClick={() => handleDelete(users.id)}>
  //             <FaTrash />
  //           </button>
  //         ),
  //       }));
  //       setUsers(Data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Customers:", error);
  //       setLoading(false);
  //     });
  // }, []);
 useEffect(() => {
    userfetch(); // Fetch initial user data
  }, []);

  const userfetch = () => {
    axios
      .get(`${base_url}/users/byrole`,{headers:getAuthHeader()})
      .then((response) => {
        const Data: UserType[] = response.data.map((users: any) => ({
          id: users.id,
          firstname: users.firstname,
          lastname: users.lastname,
          username: users.username,
          action: (
            <button onClick={() => handleDelete(users.id,userfetch)}>
              <FaTrash />
            </button>
          ),
        }));
        setUsers(Data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Customers:", error);
        setLoading(false);
      });
  };
  const Table = TableHOC<UserType>(
    columns,
    users,
    "dashboard-product-box",
    "Customers",
    users.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {loading ? (
          <SyncLoader
            color="#361AE3"
            loading={loading}
            cssOverride={MainSpinner}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          Table
        )}
      </main>
    </div>
  );
};

export default Customers;
function userfetch() {
  throw new Error("Function not implemented.");
}

