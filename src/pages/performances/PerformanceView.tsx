import { Box, Card, Grid, Typography } from "@mui/material";
import BreadCrumberStyle from "../../components/breadcrumb/Index";
import { IconMenus } from "../../components/icon";
import ReactApexChart from "react-apexcharts";

const PerformanceView = () => {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: "Performances",
            link: "/performances",
            icon: <IconMenus.performance fontSize="small" />,
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
          Performance Overview
        </Typography>

        <Grid container spacing={3} mt={5}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Aktivitas Penggunaan Device
              </Typography>
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

export default PerformanceView;
