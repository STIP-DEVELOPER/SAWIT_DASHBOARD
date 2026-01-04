import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import BreadCrumberStyle from "../../components/breadcrumb/Index";
import { IconMenus } from "../../components/icon";
import { IDeviceUpdateRequest } from "../../models/deviceModel";

export default function EditDeviceView() {
  const { handleUpdateRequest, handleGetRequest } = useHttp();
  const navigate = useNavigate();
  const { deviceId } = useParams();

  const [payload, setPayload] = useState<IDeviceUpdateRequest>({
    id: Number(deviceId)!,
    name: "",
    status: "active",
    fertilizerVolume: 5,
    fertilizeType: "NPK",
    speed: 5,
  });

  // Hitung kecepatan otomatis dari fertilizerVolume
  const calculateSpeedFromFertilizer = (volume: number): number => {
    return volume / 1; // contoh: 100 gram = 1 km/h
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
      await handleUpdateRequest({
        path: "/devices",
        body: payload,
      });

      navigate("/devices");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleGetDetail = async () => {
    try {
      const result = await handleGetRequest({
        path: `/devices/detail/${deviceId}`,
      });

      if (result) {
        setPayload({
          id: result.id,
          name: result.name,
          status: result.status,
          fertilizerVolume: result.fertilizerVolume,
          fertilizeType: result.fertilizeType,
          speed: calculateSpeedFromFertilizer(result.fertilizerVolume),
        });
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetail();
  }, []);

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
            label: "Edit",
            link: `/devices/edit/${deviceId}`,
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
          Edit Device
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
                    status: e.target.value as IDeviceUpdateRequest["status"],
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
                      .value as IDeviceUpdateRequest["fertilizeType"],
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
