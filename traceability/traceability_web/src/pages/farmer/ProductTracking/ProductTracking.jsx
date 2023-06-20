import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import "./ProductTracking.css";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Loading from "../../../components/Loading";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Link,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "rsuite/dist/rsuite.min.css";
// import { Timeline, Event } from "react-timeline-scribble";

import { fDateTime } from "../../../utils/formatTime";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function ProductTracking(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const { id, processId } = props;

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("userId");
  const userId = window.localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [processStage, setProcessStage] = useState({
    stageProcess: {
      name: "",
      description: "",
      images: [],
      timeCreate: "",
    },
    stagePlantSeeds: { name: "", description: "" },
    stagePlantCare: { name: "", description: "", water: "", fertilizer: "" },
    stageBloom: { name: "", description: "" },
    stageCover: { name: "", description: "" },
    stageHarvest: { name: "", description: "", quantity: "" },
    stageSell: { name: "", description: "", purchasingUnit: "" },
  });
  const [step, setStep] = useState([]);

  useEffect(() => {
    const getTracking = async () => {
      setLoading(true);

      await fetch(
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
          let data = res.data;

          data = data.filter((p) => p.productId == id);
          setData(data);
        });

      setLoading(false);
    };

    getTracking();
  }, []);

  useEffect(() => {
    const getProcess = async () => {
      setLoading(true);
      await fetch(
        `${process.env.REACT_APP_API}/process/get-process/${processId}`,
        {
          method: "GET",
          headers: {
            "x-auth-token": tokenData,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          let data = res.data;
          setProcessStage({
            stageProcess: {
              name: data.stageProcess.name,
              description: data.stageProcess.description,
              images: data.stageProcess.images,
              timeCreate: data.stageProcess.timeCreate,
            },
            stagePlantSeeds: {
              name: data.stagePlantSeeds.name,
              description: data.stagePlantSeeds.description,
            },
            stagePlantCare: {
              name: data.stagePlantCare.name,
              description: data.stagePlantCare.description,
              water: data.stagePlantCare.water,
              fertilizer: data.stagePlantCare.fertilizer,
            },
            stageBloom: {
              name: data.stageBloom.name,
              description: data.stageBloom.description,
            },
            stageCover: {
              name: data.stageCover.name,
              description: data.stageCover.description,
            },
            stageHarvest: {
              name: data.stageHarvest.name,
              description: data.stageHarvest.description,
              quantity: data.stageHarvest.quantity,
            },
            stageSell: {
              name: data.stageSell.name,
              description: data.stageSell.description,
              purchasingUnit: data.stageSell.purchasingUnit,
            },
          });
          setStep([
            data.stagePlantSeeds.name,
            data.stagePlantCare.name,
            data.stageBloom.name,
            data.stageCover.name,
            data.stageHarvest.name,
            data.stageSell.name,
          ]);

          setLoading(false);
        });
    };

    getProcess();
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
      <Toolbar>
        <TextField
          variant="outlined"
          label="Tìm kiếm nhật ký"
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

      {filterSearching().length != 0 ? (
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {filterSearching().map((item, index) => (
            <TimelineItem>
              {
                <TimelineSeparator>
                  {item.name == step[0] ? (
                    <TimelineDot sx={{ backgroundColor: "#82cd47" }} />
                  ) : item.name == step[1] ? (
                    <TimelineDot sx={{ backgroundColor: "#ffd740" }} />
                  ) : item.name == step[2] ? (
                    <TimelineDot sx={{ backgroundColor: "#47c4cd" }} />
                  ) : item.name == step[3] ? (
                    <TimelineDot sx={{ backgroundColor: "#2811d5" }} />
                  ) : item.name == step[4] ? (
                    <TimelineDot sx={{ backgroundColor: "#9640ff" }} />
                  ) : item.name == step[5] ? (
                    <TimelineDot sx={{ backgroundColor: "#ff4066" }} />
                  ) : null}
                  <TimelineConnector />
                </TimelineSeparator>
              }

              <TimelineContent>
                <Typography
                  maxWidth={false}
                  variant="h5"
                  sx={{
                    padding: 1,
                    minWidth: 200,
                    textAlign: "center",
                    borderRadius: 2,
                    backgroundColor:
                      item.name == step[0]
                        ? "#82cd47"
                        : item.name == step[1]
                        ? "#ffd740"
                        : item.name == step[2]
                        ? "#47c4cd"
                        : item.name == step[3]
                        ? "#2811d5"
                        : item.name == step[4]
                        ? "#9640ff"
                        : item.name == step[5]
                        ? "#ff4066"
                        : null,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography sx={{ lineHeight: 2}}>Thời gian cập nhật: {item.time}</Typography>
                <Typography sx={{ lineHeight: 2}}>
                  Theo dõi đã xác thực: <Link href={item.url}>Xem tại đây!</Link>
                </Typography>
                <ReactReadMoreReadLess
                  readMoreClassName="readMoreClassName"
                  readLessClassName="readMoreClassName"
                  charLimit={200}
                  readMoreText="Xem thêm"
                  readLessText="Thu lại"
                >
                  {item.description}
                </ReactReadMoreReadLess>
                <Box sx={{ lineHeight: 2}}>
                  Chi tiết:
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
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <Typography> Have not updated any tracking yet! </Typography>
      )}
    </Box>
  );
}
