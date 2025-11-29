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
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import BreadCrumberStyle from "../../components/breadcrumb/Index";
import { IconMenus } from "../../components/icon";
import { IDeviceCreateRequest } from "../../models/deviceModel";

export default function CreateDeviceView() {
  const { handlePostRequest } = useHttp();
  const navigate = useNavigate();

  const [payload, setPayload] = useState<IDeviceCreateRequest>({
    name: "",
    status: "active",
    fertilizerVolume: 5,
    fertilizeType: "NPK",
    speed: 5, // Default speed based on fertilizer volume
  });

  // Logic untuk menghitung kecepatan berdasarkan berat pupuk
  const calculateSpeedFromFertilizer = (volume: number): number => {
    return volume / 1; // Contoh: 100 kg = 1 km/h
  };

  const handleFertilizerChange = (_: Event, newValue: number | number[]) => {
    const volume = newValue as number;
    setPayload({
      ...payload,
      fertilizerVolume: volume,
      speed: calculateSpeedFromFertilizer(volume),
    });
  };

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
            link: "/devices",
            icon: <IconMenus.device fontSize="small" />,
          },
          {
            label: "Create",
            link: "/devices/create",
          },
        ]}
      />
      <Card sx={{ mt: 5, p: { xs: 3, md: 5 } }}>
        <Typography
          variant="h4"
          marginBottom={5}
          color="primary"
          fontWeight="bold"
        >
          Create Device
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nama"
                placeholder="Contoh: Traktor A"
                fullWidth
                value={payload.name}
                onChange={(e) =>
                  setPayload({ ...payload, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Status"
                fullWidth
                value={payload.status}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    status: e.target.value as IDeviceCreateRequest["status"],
                  })
                }
              >
                {["active", "inactive", "maintenance"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Jenis Pupuk"
                fullWidth
                value={payload.fertilizeType}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    fertilizeType: e.target
                      .value as IDeviceCreateRequest["fertilizeType"],
                  })
                }
              >
                {[
                  "NPK",
                  "UREA",
                  "DOLOMIT",
                  "MOP",
                  "KIESERITE",
                  "ROCK PHOSPHATE",
                ].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Kecepatan Traktor (KM/H)"
                type="number"
                fullWidth
                value={payload.speed}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Berat Pupuk: {payload.fertilizerVolume} KG
              </Typography>
              <Slider
                value={payload.fertilizerVolume}
                onChange={handleFertilizerChange}
                aria-label="Berat pupuk"
                valueLabelDisplay="auto"
                min={0}
                max={100}
                step={5}
              />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" mt={5}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  );
}
