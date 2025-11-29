import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
// import { useHttp } from "../../hooks/http";
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  alpha,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import LoadingBackdrop from "../../components/loading/Loading";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface IDeviceLocation {
  deviceId: string;
  deviceName: string;
  deviceLatitude: string;
  deviceLongitude: string;
}

const dummyData: IDeviceLocation[] = [
  // Titik-titik dalam radius sekitar 500m dari kampus INSTIPER
  {
    deviceId: "1",
    deviceName: "Traktor kampus",
    deviceLatitude: "-7.7662",
    deviceLongitude: "110.4149",
  },
  {
    deviceId: "2",
    deviceName: "Traktor Belakang Kampus",
    deviceLatitude: "-7.7655",
    deviceLongitude: "110.4128",
  },

  // Kecamatan Sekitar Kampus INSTIPER (radius ±3–5km)
  {
    deviceId: "3",
    deviceName: "Traktor Kecamatan Depok",
    deviceLatitude: "-7.7582",
    deviceLongitude: "110.4093",
  },
  {
    deviceId: "4",
    deviceName: "Traktor Kecamatan Ngaglik",
    deviceLatitude: "-7.7333",
    deviceLongitude: "110.4096",
  },
  {
    deviceId: "5",
    deviceName: "Traktor Kecamatan Ngemplak",
    deviceLatitude: "-7.7120",
    deviceLongitude: "110.4355",
  },
  {
    deviceId: "6",
    deviceName: "Traktor Kecamatan Kalasan",
    deviceLatitude: "-7.7778",
    deviceLongitude: "110.4500",
  },
  {
    deviceId: "7",
    deviceName: "Traktor Kecamatan Sleman",
    deviceLatitude: "-7.7192",
    deviceLongitude: "110.3478",
  },
  {
    deviceId: "8",
    deviceName: "Traktor Kecamatan Berbah",
    deviceLatitude: "-7.8018",
    deviceLongitude: "110.4562",
  },
];

export default function LocationView() {
  // const { handleGetRequest } = useHttp();
  const [coordinates, setCoordinates] = useState<IDeviceLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoordinates, setFilteredCoordinates] = useState<
    IDeviceLocation[]
  >([]);

  // const handleGetStores = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await handleGetRequest({
  //       path: "/store-locations",
  //     });

  //     if (result && result?.items) {
  //       setCoordinates(result.items);
  //       setFilteredCoordinates(result.items);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // handleGetStores();
    setTimeout(() => {
      setCoordinates(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = coordinates.filter((store) =>
      store.deviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoordinates(filtered);
  }, [searchTerm, coordinates]);

  if (loading) return <LoadingBackdrop open={loading} />;

  return (
    <Box sx={{ p: 2 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            background: `linear-gradient(135deg, ${alpha(
              blue[600],
              0.1
            )} 0%, ${alpha(blue[100], 0.1)} 100%)`,
          }}
        >
          <Stack spacing={3}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <LocationIcon sx={{ color: blue[600], fontSize: 28 }} />
                <Stack spacing={0.5}>
                  <Typography variant="h5" fontWeight="600">
                    Device Locations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredCoordinates.length} device found
                  </Typography>
                </Stack>
              </Stack>

              <TextField
                size="small"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 250,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "background.paper",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ position: "relative" }}>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                zIndex: 999,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <MapContainer
            center={[-7.7805, 110.375]}
            zoom={10}
            maxZoom={20}
            style={{
              height: "75vh",
              width: "100%",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {filteredCoordinates.map((item) => (
              <Marker
                key={item.deviceId}
                position={[+item.deviceLatitude, +item.deviceLongitude]}
              >
                <Popup>
                  <Box sx={{ p: 1, minWidth: 200 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <StoreIcon sx={{ color: blue[600] }} />
                        <Typography variant="h6">{item.deviceName}</Typography>
                      </Stack>

                      <Stack spacing={1}>
                        <Chip
                          size="small"
                          icon={<LocationIcon />}
                          label={`Lat: ${item.deviceLatitude}`}
                          sx={{ width: "fit-content" }}
                        />
                        <Chip
                          size="small"
                          icon={<LocationIcon />}
                          label={`Long: ${item.deviceLongitude}`}
                          sx={{ width: "fit-content" }}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Card>
    </Box>
  );
}
