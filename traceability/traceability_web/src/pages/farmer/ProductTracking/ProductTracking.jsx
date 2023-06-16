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
import {
  Button,
  Grid,
  InputAdornment,
  StepContent,
  TextField,
  Toolbar,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "rsuite/dist/rsuite.min.css";
import Steps from "rsuite/Steps";
import { Timeline, Event } from "react-timeline-scribble";

import AppOrderTimeline from "../../../components/AppOrderTimeLine";
import { fDateTime } from "../../../utils/formatTime";

export default function ProductTracking(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const { id, trackingLength } = props;
  console.log("id: ", id, " length: ", trackingLength);

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTracking = async () => {
      setLoading(true);

      await fetch(
        // `${process.env.REACT_APP_API}/tracking/get-tracking/${id}`,
        `${process.env.REACT_APP_API}/tracking/get-tracking/${id}`,

        {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.data);
          let data = res.data;

          data = data.filter((p) => p.productId == id);
          console.log(`product has user id: `, data);

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
    console.log(data);
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
        minHeight: "80vh",
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
        <Timeline>
          {filterSearching().length != 0 ? (
            filterSearching().map((item, index) => (
              <Event interval={item.name}>
                <Typography>Description: {item.description}</Typography>
                <Box>
                  Details:
                  {item.notes &&
                    item.notes.map((note) => {
                      return <Typography>{note}</Typography>;
                    })}
                </Box>
                <Box>
                  {item.images &&
                    item.images.map((image, idx) => {
                      return <img src={image} height={200} />;
                    })}
                </Box>
              </Event>
            ))
          ) : (
            <Typography> Have not updated any tracking yet! </Typography>
          )}
        </Timeline>
      </Box>
    </Box>
  );
}
