import { useMemo, useState, useEffect, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { IconButton, Tooltip, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Chip from "@mui/material/Chip";

const ProblemList = () => {
  const [role, setRole] = useState("");
  const [data, setData] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/problemList/`, {
        withCredentials: true,
      });
      setData(response.data.data);
      setRole(response.data.role);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const msg = error.response.data.message
        navigate('/login' , {state : {msg}});
      }
      console.error("There was an error fetching the data!", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // console.log(data);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "status",
        header: "Status",
        size: 75,
        Cell: ({ cell }) => {
          return cell.getValue() !== undefined ? (
            <RadioButtonUncheckedIcon color="warning" />
          ) : (
            <TaskAltIcon color="success" />
          );
        },
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
          const order = ["easy", "medium", "hard"];
          return (
            order.indexOf(rowA.original.difficulty) -
            order.indexOf(rowB.original.difficulty)
          );
        },

        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              borderRadius: "0.25rem",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            <Chip
              label={cell.getValue()}
              variant="outlined"
              sx={(theme) => {
                const color =
                  cell.getValue() === "hard"
                    ? theme.palette.error.light
                    : cell.getValue() === "medium"
                    ? theme.palette.warning.light
                    : theme.palette.success.light;

                return {
                  color: color,
                  borderColor: color,
                };
              }}
            />
          </Box>
        ),
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
              <IconButton
                color="error"
                onClick={(e) => handleClickOpen(row, e)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      });
    }

    return baseColumns;
  }, [role]);

  const handleUpdate = (row, e) => {
    // e.stopPropogation();
    const problemDetails = row.original;
    navigate("/updateproblem", { state: { problemDetails } });
  };

  const handleDelete = async () => {
    console.log("Delete row _id:", selectedRow.original._id);
    const prob_id = selectedRow.original._id;
    const res = await Axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/problemlist/delete`,
      { _id: prob_id },
      { withCredentials: true }
    )
      .then(function (response) {
        if (response.status) {
          console.log(response);
          setData((prevData) =>
            prevData.filter((item) => item._id !== prob_id)
          );
          // alert(response.data.message)
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.message);

        // <Alert severity="error">{error.response.data.error}</Alert>
      });

    setOpen(false);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableHeadCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: "normal",
        fontSize: "14px",
        backgroundColor: "grey",
      },
    },
    muiTableBodyCellProps: ({ cell }) => ({
      onClick: (event) => {
        const ID = cell.row.original._id;
        const problemData = cell.row.original;
        if (cell.column.id !== "actions") {
          navigate(`/problem/${ID}`, { state: { problemData } });
        }
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    renderTopToolbarCustomActions: ({ table }) =>
      role === "admin" && (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="medium"
          onClick={() => {
            console.log("Add a problem");
            navigate("/createproblem");
          }}
        >
          Add a problem
        </Button>
      ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this question?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clicking on YES will permanently delete the problem from the
            database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProblemList;
