import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Box,
  Divider,
  Stack,
  CircularProgress,
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
      console.error("Failed to fetch module detail:", error);
    } finally {
      setLoading(false);
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
          Module tidak ditemukan.
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
          <Stack spacing={3}>
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

            <Box>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Deskripsi
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {payload.distance || "-"}
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}
    </>
  );
}
