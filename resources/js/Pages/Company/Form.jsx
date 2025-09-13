import { useState } from "react";
import Layout from "@/Layouts/layout/layout";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Button } from "primereact/button";
import { fetchAddressByPostcode } from "@/Services/postcode";

const items = [
    { label: "Companies", url: "/companies" },
    { label: "Create", url: false },
];

const home = { icon: "pi pi-home", url: "/dashboard" };

const Form = (props) => {
    const isEdit = !!props.company;
    const [postCode, setPostCode] = useState("");

    const [prefectureName, setPrefectureName] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm(
        props.company || {
            email: "",
        }
    );

    const submit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        post(route(isEdit ? "companies.update" : "companies.store"));
    };

    async function handleSearch() {
        if (!postCode) return;
        try {
            const response = await fetchAddressByPostcode(postCode);
            console.log(response);
            setPrefectureName(response.prefecture.display_name || ""); // Adjust according to your API response
            setData("prefecture_id", response.prefecture.id || "");
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    }

    return (
        <Layout>
            <h1>Company Form</h1>
            <BreadCrumb model={items} home={home} className="mb-5" />
            <div>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label
                            htmlFor="name"
                            className="block text-900 font-medium mb-2"
                        >
                            Name<span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="name"
                            type="text"
                            placeholder="Company name"
                            className="w-full"
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="block text-900 font-medium mb-2"
                        >
                            Email<span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="email"
                            type="email"
                            placeholder="Email address"
                            className="w-full"
                        />
                        <InputError message={errors.email} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="prefecture"
                            className="block text-900 font-medium mb-2"
                        >
                            Post Code<span className="text-red-500">*</span>
                        </label>
                        <div className="p-inputgroup flex-1">
                            <Button
                                type="button"
                                icon="pi pi-search"
                                className="p-button-secondary"
                                onClick={handleSearch}
                            ></Button>
                            <InputText
                                id="post_code"
                                type="text"
                                placeholder="Post Code"
                                className="w-full"
                                onChange={(e) => setPostCode(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>
                        <InputError message={errors.post_code} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="prefecture"
                            className="block text-900 font-medium mb-2"
                        >
                            Prefecture<span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="prefecture"
                            type="text"
                            placeholder="Prefecture"
                            className="w-full"
                            readOnly
                            value={prefectureName}
                        />
                    </div>
                    <Button
                        type="submit"
                        label="Save"
                        className="mt-2"
                        disabled={processing}
                    />
                </form>
            </div>
        </Layout>
    );
};

export default Form;
