import { useMemo } from "react";
import {
  MRT_Table,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SubmissionPage = () => {
  const location = useLocation();
  const recievedData = location.state.data || {};
  const data = recievedData.slice().reverse();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleShowCode = (row) => {
    const data = row.original;
    navigate("/submittedcode", {
      state: { code: data.code, language: data.language },
    });
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "probId", //access nested data with dot notation
        header: "Problem Id",
        size: 150,
      },
      {
        accessorKey: "Accepted",
        header: "Verdict",
        size: 150,
        // Cell: ({ cell }) => {
        //   return cell.getValue() ? "Accepted" : "Not Accepted";
        // },
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue() ? "Accepted" : "Not Accepted"}
            variant="outlined"
            sx={(theme) => {
              const color = cell.getValue()
                ? theme.palette.success.light
                : theme.palette.error.light;

              return {
                color: color,
                borderColor: color,
              };
            }}
          />
        ),
      },
      {
        accessorKey: "language", //normal accessorKey
        header: "Language",
        size: 150,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 150,

        Cell: ({ row }) => {
          return (
            <Button
              aria-label="code"
              variant="contained"
              color="primary"
              onClick={() => handleShowCode(row)}
            >
              <CodeIcon />
            </Button>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
  });

  return (
    <>
      <Button
        variant="contained"
        sx={{ margin: 1, marginX: 5, width: "10%" }}
        onClick={goBack}
        endIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <Box sx={{ marginTop: 2, marginX: 5, border: "1px solid black" }}>
        <MRT_Table table={table} />
      </Box>
    </>
  );
};

export default SubmissionPage;
