import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Add, MoreOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http";
import { Button, Chip, Stack, TextField } from "@mui/material";
import BreadCrumberStyle from "../../components/breadcrumb/Index";
import { IconMenus } from "../../components/icon";
import { useNavigate } from "react-router-dom";
import ModalStyle from "../../components/modal";
import { IDevice } from "../../models/deviceModel";

export default function ListDeviceView() {
  const [tableData, setTableData] = useState<GridRowsProp[]>([]);
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp();
  const navigation = useNavigate();

  const [modalDeleteData, setModalDeleteData] = useState<IDevice>();
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const getTableData = async ({ search }: { search: string }) => {
    try {
      setLoading(true);
      const result = await handleGetTableDataRequest({
        path: "/devices",
        page: paginationModel.page,
        size: paginationModel.pageSize,
        filter: { search },
      });

      if (result && result?.items) {
        setTableData(result?.items);
        setRowCount(result.totalItems);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListItem = async (itemId: string) => {
    await handleRemoveRequest({
      path: `/devices/${itemId}`,
    });
    getTableData({ search: "" });
  };

  const handleOpenModalDelete = (data: IDevice) => {
    setModalDeleteData(data);
    setOpenModalDelete(!openModalDelete);
  };

  useEffect(() => {
    getTableData({ search: "" });
  }, [paginationModel]);

  const columns: GridColDef[] = [
    {
      field: "name",
      flex: 1,
      renderHeader: () => <strong>{"NAMA"}</strong>,
      editable: true,
    },
    {
      field: "status",
      flex: 1,
      renderHeader: () => <strong>{"STATUS"}</strong>,
      editable: true,

      renderCell: (params) => {
        const status = params.value;
        let color: "default" | "primary" | "success" | "warning" | "error" =
          "default";
        switch (status) {
          case "active":
            color = "primary";
            break;
          case "inactive":
            color = "error";
            break;
          case "maintenance":
            color = "warning";
            break;
          default:
            color = "default";
            break;
        }

        return (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            variant="outlined"
            color={color}
          />
        );
      },
    },
    {
      field: "fertilizeType",
      flex: 1,
      renderHeader: () => <strong>{"TIPE"}</strong>,
      editable: true,
    },
    {
      field: "fertilizerVolume",
      flex: 1,
      renderHeader: () => <strong>{"BERAT (KG)"}</strong>,
      editable: true,
    },
    {
      field: "speed",
      flex: 1,
      renderHeader: () => <strong>{"KECEPATAN (KM/H)"}</strong>,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      renderHeader: () => <strong>{"ACTION"}</strong>,
      flex: 1,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigation("edit/" + row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            label="Delete"
            onClick={() => handleOpenModalDelete(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<MoreOutlined color="info" />}
            label="Detail"
            onClick={() => navigation("/devices/detail/" + row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function CustomToolbar() {
    const [search, setSearch] = useState<string>("");
    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between", mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <GridToolbarExport />
          <Button
            startIcon={<Add />}
            variant="outlined"
            onClick={() => navigation("create")}
          >
            Create
          </Button>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <TextField
            size="small"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outlined" onClick={() => getTableData({ search })}>
            Search
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  }

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: "Devices",
            link: "/devices",
            icon: <IconMenus.device fontSize="small" />,
          },
        ]}
      />
      <Box
        sx={{
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row: any) => row.id}
          editMode="row"
          sx={{ padding: 2 }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          autoHeight
          pageSizeOptions={[2, 5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            toolbar: CustomToolbar,
          }}
          rowCount={rowCount}
          paginationMode="server"
          loading={loading}
        />
      </Box>

      <ModalStyle
        openModal={openModalDelete}
        handleModalOnCancel={() => setOpenModalDelete(false)}
        message={`Are you sure you want to delete ${modalDeleteData?.name}?`}
        handleModal={() => {
          handleDeleteListItem(modalDeleteData?.id + "");
          setOpenModalDelete(!openModalDelete);
        }}
      />
    </Box>
  );
}
