import { DataGrid } from "@mui/x-data-grid";
import "./styles.css";

const columns = [
  {
    field: "coallitionName",
    headerName: "Coaliciones",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "k",
    headerName: "Jugadores",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "S",
    headerName: "Ocupación %",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "vS",
    headerName: "Función Pagos $",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
];

const generateRows = (data) => {
  return Object.keys(data).map((item, index) => {
    return {
      id: index,
      coallitionName: item,
      k: data[item].k,
      S: data[item].S,
      vS: data[item].vS,
    };
  });
};

export default function ShapleyTable({ data }) {
  return (
    <div>
      <DataGrid
        sx={{
          margin: "0 10px",
          color: "black",
          backgroundColor: "#d2d2d2",
          textAlign: "center",
          height: "100%",
          border: "none",
          borderRadius: "10px",
          boxShadow: "2px 3px 10px 0px rgba(0, 0, 0, 0.432)",
        }}
        rows={generateRows(data)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[8, 10]}
      />
    </div>
  );
}
