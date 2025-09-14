import { useState, useRef } from "react";
import Layout from "@/Layouts/layout/layout";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Button } from "primereact/button";
import { fetchAddressByPostcode } from "@/Services/postcode";
import { Toast } from "primereact/toast";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";

const Form = (props) => {
    console.log(route().current());
    console.log(route().params);
    // Determine if we are in edit mode based on the presence of a company prop
    const isEdit = !!props.company;

    const toast = useRef(null);

    // Breadcrumb items
    const items = [
        { label: "Companies", url: "/companies" },
        { label: "Create", url: false },
    ];
    const home = { icon: "pi pi-home", url: "/dashboard" };

    // State for form elements
    const [prefectureName, setPrefectureName] = useState("");

    // Inertia form handling
    const { data, setData, post, processing, errors, reset } = useForm(
        props.company || {
            name: "",
            email: "",
            prefecture_id: "",
            phone: "",
            postcode: "",
            city: "",
            local: "",
            street_address: "",
            business_hour: "",
            regular_holiday: [],
            image: null,
            fax: "",
            url: "",
            license_number: "",
        }
    );

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        post(route(isEdit ? "companies.update" : "companies.store"));
    };

    // Handle postcode search
    async function handleSearch() {
        if (!data.postcode) return;
        if (data.postcode.length !== 7) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Postcode must be 7 digits.",
                life: 3000,
            });
            return;
        }
        try {
            const response = await fetchAddressByPostcode(data.postcode);
            setPrefectureName(response.prefecture.display_name || "");
            setData({
                ...data,
                city: response.city || "",
                local: response.local || "",
                prefecture_id: response.prefecture.id || "",
            });
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Address fetched successfully.",
                life: 3000,
            });
        } catch (error) {
            toast.current.show({
                severity: "warn",
                summary: "Not Found",
                detail: "No data found for this postcode.",
                life: 3000,
            });
            setPrefectureName("");
            // setCity("");
            // setLocal("");
            setData("prefecture_id", "");
            console.error("Error fetching address:", error);
        }
    }

    return (
        <Layout>
            <Toast ref={toast} />
            <h1>Company Form</h1>
            <BreadCrumb model={items} home={home} className="mb-5" />
            <div>
                <form onSubmit={submit} encType="multipart/form-data">
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
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="postcode"
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
                                id="postcode"
                                type="text"
                                maxLength={7}
                                placeholder="Post Code"
                                className="w-full"
                                value={data.postcode}
                                onChange={(e) => {
                                    setData("postcode", e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>
                        <InputError message={errors.postcode} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="prefecture"
                            className="block text-900 font-medium mb-2"
                        >
                            Prefecture
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
                    <div className="mb-3">
                        <label
                            htmlFor="city"
                            className="block text-900 font-medium mb-2"
                        >
                            City
                        </label>
                        <InputText
                            id="city"
                            type="text"
                            placeholder="City"
                            className="w-full"
                            readOnly
                            value={data.city}
                        />
                        <InputError message={errors.city} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="local"
                            className="block text-900 font-medium mb-2"
                        >
                            Local
                        </label>
                        <InputText
                            id="local"
                            type="text"
                            placeholder="Local"
                            className="w-full"
                            readOnly
                            value={data.local}
                        />
                        <InputError message={errors.local} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="address"
                            className="block text-900 font-medium mb-2"
                        >
                            Street Address
                            <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="address"
                            type="text"
                            placeholder="Street Address"
                            className="w-full"
                            value={data.street_address}
                            onChange={(e) =>
                                setData("street_address", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.street_address}
                            className=""
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="business_hour"
                            className="block text-900 font-medium mb-2"
                        >
                            Business Hours
                        </label>
                        <InputMask
                            id="business_hour"
                            type="text"
                            placeholder="Business Hours"
                            className="w-full"
                            mask="99:99 to 99:99"
                            value={data.business_hour}
                            onChange={(e) =>
                                setData("business_hour", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.business_hour}
                            className=""
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="regular_holiday"
                            className="block text-900 font-medium mb-2"
                        >
                            Regular Holiday
                        </label>
                        <InputTextarea
                            id="regular_holiday"
                            placeholder="Regular Holiday"
                            className="w-full"
                            value={data.regular_holiday}
                            onChange={(e) =>
                                setData("regular_holiday", e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="phone"
                            className="block text-900 font-medium mb-2"
                        >
                            Phone<span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="phone"
                            type="text"
                            placeholder="Phone"
                            className="w-full"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError message={errors.phone} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="fax"
                            className="block text-900 font-medium mb-2"
                        >
                            Fax<span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="fax"
                            type="text"
                            placeholder="Fax"
                            className="w-full"
                            value={data.fax}
                            onChange={(e) => setData("fax", e.target.value)}
                        />
                        <InputError message={errors.fax} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="url"
                            className="block text-900 font-medium mb-2"
                        >
                            Website URL
                        </label>
                        <InputText
                            id="url"
                            type="text"
                            placeholder="Website URL"
                            className="w-full"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                        />
                        <InputError message={errors.url} className="" />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="license_number"
                            className="block text-900 font-medium mb-2"
                        >
                            License Number
                        </label>
                        <InputText
                            id="license_number"
                            type="text"
                            placeholder="License Number"
                            className="w-full"
                            value={data.license_number}
                            onChange={(e) =>
                                setData("license_number", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.license_number}
                            className=""
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="image"
                            className="block text-900 font-medium mb-2"
                        >
                            Company Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        label="Save"
                        className="mt-2"
                        disabled={processing}
                    />
                </form>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </Layout>
    );
};

export default Form;
