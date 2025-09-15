import React from "react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import Layout from "@/Layouts/layout/layout";

const Form = ({ company = {}, mode = "create" }) => {
    const toast = useRef(null);

    // Breadcrumb items
    const items = [
        { label: "Companies", url: "/companies" },
        { label: "Create", url: false },
    ];
    const home = { icon: "pi pi-home", url: "/dashboard" };

    // Inertia form handling
    const { data, setData, post, put, errors } = useForm({
        name: company.name || "",
        email: company.email || "",
        prefecture_id: company.prefecture_id || "",
        phone: company.phone || "",
        postcode: company.postcode || "",
        city: company.city || "",
        local: company.local || "",
        street_address: company.street_address || "",
        business_hour: company.business_hour || "",
        regular_holiday: company.regular_holiday || "",
        image: company.image || null,
        fax: company.fax || "",
        url: company.url || "",
        license_number: company.license_number || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "create") {
            post(route("companies.store"));
        } else {
            put(route("companies.update", { company: company.id }));
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.name ? "border-red-500" : ""
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs italic mt-2">
                            {errors.name}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Company
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default Form;
