import React, { useState, useEffect } from "react";
import "./Process.css";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Card,
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
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Loading from "../../../components/Loading";
import SearchIcon from "@mui/icons-material/Search";

const headCell = [
  { id: "id", label: "STT", disableSorting: true },
  { id: "name", label: "Tên sản phẩm" },
  { id: "time", label: "Ngày tạo" },
  { id: "button", label: "" },
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

function Process() {
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const params = useParams();

  const getProcesses = async () => {
    setLoading(true);

    await fetch(`${process.env.REACT_APP_API}/process/get-processes`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.data.map((obj) => ({
          ...obj,
          stageProcess: {
            ...obj.stageProcess,
            _id: obj._id,
          },
        }));

        let arr = [];
        let DATA = updatedData;
        DATA = updatedData.forEach((item) => {
          arr.push(item.stageProcess);
        });
        setDataTable(arr);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProcesses();
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
    return stableSort(
      filterFn.fn(dataTable),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "28px", md: "30px" }, mb: 2 }}
      >
        Danh sách các quy trình
      </Typography>
      <Card sx={{ p: 3, borderRadius: "10px" }}>
        <Toolbar>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm quy trình"
            // name={name}
            // value={value}
            onChange={handleSearch}
            sx={{
              width: { xs: "100%", md: "30%" },
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
                  sx={
                    item.label == "Ngày tạo"
                      ? { display: { xs: "none", md: "table-cell" } }
                      : null
                  }
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
                  <StyledTableCell
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {item.timeCreate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      color="info"
                      variant="contained"
                      onClick={() => {
                        window.location.href = `/processdetail/${item._id}`;
                      }}
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      Chi tiết
                    </Button>
                    <Tooltip title="Detail">
                      <IconButton
                        color="info"
                        onClick={() => {
                          window.location.href = `/processdetail/${item._id}`;
                        }}
                        sx={{ display: { xs: "block", md: "none" } }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
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

export default Process;
