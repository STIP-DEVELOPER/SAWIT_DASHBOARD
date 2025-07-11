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
    fertilizerVolume: 0,
    distance: 0,
  });

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
          distance: result.distance,
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
            link: "/devices/edit",
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
          Edit Device
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} mt={2}>
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
                aria-label="Volume pupuk"
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
