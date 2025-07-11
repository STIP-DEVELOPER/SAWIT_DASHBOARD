import { useState } from "react";
import {
  Button,
  Card,
  Typography,
  Box,
  TextField,
  Stack,
  Grid,
  Slider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import BreadCrumberStyle from "../../components/breadcrumb/Index";
import { IconMenus } from "../../components/icon";
import { IDeviceCreateRequest } from "../../models/deviceModel";

export default function CreateDeiceView() {
  const { handlePostRequest } = useHttp();
  const navigate = useNavigate();

  const [payload, setPayload] = useState<IDeviceCreateRequest>({
    name: "",
    status: "active",
    fertilizerVolume: 0,
    distance: 0,
  });

  const handleSubmit = async () => {
    try {
      await handlePostRequest({
        path: "/devices",
        body: payload,
      });

      navigate("/devices");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: "Devices",
            link: "/decices",
            icon: <IconMenus.device fontSize="small" />,
          },
          {
            label: "Create",
            link: "/devices/create",
          },
        ]}
      />
      <Card
        sx={{
          mt: 5,
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h4"
          marginBottom={5}
          color="primary"
          fontWeight={"bold"}
        >
          Create Device
        </Typography>
        <Box
          component="form"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nama"
                placeholder="traktor 1"
                id="outlined-start-adornment"
                value={payload.name}
                fullWidth
                onChange={(e) => {
                  setPayload({ ...payload, name: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Jarak antara pohon dan traktor (cm)"
                placeholder="Jarak antara pohon dan traktor dalam centimeter"
                id="outlined-start-adornment"
                value={payload.distance}
                type="number"
                fullWidth
                onChange={(e) => {
                  setPayload({ ...payload, distance: Number(e.target.value) });
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Berat Pupuk: {payload.fertilizerVolume} Gram
              </Typography>
              <Slider
                value={payload.fertilizerVolume}
                onChange={(_, newValue) => {
                  setPayload({
                    ...payload,
                    fertilizerVolume: newValue as number,
                  });
                }}
                aria-label="Berat pupuk"
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={10}
              />
            </Grid>
          </Grid>

          <Stack direction={"row"} justifyContent="flex-end" mt={5}>
            <Button variant={"contained"} onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  );
}
