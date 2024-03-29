import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  tableCellClasses,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const headCell = [
  { id: "id", label: "No", disableSorting: true },
  { id: "name", label: "Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "products", label: "Number of products" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableForm = () => {
  const [data, setData] = useState([]);
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  const tokenIsValid = () => {
    fetch("http://localhost:5000/tokenIsValid", {
      method:"POST",
      crossDomain:true,
      headers: {
        'x-auth-token': tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((res) => res.json() )
      .then((data) => {
        // console.log("token", data)
      });
  }

  const getProducts = () => {
    fetch("http://localhost:5000/users", {
      method:"GET",
      headers: {
        'x-auth-token': tokenData,
      },
    })  
      .then((res) => res.json() )
      .then((data) => {
        // console.log(data.data, "list products");
        setData(data.data);
      });
  }

  useEffect(() => {
    tokenIsValid();
    getProducts();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(data, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  const handleSordRequest = (id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  return (
    <Box>
      <Table>
        <TableHead>
          {headCell.map((item) => (
            <StyledTableCell
              key={item.id}
              sortDirection={orderBy === item.id ? order : false}
            >
              {item.disableSorting ? (
                item.label
              ) : (
                <TableSortLabel
                  active={orderBy === item.id}
                  direction={orderBy === item.id ? order : "asc"}
                  onClick={() => handleSordRequest(item.id)}
                >
                  {item.label}
                </TableSortLabel>
              )}
            </StyledTableCell>
          ))}
        </TableHead>
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, index) => (
            <StyledTableRow key={index+1}>
              <StyledTableCell>{index+1}</StyledTableCell>
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{item.email}</StyledTableCell>
              {/* <StyledTableCell>{item.products.length <= 0 ? 0 : item.products.length}</StyledTableCell> */}
              <StyledTableCell>{item.products}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={data.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TableForm;
