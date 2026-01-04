import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Box,
  Divider,
  Stack,
  CircularProgress,
  Chip,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import BreadCrumberStyle from "../../components/breadcrumb/Index";
import { IconMenus } from "../../components/icon";
import { convertTime } from "../../utilities/convertTime";
import { IDevice } from "../../models/deviceModel";

export default function DetailDeviceView() {
  const { handleGetRequest } = useHttp();
  const { deviceId } = useParams();
  const [payload, setPayload] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGetDetail = async () => {
    try {
      const result = await handleGetRequest({
        path: `/devices/detail/${deviceId}`,
      });

      if (result) setPayload(result);
    } catch (error) {
      console.error("Failed to fetch device detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetail();
  }, []);

  const renderStatusColor = (status: IDevice["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "maintenance":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: "Device",
            link: "/devices",
            icon: <IconMenus.device fontSize="small" />,
          },
          {
            label: "Detail",
            link: `/devices/detail/${deviceId}`,
          },
        ]}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : !payload ? (
        <Typography color="error" sx={{ mt: 5, textAlign: "center" }}>
          Perangkat tidak ditemukan.
        </Typography>
      ) : (
        <Card
          sx={{
            mt: 5,
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {payload.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Dibuat pada: {convertTime(payload.createdAt ?? "")}
              </Typography>
            </Box>

            <Divider />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Token Perangkat
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {payload.token}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={payload.status}
                  color={renderStatusColor(payload.status)}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Jenis Pupuk
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {payload.fertilizeType}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Berat Pupuk
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {payload.fertilizerVolume} KG
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Kecepatan Traktor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {payload.speed} km/h
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Card>
      )}
    </>
  );
}
