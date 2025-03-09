import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const LoginPromptModal = ({ open, onClose }) => {
  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="event-modal">
        <h2>Sign Up to Create Events</h2>
        <p>You need to login or register to create an event.</p>
        <div>
          <Button
            className="event-modal-button"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            className="event-modal-button"
            variant="contained"
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

LoginPromptModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginPromptModal;
