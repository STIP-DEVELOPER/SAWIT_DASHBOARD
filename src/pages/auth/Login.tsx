import { useState } from "react";
import {
  Button,
  Card,
  Typography,
  Container,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import { useToken } from "../../hooks/token";
import { IUserLoginRequestModel } from "../../models/userModel";
import logo from "../../assets/logo.png"; // ⬅️ Import logo kamu

export default function LoginView() {
  const { handlePostRequest } = useHttp();
  const { setToken } = useToken();
  const navigate = useNavigate();

  const [adminPayload, setAdminPayload] = useState<IUserLoginRequestModel>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const result = await handlePostRequest({
        path: "/auth/login",
        body: adminPayload,
      });

      if (result && result?.data) {
        setToken(result.data?.token);
        window.location.reload();
        navigate("/");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1976d2, #42a5f5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            py: 6,
            px: 4,
            borderRadius: 3,
            boxShadow: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          {/* LOGO */}
          <Box sx={{ mb: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: 100,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
            gutterBottom
          >
            Sign in to your dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please login with your credentials
          </Typography>

          <Box
            component="form"
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={adminPayload.email}
              onChange={(e) =>
                setAdminPayload({ ...adminPayload, email: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={adminPayload.password}
              onChange={(e) =>
                setAdminPayload({
                  ...adminPayload,
                  password: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
