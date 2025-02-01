import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table';
import TablaUsuario from "../Componentes/TablaUsuario";
import { ListarUsuario } from "../Service/ListarUsuario";
import { useColumns } from "../Utils/Columns.jsx";

const Usuario = () => {

    const downloadCSV = (data, nombreArchivo) => {
        const tipo = 'text/csv';
        const extension = 'csv';
        const universalBOM = "\uFEFF";
        const a = document.createElement('a');
        a.setAttribute('href', 'data:' + tipo + '; charset=utf-8,' + encodeURIComponent(universalBOM + data));
        a.setAttribute('download', nombreArchivo + '.' + extension);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const [data, setData] = useState([])

    const [{ pageIndex, pageSize, sortBy }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        sortBy: []
    });

    async function obtenerLista(values) {
        const respuesta = await ListarUsuario(values);
        if (respuesta.status === 200) {    
                  
            if (values.exportar){
                downloadCSV(atob(respuesta.data), 'Usuarios');
            }else{
                setData(respuesta.data);
            }
        } 
    }

    useEffect(() => {
        debugger;
        obtenerLista({ exportar: false })
    }, [])


    const renderizar = () => {
        obtenerLista({ exportar: false });
    }

    const { columns } = useColumns(renderizar);
    const memoizedData = useMemo(() => data, [data]);
    const memoizedColumns = useMemo(() => columns, []);

    const tableInstance = useTable(
        {
            columns: memoizedColumns,
            data: memoizedData,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );


    const descargar = () => {
        obtenerLista ({ exportar: true });
    };


    return (
        <div className="container-fluid">
            <div>
                <TablaUsuario
                    tableInstance={tableInstance}
                    renderizar={renderizar}
                    descargar={descargar}
                    data={data}
                    currentpage={pageIndex}
                    pageSize={pageSize}
                    sortBy={sortBy}
                    setPagination={setPagination}
                    columns={columns}
                />
            </div>
        </div >
    )
}
export default Usuario;

