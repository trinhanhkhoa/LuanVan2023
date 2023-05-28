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
  { id: "status", label: "Status (Is updated ?)" },
  { id: "time", label: "End time" },
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

export default function Home() {
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

  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");

  useEffect(() => {
    const tokenIsValid = () => {
      fetch("https://backend.teamluanvan.software/tokenIsValid", {
        method: "POST",
        crossDomain: true,
        headers: {
          "x-auth-token": tokenData,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("token", data);
        });
    };

    tokenIsValid();

    const getProduct = async () => {
      setLoading(true);

      await fetch(`https://backend.teamluanvan.software/product/get-product`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          let data = res.data;

          data = data.filter((p) => p.userId == id);
          console.log(`product has user id: `, data);

          setData(data);
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

    console.log(`sroted `, sorted);
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
    <div className="home">
      <Carousel class="carousel-home" showThumbs={false}>
        <div className="news_img">
          <img src={news_img} />
        </div>
        <div className="news_img">
          <img src={news_img} />
        </div>
      </Carousel>
      <div className="home-content">
        <Button
          sx={{
            borderRadius: "20px",
            margin: "3rem",
            border: "1px solid #000",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: "52rem",
            minHeight: "20rem",
            color: "black",
            borderRadius: "20px",
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "#2ECC71",
              color: "#fff",
            },
          }}
          onClick={() => {
            window.location.href = "/createqr";
          }}
        >
          <CardContent>
            <TbIcons.TbQrcode className="qr-icon-home" />
            <Typography>Create product</Typography>
          </CardContent>
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            margin: "3rem",
            border: "1px solid #000",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            minWidth: "52rem",
            minHeight: "20rem",
            color: "black",
            borderRadius: "20px",
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "#2ECC71",
              color: "#fff",
            },
          }}
          onClick={() => {
            window.location.href = "/process";
          }}
        >
          <CardContent>
            <MdIcons.MdChangeCircle className="process-icon" />
            <Typography>Watch process</Typography>
          </CardContent>
        </Button>
      </div>
      <Loading loading={loading} />

      <Box sx={{ width: "95%", borderRadius: "10px" }}>
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
            {
              recordsAfterPagingAndSorting().map((item, index) => (
                <StyledTableRow key={index + 1}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.status}</StyledTableCell>
                  <StyledTableCell>{item.time}</StyledTableCell>
                </StyledTableRow>
              ))
            }
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
    </div>
  );
}
