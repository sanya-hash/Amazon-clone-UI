import { ReactElement, useEffect, useState, CSSProperties } from "react";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import axios from "axios";
import { base_url } from "../../static/staticData";
import { SyncLoader} from "react-spinners";
import { getAuthHeader } from "../../common/methods";
interface Transaction {
  // id: string;
  user: string;
  amount: number;
  quantity: number;
  time: Date;
  status: ReactElement;
   shippinginfo: React.ReactElement;
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
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: 'translateX(-50%, -50%)'
};
const columns: Column<Transaction>[] = [
  // {
  //   Header: <b>Id</b>,
  //   accessor: "id",
  // },
  {
    Header: <b>Amount</b>,
    // accessor: "amount",
    accessor: "amount",
    Cell: ({ value }) => `$${value}` // Add a dollar sign before the amount
  },
  // {
  //   Header: <b>Quantity</b>,
  //   accessor: "quantity",
  // },
  {
    Header: <b>Time</b>,
    accessor: "time",
  },
  {
    Header: <b>Shipped to</b>,
    accessor: "user",
  },
  {
    Header: <b>Shipping Address</b>,
    accessor: "shippinginfo",
  },
  {
    Header: <b>Status</b>,
    accessor: "status",
  },
  
];

const Transaction = () => {
  const [rows, setRows] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${base_url}/order/getorders`,{headers:getAuthHeader()})
      .then((response) => {
        const Data: Transaction[] = response.data.map((order: any) => ({
          amount:  order.totalPrice,
          time: order.paidAt,
          // id: order.id,
          quantity: order.orderItems.length,
          user: order.shippingInfo.name,
          shippinginfo: order.shippingInfo.address,
          status: <span className="green">Processed</span>,
        }));
        setRows(Data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Orders:", error);
        setLoading(false);
      });
  }, []);

  const Table = TableHOC<Transaction>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
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

export default Transaction;
