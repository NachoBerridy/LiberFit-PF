import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { getClients, getEmployees, deleteClient, deleteEmployee } from "../../../App/Action/Action";
import { useAppSelector, useAppDispatch } from "../../../App/Hooks/Hooks";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Table({ link }: any) {
    const allData: any = useAppSelector((state) => state.data);
    const dispatch = useAppDispatch();
    const cookies = new Cookies();

    useEffect(() => {
        dispatch(getClients({token: cookies.get("token")}))
        dispatch(getEmployees({token: cookies.get("token")}))
    }, []);

    const handleDeleteEvent = async (id: any) => {
        link == "clients"
            ? dispatch(deleteClient(id))
            : dispatch(deleteEmployee(id));
    };

    const handleUpdateEvent = (id: any) => {};

    const data = React.useMemo(
        (): any =>
            allData[link].map((e: any) => {

                const membershipState = e.active == true 
                ? <span className="bg-green-600 px-3 py-1 rounded-xl text-white font-medium">Abonada</span> 
                : <span className="bg-red-600 px-3 py-1 rounded-xl text-white font-medium">No Abonada</span>

                const suscriptionName =
                e.SubscriptionId == 1 ? "No Suscripto" : 
                e.SubscriptionId == 2 ? "Anual Bonificado" : 
                e.SubscriptionId == 3 ? "Trimestral Bonificado" : 
                e.SubscriptionId == 4 ? "Mensual" : 
                !e.SubscriptionId ? "Empleado Bonificado" : null

                return {
                    col1: (
                        <Avatar
                            className="mr-2"
                            name={e.name}
                            size="45"
                            round={true}
                        />
                    ),

                    col2: e.name,
                    col3: e.phone,
                    col4: e.email,
                    col5: membershipState,
                    col6: suscriptionName,
                }
            }),
        []
    );

    const columns = React.useMemo(
        (): any => [
            {
                Header: "Avatar",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Nombre",
                accessor: "col2",
            },
            {
                Header: "Telefono",
                accessor: "col3",
            },
            {
                Header: "Email",
                accessor: "col4",
            },
            {
                Header: "Membresía",
                accessor: "col5",
            },
            {
                Header: "Suscripción",
                accessor: "col6",
            },
            {
                Header: "Gestión de Registros",
                accessor: "col7",
                Cell: () => (
                    <div>
                        <button></button>
                        <button
                            className="bg-redClare px-4 py-2 rounded-xl mx-1"
                            title="Eliminar"
                            onClick={(e) => handleUpdateEvent(e)}
                        >
                            Editar
                        </button>
                        <button
                            className="bg-redClare px-4 py-2 rounded-xl mx-1"
                            title="Eliminar"
                            onClick={(e) => handleDeleteEvent(e)}
                        >
                            Eliminar
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        // page,
        // nextPage,
        // previousPage,
        // canNextPage,
        // canPreviousPage,
        // pageOptions,
        state,
        prepareRow,
    } = useTable({ columns, data },
      usePagination
  );

    // const { pageIndex } = state

    return (
        <div className="flex flex-col">
            <div className="overflow-x-hidden sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table {...getTableProps()} className="min-w-full">
                            <thead className="border border-black">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                                                {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row: any) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center"
                                            {...row.getRowProps()}
                                        >
                                            {row.cells.map((cell: any) => {
                                                return (
                                                    <td
                                                        className="py-2"
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* <div className="flex flex-row justify-center mt-3">
                            Page{' '} */}
                            {/* <span>
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>
                            </span> */}
                            {/* <button
                                className="bg-redClare px-4 py-2 rounded-xl mx-1"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                Anterior
                            </button>
                            <button
                                className="bg-redClare px-4 py-2 rounded-xl mx-1"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                Siguiente
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        
    );
}
