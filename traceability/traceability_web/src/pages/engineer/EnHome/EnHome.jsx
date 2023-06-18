import React, { useState, useEffect } from "react";
import "./EnHome.css";
import news_img from "../../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import Home from "../../farmer/Home/Home";
import BarChart from "../../../components/BarChart";
import LineChart from "../../../components/LineChart";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import {
  Box,
  Button,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Loading from "../../../components/Loading";
import AppWidgetSummary from "../../../components/HeaderCard/HeaderCard";
import { Card } from "reactstrap";

const headCell = [
  { id: "id", label: "No", disableSorting: true },
  { id: "name", label: "Name" },
  { id: "pid", label: "Product ID" },
  { id: "uid", label: "User ID" },
  { id: "address", label: "Address" },
  { id: "status", label: "Status" },
];

const StyleTableCell = styled(TableCell)(({ theme }) => ({
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

export default function EnHome() {
  const [data, setData] = useState([]);
  const [dataSC, setDataSC] = useState([]);

  const [dataUser, setDataUser] = useState([]);
  const [user, setUser] = useState([]);
  const [farmer, setFarmer] = useState([]);

  const [status, setStatus] = useState([]);
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
  const [tracking, setTracking] = useState([]);
  let temp = 0;
  const [length, setLength] = useState(0);
  const [admin, setAdmin] = useState(false);
  const userType = window.localStorage.getItem("userType");
  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      await fetch(`${process.env.REACT_APP_API}/`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          // console.log(data.data, "userRegister");
          setDataUser(data.data);

          let getAmountUsers = data.data;
          getAmountUsers = getAmountUsers.filter(
            (i) => i.userType == "user" || i.userType == "User"
          );
          setUser(getAmountUsers);

          let getAmountFarmers = data.data;
          getAmountFarmers = getAmountFarmers.filter(
            (i) => i.userType == "farmer" || i.userType == "Farmer"
          );
          setFarmer(getAmountFarmers);
          // // setFarmer(getAmountFarmers);
          console.log("farmer", farmer);
          console.log("user", user);

          setLoading(false);
        });
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (userType == "admin") {
      setAdmin(true);
    }

    const getProducts = async () => {
      setLoading(true);

      await fetch(`${process.env.REACT_APP_API}/product/get-product`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          let data = res.data;
          let dataSC = res.dataSC;
          // console.log(dataSC);
          dataSC = dataSC.filter((p) => p.status != -1);
          // console.log(`product has user id: `, dataSC);
          setDataSC(dataSC);
          data = data.filter((p) => p.status != -1);
          // console.log(`product has user id: `, data);
          setData(data);

          let tracking = data;
          tracking = tracking.filter(
            (t) => t.tracking && t.tracking.length != 0
          );
          // console.log(`tracking: `, tracking);
          setTracking(tracking);
          tracking.forEach((track, index) => {
            temp += tracking[index].tracking.length;
          });

          setLength(temp);
          // setData(dataSC);
        });

      setLoading(false);
    };

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
    return stableSort(filterFn.fn(dataSC), getComparator(order, orderBy)).slice(
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

  return admin ? (
    <Box
      sx={{
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
          flexDirection: { xs: "row", md: "row" },
          justifyContent: "right",
          alignItems: "center",
          marginTop: { xs: "20px" },
          marginBottom: { xs: "20px" },
        }}
      >
        <Button
          sx={{
            // marginRight: { xs: "10px"},
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: { xs: "5rem", md: "5rem" },
            minHeight: { xs: "2rem", md: "2rem" },
            color: "black",
            borderRadius: "10px",
            backgroundColor: "#ffdd72",
            ":hover": {
              backgroundColor: "#ffd54f",
            },
          }}
          onClick={() => {
            window.location.href = "/encreateprocess";
          }}
        >
          <CardContent>
            {/* <QrCode2RoundedIcon
              sx={{ fontSize: { xs: "5rem", md: "10rem" } }}
            /> */}
            <Typography>Create Process</Typography>
          </CardContent>
        </Button>
        <Button
          variant="contained"
          sx={{
            marginLeft: { xs: "15px" },
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: { xs: "5rem", md: "5rem" },
            minHeight: { xs: "2rem", md: "2rem" },
            color: "black",
            borderRadius: "10px",
            backgroundColor: "#ffdd72",
            ":hover": {
              backgroundColor: "#ffd54f",
              // color: "#fff",
            },
          }}
          onClick={() => {
            window.location.href = "/listofprocesses";
          }}
        >
          <CardContent>
            {/* <AutorenewRoundedIcon
              sx={{ fontSize: { xs: "5rem", md: "10rem" } }}
            /> */}
            <Typography>List of Processes</Typography>
          </CardContent>
        </Button>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          marginBottom: 3,
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total of users"
            total={user.length}
            // color="warning"
            icon={"ant-design:android-filled"}
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              backgroundColor: "#fffde7",
              maxWidth: { xs: "28rem", sm: "20rem", md: "28rem" },
              borderRadius: "10px",
              // marginRight: "5px",
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total of farmers"
            total={farmer.length}
            // color="warning"
            icon={"ant-design:android-filled"}
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              backgroundColor: "#fffde7",
              maxWidth: { xs: "28rem", sm: "20rem", md: "28rem" },
              borderRadius: "10px",
              // marginRight: "5px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total of products"
            total={data.length}
            icon={"ant-design:android-filled"}
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              backgroundColor: "#fffde7",
              maxWidth: { xs: "28rem", sm: "20rem", md: "28rem" },
              borderRadius: "10px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total trackings"
            total={length}
            // color="warning"
            icon={"ant-design:apple-filled"}
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              backgroundColor: "#fffde7",
              maxWidth: { xs: "28rem", sm: "20rem", md: "28rem" },
              borderRadius: "10px",
            }}
          />
        </Grid>
      </Grid>
      {/* </Box> */}
      {/* <Box sx={{display:'flex', margin: '10px'}} height="50vh">
        <BarChart />
        <LineChart />
      </Box> */}
      <Card>
        <TableContainer
          sx={{
            width: "100%",
            borderRadius: "5px",
          }}
        >
          <Table>
            <TableHead>
              {headCell.map((item) => (
                <StyleTableCell
                  key={item.id}
                  sx={
                    item.label == "Product ID" || item.label == "User ID"
                      ? { display: { xs: "none", md: "table-cell" } }
                      : null
                  }
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
                </StyleTableCell>
              ))}
            </TableHead>
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <StyledTableRow key={index + 1}>
                  <StyleTableCell>{index + 1}</StyleTableCell>
                  <StyleTableCell>{item.name}</StyleTableCell>
                  <StyleTableCell
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {item.pid}
                  </StyleTableCell>
                  <StyleTableCell
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {item.uid}
                  </StyleTableCell>
                  <StyleTableCell>{item.address}</StyleTableCell>
                  <StyleTableCell>
                    {item.status == 0
                      ? "CREATED"
                      : item.status == 1
                      ? "UPDATED"
                      : item.status == 2
                      ? "DELETED"
                      : item.status == 3
                      ? "DELIVERIED"
                      : "error"}
                  </StyleTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={dataSC.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>{" "}
      </Card>
    </Box>
  ) : (
    <Home />
  );
}
