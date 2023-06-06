import React, { useState, useEffect } from "react";
import "./EnHome.css";
import news_img from "../../../asserts/news.png";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import Home from "../../farmer/Home/Home";
import BarChart from "../../../components/BarChart";
import LineChart from "../../../components/LineChart";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import {
  Box,
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Loading from "../../../components/Loading";

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

export default function EnHome() {
  const [data, setData] = useState([]);
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

  const [admin, setAdmin] = useState(false);
  const userType = window.localStorage.getItem("userType");
  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  const onDisconnected = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    if (userType == "admin") {
      setAdmin(true);
    }

    const getProducts = async () => {
      setLoading(true);

      await fetch(`https://backend.teamluanvan.software/product/get-product`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.dataSC[1]);
          let data = res.data;
          let dataSC = res.dataSC;
          console.log(dataSC);
          dataSC = dataSC.filter((p) => p.status != -1);
          console.log(`product has user id: `, dataSC);

          setData(dataSC);
        });

      setLoading(false);
    };

    getProducts();
    console.log(admin);
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

  return admin ? (
    <Box className="en-home">
      <Box
        sx={{ display: { xs: "none", md: "block" }, marginTop: { xs: "0" } }}
      >
        <Carousel class="carousel-enhome" showThumbs={false}>
          <div className="news_img">
            <img src={news_img} />
          </div>
          <div className="news_img">
            <img src={news_img} />
          </div>
        </Carousel>
      </Box>

      <Loading loading={loading} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            borderRadius: "20px",
            margin: { xs: "10px", md: "3rem" },
            border: "1px solid #000",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: { xs: "25rem", md: "52rem" },
            minHeight: { xs: "10rem", md: "20rem" },
            color: "black",
            borderRadius: "20px",
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "#FFB100",
              color: "#fff",
            },
          }}
          onClick={() => {
            window.location.href = "/encreateprocess";
          }}
        >
          <CardContent>
            <QrCode2RoundedIcon
              sx={{ fontSize: { xs: "5rem", md: "10rem" } }}
            />
            <Typography>Create Process</Typography>
          </CardContent>
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            margin: { xs: "10px", md: "3rem" },
            border: "1px solid #000",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: { xs: "25rem", md: "52rem" },
            minHeight: { xs: "10rem", md: "20rem" },
            color: "black",
            borderRadius: "20px",
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "#FFB100",
              color: "#fff",
            },
          }}
          onClick={() => {
            window.location.href = "/listofprocesses";
          }}
        >
          <CardContent>
            <AutorenewRoundedIcon
              sx={{ fontSize: { xs: "5rem", md: "10rem" } }}
            />
            <Typography>Process information</Typography>
          </CardContent>
        </Button>
      </Box>
      {/* <Box sx={{display:'flex', margin: '10px'}} height="50vh">
        <BarChart />
        <LineChart />
      </Box> */}
      <Box sx={{ width: { xs: "90%", md: "95%" }, borderRadius: "10px" }}>
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
                <StyleTableCell sx={{ display: { xs: "none", md: "table-cell"} }}>
                  {item.pid}
                </StyleTableCell>
                <StyleTableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
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
          count={data.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  ) : (
    <Home />
  );
}
