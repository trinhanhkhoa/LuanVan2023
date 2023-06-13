// @mui
import PropTypes from "prop-types";
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  ImageList,
  Box,
  Link,
  ImageListItem,
} from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";
// utils
import { fDateTime } from "../utils/formatTime";

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    userId: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.array,
    type: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { type, title, time, userId, url, description, images } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === "order1" && "primary") ||
            (type === "order2" && "success") ||
            (type === "order3" && "info") ||
            (type === "order4" && "warning") ||
            "error"
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          UserId: {userId}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Check on Etherscan:{" "}
          <Link
            underline="hover"
            onClick={() => {
              window.location.href = `${url}`;
            }}
          >
            Information was verified on Blockchain
          </Link>{" "}
        </Typography>
        <ImageListItem>
          {/* {images && images.map((image, idx) => {
              return <img src={image} height={200} />;
            })} */}

          <img src={images[1]} height={200} />
        </ImageListItem>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Description: {description}
        </Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
