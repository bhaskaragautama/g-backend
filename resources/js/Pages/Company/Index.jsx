import { useState, useRef, useEffect } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import DataTable from "react-data-table-component";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { router } from "@inertiajs/react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const Index = ({ companies, flash }) => {
    // Ref for toast notifications
    const toast = useRef(null);

    // State for search term
    const [searchTerm, setSearchTerm] = useState("");

    // Effect to show flash messages
    useEffect(() => {
        if (flash && toast.current) {
            toast.current.show({
                severity: flash.type,
                summary: flash.type === "success" ? "Success" : "Error",
                detail: flash.message,
                life: 3000,
            });
        }
    }, [flash]);

    // Define columns for the DataTable
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

    // Handlers for edit and delete actions
    const handleEdit = (company) => {
        router.visit(route("companies.edit", { company }));
    };

    const handleDelete = (company) => {
        confirmDialog({
            message: `Are you sure you want to delete ${company.name}?`,
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                router.delete(route("companies.destroy", { company }), {
                    onSuccess: () => {
                        // Show success toast or notification
                        toast.current.show({
                            severity: "success",
                            summary: "Deleted",
                            detail: `${company.name} has been deleted.`,
                            life: 3000,
                        });
                    },
                    onError: () => {
                        // Show error toast or notification
                        toast.current.show({
                            severity: "error",
                            summary: "Error",
                            detail: `Failed to delete ${company.name}.`,
                            life: 3000,
                        });
                    },
                });
            },
        });
    };

    return (
        <Layout>
            <Toast ref={toast} />
            <ConfirmDialog />
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
