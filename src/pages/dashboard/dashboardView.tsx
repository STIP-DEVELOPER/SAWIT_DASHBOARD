import { Box, Card, Grid, Stack, Typography, alpha } from "@mui/material";
import { blue, green, purple } from "@mui/material/colors";
import BreadCrumberStyle from "../../components/breadcrumb/Index";
import { IconMenus } from "../../components/icon";
import { useHttp } from "../../hooks/http";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IStatisticModel } from "../../models/statisticModel";
// import ReactApexChart from "react-apexcharts";
import ListLogsView from "../logs/ListLogsView";
import LoadingBackdrop from "../../components/loading/Loading";

const DashboardView = () => {
  const { handleGetRequest } = useHttp();
  const navigation = useNavigate();
  const [isLoading, setIsloading] = useState(true);

  const [statistic, setStatistic] = useState<IStatisticModel>({
    totalAdmin: 0,
    totalSuperAdmin: 0,
    totalDevice: 0,
  });

  const handleGetStatistic = async () => {
    try {
      const result = await handleGetRequest({
        path: "/statistic/total",
      });

      if (result) {
        setStatistic(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    handleGetStatistic();
  }, []);

  if (isLoading) return <LoadingBackdrop open={isLoading} />;

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: "Dashboard",
            link: "/",
            icon: <IconMenus.dashboard fontSize="small" />,
          },
        ]}
      />

      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="medium"
          color="text.primary"
        >
          Dashboard Overview
        </Typography>

        <Grid container spacing={3} mt={1}>
          <Grid item md={4} sm={6} xs={12}>
            <DashboardCard
              icon={IconMenus.admin}
              title="Admin"
              value={statistic.totalAdmin}
              color={blue[500]}
              onClick={() => navigation("/admins")}
            />
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
            <DashboardCard
              icon={IconMenus.admin}
              title="Super Admin"
              value={statistic.totalSuperAdmin}
              color={green[500]}
              onClick={() => navigation("/admins")}
            />
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
            <DashboardCard
              icon={IconMenus.device}
              title="Devices"
              value={statistic.totalDevice}
              color={purple[500]}
              onClick={() => navigation("/devices")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={5}>
          {/* <Grid item xs={12} md={12}>
            <Typography variant="h6" mb={2}>
              Aktivitas Penggunaan Device
            </Typography>
            <Card sx={{ p: 3 }}>
              <ReactApexChart
                options={{
                  chart: {
                    height: 350,
                    type: "area",
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  xaxis: {
                    type: "datetime",
                    categories: [
                      "2025-09-19T00:00:00.000Z",
                      "2025-09-20T01:30:00.000Z",
                      "2025-09-21T02:30:00.000Z",
                      "2025-09-22T03:30:00.000Z",
                      "2025-09-23T04:30:00.000Z",
                      "2025-09-24T05:30:00.000Z",
                      "2025-09-25T06:30:00.000Z",
                    ],
                  },
                  tooltip: {
                    x: {
                      format: "dd/MM/yy HH:mm",
                    },
                  },
                }}
                series={[
                  {
                    name: "Device A",
                    data: [31, 40, 28, 51, 42, 109, 100],
                  },
                  {
                    name: "Device B",
                    data: [11, 32, 80, 32, 34, 52, 41],
                  },
                  {
                    name: "Device C",
                    data: [15, 11, 20, 18, 29, 37, 36],
                  },
                  {
                    name: "Device D",
                    data: [21, 50, 23, 90, 25, 26, 50],
                  },
                  {
                    name: "Device E",
                    data: [5, 10, 8, 40, 14, 33, 9],
                  },
                ]}
                type="area"
                height={350}
              />
            </Card>
          </Grid> */}
          <Grid item xs={12}>
            <Card>
              <Typography variant="h6" mb={2}>
                Device Logs
              </Typography>

              <ListLogsView />
            </Card>
          </Grid>
          {/* <Grid item xs={12} md={5}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                total
              </Typography>
              <ReactApexChart
                options={{
                  chart: {
                    width: 380,
                    type: "pie",
                  },
                  labels: ["admin", "superAdmin", "Device"],
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 230,
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                }}
                series={[2, 2, 1]}
                type="pie"
                width={380}
              />
            </Card>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

const DashboardCard = ({
  icon: Icon,
  title,
  value,
  color,
  onClick,
}: {
  icon: any;
  title: string;
  value: number;
  color: string;
  onClick: () => void;
}) => (
  <Card
    sx={{
      p: 3,
      minWidth: 200,
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: (theme) => theme.shadows[8],
        bgcolor: alpha(color, 0.04),
      },
    }}
    onClick={onClick}
  >
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: alpha(color, 0.12),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon sx={{ fontSize: 28, color: color }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" color={color}>
          {value}
        </Typography>
      </Stack>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
    </Stack>
  </Card>
);

export default DashboardView;
