import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./EnUserAccount.css";
import * as RiIcons from "react-icons/ri";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
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
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Loading from "../../../components/Loading";
import Popup from "../../../components/Popup";
import ProductTracking from "../../farmer/ProductTracking/ProductTracking";

const headCell = [
  { id: "id", label: "No", disableSorting: true },
  { id: "name", label: "Name" },
  { id: "length", label: "Tracking" },
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

function EnUserAccount() {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [idPopup, setIdPopup] = useState("");
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
  const [openPopupTracking, setOpenPopupTracking] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  // console.log(params);

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  const getUserInfo = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API}/admin/${params.id}`,
      {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.data);
    setDataUser(data);
    // console.log(data);
  };

  useEffect(() => {
    const getUserProduct = async () => {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API}/product/get-product`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.data);
          let data = res.data;

          data = data.filter((p) => p.userId == params.id);

          setData(data);
        });
      setLoading(false);
    };

    getUserInfo();
    getUserProduct();
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
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-end" },
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: "25px", md: "35px" } }}>
          USER'S PRODUCTS
        </Typography>
        <Card
          sx={{
            backgroundColor: "rgba(71, 167, 162, 0.12)",
            padding: "1%",
            mt: { xs: 2, md: 0 },
          }}
        >
          <Typography>Username: {dataUser.name}</Typography>
          <Typography>Email: {dataUser.email}</Typography>
          <Typography>ID: {dataUser._id}</Typography>
          <Typography>Role: {dataUser.userType}</Typography>
        </Card>
      </Box>
      <Card>
        <TableContainer
          sx={{
            width: "100%",
            borderRadius: "5px",
          }}
        >
          <Toolbar>
            <TextField
              variant="outlined"
              placeholder="Search product"
              onChange={handleSearch}
              sx={{
                width: { xs: "100%", md: "30%" },
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "0",
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
                <StyledTableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.tracking.length}</StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonGroup variant="contained">
                      <Button
                        color="info"
                        onClick={() => {
                          setOpenPopupTracking(true);
                          setIdPopup(item._id);
                        }}
                      >
                        Detail
                      </Button>
                      <Popup
                        title="Tracking"
                        openPopup={openPopupTracking}
                        setOpenPopup={setOpenPopupTracking}
                      >
                        <ProductTracking id={idPopup} />
                      </Popup>
                    </ButtonGroup>
                  </StyledTableCell>
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
        </TableContainer>{" "}
      </Card>
    </Container>
  );
}

export default EnUserAccount;
