import { useState } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import DataTable from "react-data-table-component";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { router } from "@inertiajs/react";

const Index = ({ companies }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            sortFunction: (a, b) => a.name.localeCompare(b.name),
            searchable: true,
            searchFunction: (row, searchTerm) =>
                row.name.toLowerCase().includes(searchTerm.toLowerCase()),
        },
        {
            name: "Address",
            selector: (row) => row.street_address,
            sortable: true,
            sortFunction: (a, b) =>
                a.street_address.localeCompare(b.street_address),
            searchable: true,
            searchFunction: (row, searchTerm) =>
                row.street_address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <Button
                        severity="warning"
                        icon="pi pi-pencil"
                        className="px-0 py-2"
                        onClick={() => handleEdit(row)}
                    />
                    <Button
                        severity="danger"
                        icon="pi pi-trash"
                        className="px-0 py-2"
                        onClick={() => handleDelete(row)}
                    />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleEdit = (company) => {
        router.visit(route("companies.edit", { company }));
    };
    return (
        <Layout>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-0">Companies</h1>
                    <Button
                        label="Add Company"
                        severity="primary"
                        icon="pi pi-plus"
                        onClick={() =>
                            (window.location.href = "/companies/create")
                        }
                    />
                </div>
                <DataTable
                    columns={columns}
                    data={companies.filter((company) => {
                        if (!searchTerm) return true;
                        return (
                            company.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                            company.street_address
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        );
                    })}
                    subHeader
                    subHeaderComponent={
                        <InputText
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    }
                    pagination
                    responsive
                    highlightOnHover
                    pointerOnHover
                    customStyles={{
                        headCells: {
                            style: {
                                fontWeight: "bold",
                                fontSize: "1rem",
                            },
                        },
                    }}
                />
            </div>
        </Layout>
    );
};

export default Index;
