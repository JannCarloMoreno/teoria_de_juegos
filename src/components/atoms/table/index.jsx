import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {field: 'coallitionName', headerName: 'Coallition Name', width: 200, headerAlign: 'center', align: 'center'},
    {field: 'k', headerName: '# Members', width: 100,headerAlign: 'center', align: 'center'},
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
                    margin: 5,
                    backgroundColor: 'white',
                    textAlign: 'center'
                }}
                rows={generateRows(data)}
                columns ={columns}
                initialState = {{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5}
                    }
                }}
                pageSizeOptions = {[5,10]}
            />
        </div>
    )
}