import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EnManageAccounts.css";
import * as RiIcons from "react-icons/ri";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Loading from "../../../components/Loading";

const headCell = [
  { id: "id", label: "No", disableSorting: true },
  { id: "name", label: "Name" },
  { id: "userType", label: "Role" },
  { id: "email", label: "Email" },
  { id: "button", label: "" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.warning.light,
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

function EnManageAccounts() {
  const [data, setData] = useState([]);

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState([]);
  const [products, setProducts] = useState([]);

  const tokenData = window.localStorage.getItem("token");

  const getUsers = async () => {
    setLoading(true);

    await fetch("https://backend.teamluanvan.software/", {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data, "userRegister");
        setData(data.data);
        setLoading(false);

      });
  };
  useEffect(() => {
    getUsers();
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
    return stableSort(filterFn.fn(data), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  const handleSordRequest = (id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (e.target.value == "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <Container
      sx={{
        minWidth: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Loading loading={loading} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h3">LIST OF USERS</Typography>
      </Box>
      <Box>
        <Toolbar>
          <TextField
            variant="outlined"
            label="Search user"
            // name={name}
            // value={value}
            onChange={handleSearch}
            sx={{ width: "20%", marginBottom: "20px", marginLeft: "0" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
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
              item.userType === 'User' || item.userType === 'user' || item.userType === 'Farmer' ? 
              <StyledTableRow key={index + 1}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell>{item.userType}</StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup variant="contained">
                    <Button
                      color="info"
                      onClick={() => {
                        window.location.href = `/enuseraccount/${item._id}`;
                      }}
                    >
                      Detail
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
              : null
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
    </Container>
  );
}

export default EnManageAccounts;
