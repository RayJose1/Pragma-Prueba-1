import React, { useState } from "react";
import Button from "./Button";
import PaginationTable from "./PaginationTable";
import { usePagination, useSortBy, useTable } from "react-table";
import ModalAgregarUsuario from "./ModalAgregarUsuario";

const TablaUsuario = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, state, pageOptions, previousPage, canPreviousPage, nextPage, canNextPage, gotoPage, setGlobalFilter } = props.tableInstance;
    // const { globalFilter } = state;
    const { renderizar,  descargar, data, columns, currentpage, pageSize, sortBy, setPagination, ...rest } = props;

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, pageCount, gotoPage } = useTable
        ({
            columns
            , data
            , initialState: { pageIndex: currentpage, pageSize: pageSize, sortBy: sortBy }
            , manualPagination: true
            , pageCount: 1
            , autoResetPage: false
            , autoResetSortBy: false
            , manualSortBy: true
        }, useSortBy, usePagination
        );


    function handleShow() {
        setShow(true);
    }

    console.log(data)

    return (
        <div className="container mt-4">
            {/* Barra de herramientas */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button design={"btn-primary"} onClick={handleShow}>Nuevo</Button>
                <Button design={"btn-primary"} onClick={() => descargar()}>Exportar a Excel</Button>
            </div>

            {/* Tabla de Usuarios */}
            <div className="table-responsive brd-top">
                <table className="table" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    data.length > 0 ?
                                        <th {...column.getHeaderProps(column.getSortByToggleProps(), { className: column.className })}>
                                            <span className="d-flex align-items-center gap-1">
                                                {column.render('Header')}
                                                <>
                                                    {column.isSorted ?
                                                        (column.isSortedDesc && data.length > 0 ?
                                                            <i className="ico-chevron-down"></i>
                                                            :
                                                            <i className="ico-chevron-up"></i>
                                                        ) :
                                                        <>
                                                            <i className="ico-sort fs-7"></i>
                                                        </>
                                                    }
                                                </>
                                            </span>
                                        </th>
                                        :
                                        <th {...column.getHeaderProps()}
                                        >
                                            <span className="d-flex align-items-center gap-1">
                                                {column.render('Header')}
                                            </span>
                                        </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.length > 0 && page.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps({
                                                className: cell.column.className
                                            })}>
                                                {cell.render('Cell')}
                                            </td>
                                        })}
                                    </tr>
                                )
                            }) || <tr><td colSpan={headerGroups[0].headers.length + 1}>
                                <div className="d-flex justify-content-center align-items-center flex-column gap-2 py-5">
                                    <p className='mb-0 text-primary'>No se encuentran resultados de tu búsqueda.</p>
                                </div>
                            </td></tr>
                        }
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <PaginationTable
                pagesCountServer={pageCount}
                currentPage={currentpage}
                setCurrentPage={gotoPage}
                alwaysShown={false}
                setPagination={setPagination}
            />

            {/* Modal para agregar usuario */}
            <ModalAgregarUsuario show={show} onHide={handleClose} renderizar={renderizar} isCrear={true} />
        </div>
    );
};

export default TablaUsuario;


