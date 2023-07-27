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
import Popup from "../../../components/Popup";
import ProductTracking from "../../farmer/ProductTracking/ProductTracking";
import Product from "../../farmer/Product/Product";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const headCell = [
  { id: "id", label: "STT", disableSorting: true },
  { id: "name", label: "Sản phẩm" },
  { id: "length", label: "Nhật ký" },
  { id: "time", label: "Ngày tạo" },
  { id: "status", label: "Trạng thái" },
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
  const [dataSC, setDataSC] = useState([]);

  const [dataUser, setDataUser] = useState([]);
  const [idPopup, setIdPopup] = useState("");
  const [processIdPopup, setProcessIdPopup] = useState("");
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
  const [openPopupProduct, setOpenPopupProduct] = useState(false);
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
    setLength(data.products.length);
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
          // console.log(res.dataSC);
          let data = res.data;

          data = data.filter((p) => p.userId == params.id);
          // console.log(data);

          let dataSC = res.dataSC;
          dataSC = dataSC.filter((p) => p.uid == params.id);
          console.log(`SC: `, dataSC);

          data.forEach((item) => {
            const statusItem = dataSC.find(
              (scItem) => scItem.pid === item.productId
            );
            item.status = statusItem ? statusItem.status : -1;
          });

          console.log(`data: `, data);

          setDataSC(dataSC);
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
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "25px", md: "35px" },
          marginBottom: 2,
          marginTop: 3,
        }}
      >
        Sản phẩm của {dataUser.name}
      </Typography>
      <Card sx={{ p: 3, borderRadius: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "flex-end" },
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Card
            sx={{
              backgroundColor: "rgba(71, 167, 162, 0.12)",
              padding: "1%",
              mt: { xs: 2, md: 0 },
              width: { xs: "100%", md: "20%" },
            }}
          >
            <Typography>
              Tên: <b>{dataUser.name}</b>
            </Typography>
            <Typography>
              Email: <b>{dataUser.email}</b>
            </Typography>
            <Typography>
              ID: <b>{dataUser._id}</b>
            </Typography>
            <Typography>
              Vai trò: <b>{dataUser.userType}</b>
            </Typography>
            <Typography>
              Số lượng sản phẩm: <b>{length} </b>
              <Tooltip title="Sản phẩm đang trồng và thu hoạch">
                <InfoOutlinedIcon />
              </Tooltip>
            </Typography>
          </Card>
          <Toolbar>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm sản phẩm"
              onChange={handleSearch}
              sx={{
                width: { xs: "100%", md: "100%" },
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
                  sx={
                    item.label == "Nhật ký" || item.label == "Ngày tạo"
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
              {recordsAfterPagingAndSorting().map((item, index) => (
                <StyledTableRow key={index}>
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
                  <StyledTableCell>
                    <Button
                      maxWidth={false}
                      variant="contained"
                      color={
                        item.status == 0
                          ? "success"
                          : item.status == 1
                          ? "warning"
                          : item.status == 2
                          ? "error"
                          : item.status == 3
                          ? "info"
                          : "primary"
                      }
                      sx={{
                        ml: 2,
                        mb: 1,
                        // padding: 0.5,
                        minWidth: 100,
                        borderRadius: 3,
                        textAlign: "center",
                        fontSize: { xs: "15px", md: "15px" },
                      }}
                    >
                      {" "}
                      {item.status == 0
                        ? "Đã tạo"
                        : item.status == 1
                        ? "Đã cập nhật"
                        : item.status == 2
                        ? "Đã xóa"
                        : item.status == 3
                        ? "Đã vận chuyển"
                        : "Lỗi"}{" "}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      sx={{ mr: 2 }}
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setIdPopup(item.productId);
                        setProcessIdPopup(item.processId);
                        setOpenPopupProduct(true);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                    <Popup
                      title="Nhật ký"
                      openPopup={openPopupProduct}
                      setOpenPopup={setOpenPopupProduct}
                    >
                      <Product pid={idPopup} />
                    </Popup>
                    <IconButton
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        setIdPopup(item.productId);
                        setProcessIdPopup(item.processId);
                        setOpenPopupTracking(true);
                      }}
                    >
                      <MenuBookIcon />
                    </IconButton>
                    <Popup
                      title="Nhật ký"
                      openPopup={openPopupTracking}
                      setOpenPopup={setOpenPopupTracking}
                    >
                      <ProductTracking
                        id={idPopup}
                        processId={processIdPopup}
                      />
                    </Popup>
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
