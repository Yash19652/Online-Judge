import { useMemo, useState, useEffect, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";

//dummy data for 10 rows
// const data = [
//   {
//     status: "Open",
//     probId: "101",
//     probName: "Problem 1",
//     difficulty: "Easy",
//     topic: "Math",
//   },
//   {
//     status: "Closed",
//     probId: "102",
//     probName: "Problem 2",
//     difficulty: "Medium",
//     topic: "Science",
//   },
//   {
//     status: "Open",
//     probId: "103",
//     probName: "Problem 3",
//     difficulty: "Hard",
//     topic: "History",
//   },
//   {
//     status: "In Progress",
//     probId: "104",
//     probName: "Problem 4",
//     difficulty: "Easy",
//     topic: "Geography",
//   },
//   {
//     status: "Closed",
//     probId: "105",
//     probName: "Problem 5",
//     difficulty: "Medium",
//     topic: "Math",
//   },
//   {
//     status: "Open",
//     probId: "106",
//     probName: "Problem 6",
//     difficulty: "Hard",
//     topic: "Science",
//   },
//   {
//     status: "In Progress",
//     probId: "107",
//     probName: "Problem 7",
//     difficulty: "Easy",
//     topic: "History",
//   },
//   {

//     probId: "108",
//     probName: "Problem 8",
//     difficulty: "Medium",
//     topic: "Geography",
//   },
//   {
//     status: "Open",
//     probId: "109",
//     probName: "Problem 9",
//     difficulty: "Hard",
//     topic: "Math",
//   },
//   {
//     status: "In Progress",
//     probId: "110",
//     probName: "Problem 10",
//     difficulty: "Easy",
//     topic: "Science",
//   },
// ];

const ProblemList = () => {
  const [role, setRole] = useState("admin");
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await Axios.get("http://localhost:5000/problemList/", {
        withCredentials: true,
      });
      setData(response.data.data);
      setRole(response.data.role)
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  }, []); // useCallback with an empty dependency array to memoize the function

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(data);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "status",
        header: "Status",
        size: 75,
        Cell: ({ value }) =>
          value === null || value === undefined ? "unsolved" : value,
      },
      {
        accessorKey: "probId",
        header: "Problem ID",
        size: 75,
      },
      {
        accessorKey: "probName",
        header: "Problem Name",
        size: 200,
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
        size: 150,
        sortingFn: (rowA, rowB) => {
          const order = ["Easy", "Medium", "Hard"];
          return (
            order.indexOf(rowA.original.difficulty) -
            order.indexOf(rowB.original.difficulty)
          );
        },
      },
      {
        accessorKey: "topic",
        header: "Topic",
        size: 150,
      },
    ];

    if (role === "admin") {
      baseColumns.push({
        id: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ row }) => (
          // <div>
          //   <button onClick={() => handleUpdate(row)}><EditIcon /></button>
          //   <button onClick={() => handleDelete(row)}><DeleteIcon/></button>
          // </div>
          <>
            <Tooltip title="Edit">
              <IconButton onClick={() => handleUpdate(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      });
    }

    return baseColumns;
  }, [role]);

  const handleUpdate = (row) => {
    console.log("Update row _id:", row.original._id);
    // Add your update logic here
  };

  const handleDelete = (row) => {
    console.log("Delete row _id:", row.original._id);
    // Add your delete logic here
  };

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableHeadCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: "normal",
        fontSize: "14px",
        backgroundColor: "grey",
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.log(row.id);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  return <MaterialReactTable table={table} />;
};

export default ProblemList;
