// App.jsx

import React, { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  // Example notifications if API fails
  const sampleNotifications = [
    {
      id: 1,
      notification_type: "Event",
      message: "Hackathon Event Starts Tomorrow",
      viewed: false,
    },
    {
      id: 2,
      notification_type: "Result",
      message: "Mid Exam Results Released",
      viewed: false,
    },
    {
      id: 3,
      notification_type: "Placement",
      message: "TCS Placement Drive on Monday",
      viewed: false,
    },
    {
      id: 4,
      notification_type: "Event",
      message: "Workshop on React JS",
      viewed: true,
    },
    {
      id: 5,
      notification_type: "Placement",
      message: "Infosys Interview Schedule Uploaded",
      viewed: false,
    },
  ];

  // Fetch notifications
  const getNotifications = async () => {
    setLoading(true);

    try {
      let url = `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;

      if (type !== "") {
        url += `&notification_type=${type}`;
      }

      const response = await fetch(url);

      // If API not working use sample data
      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      if (data.length === 0) {
        setNotifications(sampleNotifications);
      } else {
        const updatedData = data.map((item, index) => ({
          ...item,
          id: index + 1,
          viewed: false,
        }));

        setNotifications(updatedData);
      }
    } catch (error) {
      console.log("Using sample notifications");

      // Filter sample notifications
      let filtered = sampleNotifications;

      if (type !== "") {
        filtered = filtered.filter(
          (item) => item.notification_type === type
        );
      }

      setNotifications(filtered.slice(0, limit));
    }

    setLoading(false);
  };

  useEffect(() => {
    getNotifications();
  }, [page, limit, type]);

  // Mark viewed
  const markViewed = (id) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, viewed: true } : item
    );

    setNotifications(updated);
  };

  // Priority notifications
  const priorityNotifications = notifications.slice(0, 3);

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976d2",
          mb: 4,
        }}
      >
        Notifications Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Notification Type</InputLabel>

            <Select
              value={type}
              label="Notification Type"
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Priority Notifications */}
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Priority Notifications
      </Typography>

      <Grid container spacing={2}>
        {priorityNotifications.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card
              sx={{
                backgroundColor: item.viewed
                  ? "#eeeeee"
                  : "#d1e7ff",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {item.notification_type}
                </Typography>

                <Typography sx={{ mt: 1, mb: 2 }}>
                  {item.message}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  Status: {item.viewed ? "Viewed" : "New"}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => markViewed(item.id)}
                >
                  Mark Viewed
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* All Notifications */}
      <Typography
        variant="h5"
        sx={{ mt: 5, mb: 2, fontWeight: "bold" }}
      >
        All Notifications
      </Typography>

      {loading ? (
        <Typography
          sx={{
            textAlign: "center",
            mt: 3,
            color: "blue",
            fontWeight: "bold",
          }}
        >
          Loading Notifications...
        </Typography>
      ) : (
        notifications.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 2,
              borderLeft: item.viewed
                ? "6px solid gray"
                : "6px solid blue",
              backgroundColor: item.viewed
                ? "#f5f5f5"
                : "#ffffff",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                {item.notification_type}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                {item.message}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                Status: {item.viewed ? "Viewed" : "New"}
              </Typography>

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => markViewed(item.id)}
              >
                Mark as Viewed
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {/* Pagination */}
      <Grid
        container
        spacing={2}
        sx={{ mt: 4, justifyContent: "center" }}
      >
        <Grid item>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Grid>
      </Grid>

      {/* Current Page */}
      <Typography
        sx={{
          textAlign: "center",
          mt: 2,
          fontWeight: "bold",
        }}
      >
        Current Page: {page}
      </Typography>
    </Container>
  );
}

export default App;