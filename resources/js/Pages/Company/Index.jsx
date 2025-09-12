import React from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import DataTable from "react-data-table-component";

const Index = ({ companies }) => {
    const columns = [
        { name: "ID", selector: "id", sortable: true },
        { name: "Name", selector: "name", sortable: true },
        { name: "Address", selector: "address", sortable: true },
    ];

    return (
        <Layout>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Companies</h1>
                    <a href="/companies/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Company
                    </a>
                </div>
                <DataTable
                    columns={columns}
                    data={companies}
                    pagination
                    highlightOnHover
                />
            </div>
        </Layout>
    );
};

export default Index;
