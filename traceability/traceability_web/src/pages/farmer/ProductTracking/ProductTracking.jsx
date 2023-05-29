import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import "./ProductTracking.css";

import ReactReadMoreReadLess from "react-read-more-read-less";
import Loading from "../../../components/Loading";
import { InputAdornment, TextField, Toolbar } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function ProductTracking(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const {id} = props;
  console.log(id);

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTracking = async () => {
      setLoading(true);

      await fetch(`https://backend.teamluanvan.software/tracking/get-tracking/${id}`, {
        method: "GET",
        headers: {
          "x-auth-token": tokenData,
        },
      })
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

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const filterSearching = () => {
    return filterFn.fn(data);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        // console.log(target);
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
      className="product-tracking"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "left",
        minWidth: 500,
        minHeight: "80vh"
      }}
    >
      <Loading loading={loading} />
      <Box>
        <Toolbar>
          <TextField
            variant="outlined"
            label="Search tracking"
            onChange={handleSearch}
            sx={{ width: "100%", marginBottom: "20px", marginLeft: "0" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
        <Stepper orientation="vertical">
          {filterSearching().length != 0 ? (
            filterSearching().map((item, index) => (
              <Step key={index}>
                <Box>
                  <StepLabel>Name: {item.name}</StepLabel>
                  <Box>
                    <Typography>Time: {item.time}</Typography>
                    <Typography>Address: {item.address}</Typography>
                    <Typography>
                      Check tracking:{" "}
                      <Link
                        underline="hover"
                        onClick={() => {
                          window.location.href = `${item.url}`;
                        }}
                      >
                        Click me
                      </Link>{" "}
                    </Typography>

                    <Box>
                      {item.images &&
                        item.images.map((image, idx) => {
                          return <img src={image} height={200} />;
                        })}
                    </Box>
                    <Typography>
                      {" "}
                      Description:{" "}
                      <ReactReadMoreReadLess
                        readMoreClassName="readMoreClassName"
                        readLessClassName="readMoreClassName"
                        charLimit={50}
                        readMoreText={<ExpandMoreRoundedIcon />}
                        readLessText={<ExpandLessRoundedIcon />}
                      >
                        {item.description}
                      </ReactReadMoreReadLess>{" "}
                    </Typography>
                  </Box>
                </Box>
              </Step>
            ))
          ) : (
            <Typography> Have not updated any tracking yet! </Typography>
          )}
        </Stepper>
      </Box>

      {/* : <Typography> null </Typography>} */}
    </Box>
  );
}
