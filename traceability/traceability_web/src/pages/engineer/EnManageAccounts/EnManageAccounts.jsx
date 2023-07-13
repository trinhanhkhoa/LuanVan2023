import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EnManageAccounts.css";
import * as RiIcons from "react-icons/ri";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  IconButton,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Loading from "../../../components/Loading";

const headCell = [
  { id: "id", label: "STT", disableSorting: true },
  { id: "name", label: "Tên người dùng" },
  { id: "userType", label: "Vai trò" },
  { id: "email", label: "Email" },
  { id: "length", label: "Sản phẩm" },
  { id: "button", label: "" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff9c4",
    color: "black",
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

    await fetch(`${process.env.REACT_APP_API}/`, {
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
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Loading loading={loading} />
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "20px", md: "35px" }, mb: 2 }}
      >
        Danh sách người dùng
      </Typography>
      <Card sx={{ p: 3, borderRadius: "10px" }}>
        <Toolbar>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm người dùng"
            onChange={handleSearch}
            sx={{
              width: { xs: "100%", md: "30%" },
              marginBottom: "20px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
        <TableContainer
          sx={{
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <Table>
            <TableHead>
              {headCell.map((item) => (
                <StyledTableCell
                  sx={
                    item.label == "Vai trò" || item.label == "STT" || item.label == "Sản phẩm"
                      ? { display: { xs: "none", md: "table-cell" } }
                      : null
                  }
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
              {recordsAfterPagingAndSorting().map((item, index) =>
                item.userType === "User" ||
                item.userType === "user" ||
                item.userType === "Farmer" ? (
                  <StyledTableRow key={index + 1}>
                    <StyledTableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {item.userType}
                    </StyledTableCell>

                    <StyledTableCell>{item.email}</StyledTableCell>
                    <StyledTableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {item.products.length}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        sx={{ display: { xs: "none", md: "block" } }}
                        variant="contained"
                        color="info"
                        onClick={() => {
                          window.location.href = `/enuseraccount/${item._id}`;
                        }}
                      >
                        Chi tiết
                      </Button>
                      <Tooltip
                        title="Detail"
                        sx={{ display: { xs: "block", md: "none" } }}
                      >
                        <IconButton
                          color="info"
                          onClick={() => {
                            window.location.href = `/enuseraccount/${item._id}`;
                          }}
                        >
                          <SearchRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={data.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}

export default EnManageAccounts;
