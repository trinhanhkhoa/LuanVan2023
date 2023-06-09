import React, { useState, useEffect } from "react";
import "./List.css";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
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
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "../../../components/Popup";
import ConfirmNotice from "../../../components/Try/ConfirmNotice";
import { Card } from "reactstrap";

const headCell = [
  { id: "id", label: "No", disableSorting: true },
  { id: "name", label: "Name" },
  { id: "length", label: "Tracking" },
  { id: "time", label: "End time" },
  { id: "button", label: "" },
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

function List() {
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
  const tokenData = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [IdPopup, setIdPopup] = useState("");

  useEffect(() => {
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
          // console.log(res.data);
          let data = res.data;

          data = data.filter((p) => p.userId == id);
          console.log(`product has user id: `, data);

          setData(data);
        });

      setLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getTracking = async () => {
      setLoading(true);

      await fetch(
        `https://backend.teamluanvan.software/tracking/get-tracking/${id}`,
        {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          let data = res.data;

          data = data.filter((p) => p.productID == id);
          // console.log(`product has user id: `, data);

          setData(data);
        });

      setLoading(false);
    };

    getTracking();
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
        console.log(target);
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
        <Typography variant="h3" sx={{ fontSize: { xs: "20px", md: "35px" } }}>
          LIST OF PRODUCTS
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            borderRadius: "10px",
            width: { xs: "120px", md: "180px" },
            height: { xs: "30px", md: "50px" },
            fontSize: { xs: "12px", md: "16px" },
          }}
          onClick={() => {
            window.location.href = "/createqr";
          }}
        >
          Add product
        </Button>
      </Box>
      <Card
        sx={{ border: 0 }}
      >
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
            {recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map((item, index) => (
              <StyledTableRow key={index + 1}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell>{item.tracking.length}</StyledTableCell>
                <StyledTableCell>{item.time}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box>
                    <Tooltip title="Detail">
                      <IconButton
                        color="info"
                        onClick={() => {
                          window.location.href = `/product/${item._id}`;
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton
                        color="success"
                        onClick={() => {
                          window.location.href = `/updateproduct/${item._id}`;
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setOpenPopup(true);
                          setIdPopup(item._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Popup
                      title="Confirm Delete"
                      openPopup={openPopup}
                      setOpenPopup={setOpenPopup}
                    >
                      <ConfirmNotice id={IdPopup} />
                    </Popup>
                  </Box>
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
        </TableContainer> </Card>
    </Container>
  );
}

export default List;
