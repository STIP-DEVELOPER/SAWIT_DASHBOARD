import { useState } from "react";
import {
  Button,
  Card,
  Typography,
  Container,
  Box,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import { useToken } from "../../hooks/token";
import { IUserLoginRequestModel } from "../../models/userModel";

export default function LoginView() {
  const { handlePostRequest } = useHttp();
  const { setToken } = useToken();
  const navigate = useNavigate();

  const [adminPayload, setadminPayload] = useState<IUserLoginRequestModel>({
    email: "",
    password: "",
  });

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
    <>
      <Container maxWidth="xs">
        <Card
          sx={{
            mt: 5,
            p: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            marginBottom={5}
            color="primary"
            fontWeight={"bold"}
          >
            Login
          </Typography>
          <Box
            component="form"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "36ch",
            }}
          >
            <TextField
              label="e-mail"
              id="outlined-start-adornment"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={adminPayload.email}
              onChange={(e) => {
                setadminPayload({
                  ...adminPayload,
                  email: e.target.value,
                });
              }}
            />

            <TextField
              label="Password"
              id="outlined-start-adornment"
              type="password"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={adminPayload.password}
              onChange={(e) => {
                setadminPayload({
                  ...adminPayload,
                  password: e.target.value,
                });
              }}
            />
            <Button variant={"contained"} onClick={handleSubmit}>
              Login
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}
