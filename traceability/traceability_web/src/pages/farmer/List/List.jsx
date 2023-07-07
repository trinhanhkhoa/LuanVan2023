import React, { useState, useEffect } from "react";
import "./List.css";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Card,
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
  Menu,
  MenuItem,
  Fade 
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Loading from "../../../components/Loading";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "../../../components/Popup";
import ConfirmNotice from "../../../components/Try/ConfirmNotice";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const headCell = [
  { id: "id", label: "STT", disableSorting: true },
  { id: "name", label: "Tên sản phẩm" },
  { id: "length", label: "Số lượng nhật ký" },
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

function List() {
  const [data, setData] = useState([]);
  const [dataSC, setDataSC] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
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
          dataSC = dataSC.filter((p) => p.status != 3);

          data = data.filter((p) => p.userId == id);
          // console.log(data);
          // console.log(dataSC);

          const filteredArray = data.filter((item1) =>
            dataSC.some(
              (item2) => item2.pid === item1.productId && item2.status !== 3
            )
          );

          // console.log(filteredArray);

          setDataSC(dataSC);
          setData(data);
          setDataFilter(filteredArray);
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
    return stableSort(
      filterFn.fn(dataFilter),
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
        sx={{ fontSize: { xs: "30px", md: "35px" }, mb: 2 }}
      >
        Danh sách các sản phẩm
      </Typography>
      <Card sx={{ p: 3, borderRadius: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: "space-between",
          }}
        >
          <Toolbar>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm sản phẩm"
              onChange={handleSearch}
              sx={{
                width: { xs: "100%", md: "100%" },
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
          <Button
            variant="contained"
            color="success"
            sx={{
              borderRadius: "10px",
              width: { xs: "140px", md: "180px" },
              height: { xs: "40px", md: "40px" },
              fontSize: { xs: "12px", md: "16px" },
              backgroundColor: "#D0F5BE",
              marginBottom: "20px",
              color: "black",
              ":hover": {
                backgroundColor: "#B6E2A1",
              },
            }}
            onClick={() => {
              window.location.href = "/createqr";
            }}
          >
            {/* <AddIcon/> Tạo */}
            Thêm sản phẩm
          </Button>
        </Box>
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
                    item.label == "Ngày tạo" || item.label == "Số lượng nhật ký"
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
              {recordsAfterPagingAndSorting() &&
                recordsAfterPagingAndSorting().map((item, index) => (
                  <StyledTableRow key={index + 1}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {item.tracking.length}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {item.time}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={handleClose}>
                          <Tooltip title="Detail">
                            <IconButton
                              color="info"
                              onClick={() => {
                                window.location.href = `/product/${item.productId}`;
                              }}
                            >
                              <SearchIcon />
                            </IconButton>
                          </Tooltip>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Tooltip title="Edit">
                            <IconButton
                              color="success"
                              onClick={() => {
                                window.location.href = `/updateproduct/${item.productId}`;
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => {
                                setOpenPopup(true);
                                setIdPopup(item.productId);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </MenuItem>
                      </Menu>
                      <Box sx={{ display: { xs: "none", md: "table-cell" } }}>
                        <Tooltip title="Detail">
                          <IconButton
                            color="info"
                            onClick={() => {
                              window.location.href = `/product/${item.productId}`;
                            }}
                          >
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton
                            color="success"
                            onClick={() => {
                              window.location.href = `/updateproduct/${item.productId}`;
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
                              setIdPopup(item.productId);
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
        </TableContainer>{" "}
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
    </Container>
  );
}

export default List;
