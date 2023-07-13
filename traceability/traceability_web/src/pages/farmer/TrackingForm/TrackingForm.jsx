import React, { useState, useEffect } from "react";
import { uploadImage } from "../../../components/MultiUpload";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  InputAdornment,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import MuiAlert from "@mui/material/Alert";
import { useForm, Form } from "../../../components/Try/useForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TrackingForm(props) {
  const id = props;
  // console.log("id", id.processId);
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [img, setImg] = useState([]);
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [amountOfWater, setAmountOfWater] = useState("");
  const [amountOfFertilizer, setAmountOfFertilizer] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const today = new Date();
  const [time, setTime] = useState(today);

  const handleChange = (date) => {
    setTime(date);
  };
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
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

  const params = useParams();

  const tokenData = window.localStorage.getItem("token");

  const getProcess = async () => {
    setLoading(true);
    await fetch(
      `${process.env.REACT_APP_API}/process/get-process/${id.processId}`,
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

  const CustomInput = ({ value, onClick }) => (
    <TextField
      type="text"
      fullWidth
      required
      value={value}
      onClick={onClick}
      placeholder="Chọn thời gian"
      readOnly
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <CalendarMonthRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
  );

  useEffect(() => {
    getProcess();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("SUBMITING!!!");

    await fetch(
      `${process.env.REACT_APP_API}/tracking/add-tracking/${params.id}`,
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "x-auth-token": tokenData,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          time: time.toLocaleDateString("en-GB"),
          images: links,
          description,
          notes,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) setSnackbarState(true);
        else setSnackbarState(false);

        setTimeout(() => {
          window.location.href = `/product/${params.id}`;
        }, 1500);
      });
    setLoading(false);
  };

  const handleDelivery = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("DELIVERING!!!");

    await fetch(
      `${process.env.REACT_APP_API}/tracking/deliveried/${params.id}`,
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "x-auth-token": tokenData,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          time: time.toLocaleDateString("en-GB"),
          images: links,
          description,
          notes,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) setSnackbarState(true);
        else setSnackbarState(false);

        setTimeout(() => {
          window.location.href = `/product/${params.id}`;
        }, 1500);
      });
    setLoading(false);
  };

  return (
    <Container fixed sx={{ justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
        }}
        component="form"
        onSubmit={name !== step[5] ? handleSubmit : handleDelivery}
      >
        <Loading loading={loading} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Chọn giai đoạn <b className="requireDot">*</b>
            </label>
            <Autocomplete
              disablePortal
              value={name}
              onChange={(e, newValue) => {
                setName(newValue);
              }}
              id="combo-box-demo"
              options={step}
              sx={{ width: { xs: 350, md: 600 } }}
              renderInput={(params) => (
                <TextField
                  required
                  value={name}
                  onChange={(e, newValue) => {
                    setName(newValue);
                  }}
                  variant="outlined"
                  name="name"
                  placeholder="Tên giai đoạn"
                  sx={{
                    width: { xs: 350, md: 600 },
                    borderRadius: "20%",
                    mb: 2,
                  }}
                  {...params}
                />
              )}
            />
            {name === step[4] ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="">Sản lượng</label>
                <TextField
                  required
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setNotes(["Sản lượng: " + e.target.value]);
                  }}
                  variant="outlined"
                  placeholder={processStage.stageHarvest.quantity}
                  sx={{
                    width: { xs: 350, md: 600 },
                    borderRadius: "20%",
                    mb: 2,
                  }}
                />
              </Box>
            ) : null}
            {name === step[5] ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="">Nơi thu mua</label>
                <TextField
                  required
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                    setNotes(["Nơi thu mua" + e.target.value]);
                  }}
                  variant="outlined"
                  placeholder={processStage.stageSell.purchasingUnit}
                  sx={{
                    width: { xs: 350, md: 600 },
                    borderRadius: "20%",
                    mb: 2,
                  }}
                />
              </Box>
            ) : null}
            {name === step[1] ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="">Thời lượng tưới nước</label>
                <TextField
                  required
                  value={amountOfWater}
                  onChange={(e) => {
                    setAmountOfWater(e.target.value);
                    setNotes([
                      "Lượng phân bón: " + amountOfFertilizer,
                      "Thời lượng tưới nước: " + e.target.value,
                    ]);
                  }}
                  variant="outlined"
                  placeholder={processStage.stagePlantCare.water}
                  sx={{
                    width: { xs: 350, md: 600 },
                    borderRadius: "20%",
                    mb: 2,
                  }}
                />

                <label htmlFor="">Lượng phân bón</label>
                <TextField
                  required
                  value={amountOfFertilizer}
                  onChange={(e) => {
                    setAmountOfFertilizer(e.target.value);
                    setNotes([
                      "Lượng phân bón: " + e.target.value,
                      "Thời lượng tưới nước: " + amountOfWater,
                    ]);
                  }}
                  variant="outlined"
                  placeholder={processStage.stagePlantCare.fertilizer}
                  sx={{ width: { xs: 350, md: 600 }, borderRadius: "20%" }}
                />
              </Box>
            ) : null}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Thời gian <b className="requireDot">*</b>
            </label>
            <DatePicker
              name="time"
              required
              fullWidth
              selected={time}
              minDate={today}
              onChange={handleChange}
              customInput={<CustomInput />}
              dateFormat="dd/MM/yyyy"
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Hình ảnh <b className="requireDot">*</b>
            </label>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed #1475cf",
                borderRadius: "10px",
                height: "200px",
                width: "450px",
                cursor: "pointer",
              }}
              onClick={() => {
                document.querySelector(".input-field").click();
              }}
            >
              <input
                className="input-field"
                type="file"
                accept="image/*"
                multiple
                required
                hidden
                onChange={async (e) => {
                  e.preventDefault();

                  const MAX_LENGTH = 3;
                  if (Array.from(e.target.files).length > MAX_LENGTH) {
                    e.preventDefault();
                    alert(`Cannot upload files more than ${MAX_LENGTH}`);
                    return;
                  }

                  setImages(e.target.files);
                  // console.log(e.target.files);
                  setLoading(true);

                  try {
                    let arr = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      const data = await uploadImage(e.target.files[i]);
                      arr.push(data.url);
                    }
                    setLinks(arr);
                  } catch (error) {
                    console.log(error);
                  }
                  setLoading(false);
                }}
              />
              {links.length === 0 ? (
                <Box>
                  <CloudUploadIcon color="primary" sx={{ fontSize: 100 }} />
                  <Typography color={"#b0bec5"}>Chọn hình ảnh</Typography>
                </Box>
              ) : (
                <ImageList
                  sx={{
                    width: { xs: 400, md: 400 },
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  cols={3}
                  rowHeight={164}
                >
                  {links &&
                    links.map((item) => {
                      return (
                        <ImageListItem
                          key={item}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={item}
                            width={100}
                            height={100}
                            className="image-link"
                          />
                        </ImageListItem>
                      );
                    })}
                </ImageList>
              )}
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <label>
              Mô tả <b className="requireDot">*</b>
            </label>
            <Box sx={{ width: { xs: 350, md: 600 } }}>
              <TextareaAutosize
                maxRows={20}
                aria-label="maximum height"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", minHeight: "100px" }}
              />
            </Box>
          </Box>
          <Box>
            {name !== step[5] ? (
              <Button
                type="submit"
                variant="contained"
                color="warning"
                sx={{ borderRadius: "10px" }}
              >
                Xác nhận
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="warning"
                sx={{ borderRadius: "10px" }}
              >
                Vận chuyển
              </Button>
            )}
          </Box>
        </Box>

        <Snackbar open={snackbarState} autoHideDuration={1000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Thêm nhật ký thành công
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default TrackingForm;
