import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {field: 'coallitionName', headerName: 'Coalisiones posibles', width: 200, headerAlign: 'center', align: 'center'},
    {field: 'k', headerName: '# Jugadores', width: 100,headerAlign: 'center', align: 'center'},
    {field: 'S', headerName: '% occupation', width: 100,headerAlign: 'center', align: 'center'},
    {field: 'vS', headerName: 'Characteristic value', width: 200,headerAlign: 'center', align: 'center'},
    
]

const generateRows = (data) => {
    return Object.keys(data).map((item, index) => {
        return {
            id:  index,
            coallitionName: item,
            k: data[item].k,
            S: data[item].S,
            vS: data[item].vS
        }
    })
}

export default function ShapleyTable({data}) {
    return(
        <div>
            <DataGrid
                sx = {{
                    margin: '0 10px',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    height: '100%'
                }}
                rows={generateRows(data)}
                columns ={columns}
                initialState = {{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 8}
                    }
                }}
                pageSizeOptions = {[8,10]}
            />
        </div>
    )
}