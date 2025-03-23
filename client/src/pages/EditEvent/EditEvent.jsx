import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import EditEventForm from "../../components/EditEventForm";

const EditEvent = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/my-events");
  };

  return (
    <Box sx={{ padding: "var(--padding-medium)" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "var(--padding-medium)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "var(--dark-black)" }}
        >
          Edit Event
        </Typography>
        <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{
            background: "var(--primary-green)",
            color: "var(--white)",
            borderRadius: "var(--border-radius-small)",
            fontWeight: 700,
            "&:hover": {
              background: "var(--secondary-green)",
            },
          }}
        >
          ← Go Back
        </Button>
      </Box>
      <EditEventForm />
    </Box>
  );
};

export default EditEvent;
