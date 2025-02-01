import moment from "moment"
import Acciones from "../Componentes/Acciones"

export function useColumns(props){
    const columns = [
		{
			Header: "Id",
			accessor: "id"
		},
		{
			Header: "Nombre",
			accessor: "nombre",
		},
		{
			Header: "Rut",
			accessor: "rut"
		},
		{
			Header: "Correo",
			accessor: "correo",
		},
        {
			Header: "Fecha de nacimiento",
			accessor: "fechaNacimiento",
			Cell: ({ row }) => { return moment(row.original.fechaNacimiento).format("DD-MM-YY") }		
		},
		{
            Header: "Acciones",
            accessor: "",
            Cell: ({ row }) => <Acciones persona={row.original} renderizar={props} /> 
        }
	]

    return {columns}

}

