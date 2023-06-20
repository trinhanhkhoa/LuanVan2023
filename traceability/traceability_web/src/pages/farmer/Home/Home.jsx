import React, { useState, useEffect } from "react";
import "./Home.css";
import news_img from "../../../asserts/news.png";

import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Box,
  Button,
  Card,
  CardContent,
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
import { Grid } from "@mui/material";
import AppWidgetSummary from "../../../components/HeaderCard/HeaderCard";

const headCell = [
  { id: "id", label: "STT", disableSorting: true },
  { id: "name", label: "Tên sản phẩm" },
  // { id: "status", label: "Status (Is updated ?)" },
  { id: "time", label: "Ngày tạo" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#aed581",
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

export default function Home() {
  const [data, setData] = useState([]);
  const [tracking, setTracking] = useState([]);
  let temp = 0;
  const [length, setLength] = useState(0);
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

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  useEffect(() => {
    const getProduct = async () => {
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

          data = data.filter((p) => p.userId == id);
          // console.log(`product has user id: `, data);

          let tracking = data;
          tracking = tracking.filter((t) => t.tracking.length != 0);
          // console.log(`tracking: `, tracking);

          setTracking(tracking);
          setData(data);

          tracking.forEach((track, index) => {
            temp += tracking[index].tracking.length;
          });
          // console.log("temp", temp);

          setLength(temp);
        });

      setLoading(false);
    };

    getProduct();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    if (!array) {
      alert("array is null");
      return;
    }

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
    const sorted = stableSort(
      filterFn.fn(data),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return sorted;
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
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <Loading loading={loading} />

        <Button
          sx={{
            marginRight: { xs: "10px", md: "10px" },
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: { xs: "5rem", md: "5rem" },
            minHeight: { xs: "2rem", md: "2rem" },
            color: "black",
            borderRadius: "10px",
            backgroundColor: "#D0F5BE",
            ":hover": {
              backgroundColor: "#B6E2A1",
              color: "black",
            },
          }}
          onClick={() => {
            window.location.href = "/createqr";
          }}
        >
          <CardContent>
            {/* <QrCode2RoundedIcon sx={{ fontSize: { xs: "1rem", md: "4rem", margin: 5 } }} /> */}
            <Typography> Tạo sản phẩm</Typography>
          </CardContent>
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            marginLeft: { xs: "10px", md: "10px" },
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: { xs: "5rem", md: "5rem" },
            minHeight: { xs: "2rem", md: "2rem" },
            color: "black",
            backgroundColor: "#D0F5BE",
            ":hover": {
              backgroundColor: "#B6E2A1",
              color: "black",
            },
          }}
          onClick={() => {
            window.location.href = "/process";
          }}
        >
          <CardContent>
            {/* <AutorenewRoundedIcon
              sx={{ fontSize: { xs: "1rem", md: "4rem", margin: 5 } }}
            /> */}
            <Typography> Danh sách quy trình</Typography>
          </CardContent>
        </Button>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          marginBottom: 4,
          marginTop: 1,
        }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              fontSize: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              backgroundColor: "#D0F5BE",
              maxWidth: "60rem",
              minHeight: { xs: "5rem", md: "16rem" },
              borderRadius: "10px",
              // marginRight: "10px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "18px", md: "30px" } }}
            >
              Chào mừng bạn đã đến với Traceability Agriculture
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <AppWidgetSummary
              title="Tổng số sản phẩm"
              total={data.length}
              color="success"
              icon={"ant-design:android-filled"}
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                backgroundColor: "#D0F5BE",
                maxWidth: { xs: "28rem", sm: "20rem", md: "28rem" },
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <AppWidgetSummary
              title="Tổng số nhật ký"
              total={length}
              color="success"
              icon={"ant-design:apple-filled"}
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                backgroundColor: "#D0F5BE",
                maxWidth: { xs: "28rem", sm: "20rem", md: "28rem" },
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>
      </Grid>

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
                <StyledTableRow key={index + 1}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  {/* <StyledTableCell>{item.status}</StyledTableCell> */}
                  <StyledTableCell>{item.time}</StyledTableCell>
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
        </TableContainer>
      </Card>
    </Box>
  );
}
