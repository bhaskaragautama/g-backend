import { useState, useRef, useEffect } from "react";
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
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";

const Form = (props) => {
    // Determine if we are in edit mode based on the presence of a company prop
    const isEdit = !!props.company;

    const toast = useRef(null);

    const op = useRef(null);

    // Breadcrumb items
    const items = [
        { label: "Companies", url: "/companies" },
        { label: isEdit ? "Edit" : "Create", url: false },
    ];
    const home = { icon: "pi pi-home", url: "/dashboard" };

    // State for form elements
    const [prefectureName, setPrefectureName] = useState("");

    // Inertia form handling
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: props.company ? props.company.name : "",
        email: props.company ? props.company.email : "",
        prefecture_id: props.company ? props.company.prefecture_id : "",
        phone: props.company ? props.company.phone : "",
        postcode: props.company ? props.company.postcode : "",
        city: props.company ? props.company.city : "",
        local: props.company ? props.company.local : "",
        street_address: props.company ? props.company.street_address : "",
        business_hour: props.company ? props.company.business_hour : "",
        regular_holiday: props.company ? props.company.regular_holiday : "",
        image: null,
        fax: props.company ? props.company.fax : "",
        url: props.company ? props.company.url : "",
        license_number: props.company ? props.company.license_number : "",
        // force put
        _method: isEdit ? "PUT" : "POST",
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if (isEdit) {
            post(route("companies.update", { company: props.company.id }), {
                forceFormData: true,
            });
        } else {
            post(route("companies.store"));
        }
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

    // if edit, populate prefecture name
    useEffect(() => {
        if (isEdit) {
            handleSearch();
        }
        // Only run once when isEdit becomes true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    return (
        <Layout>
            <Toast ref={toast} />
            <h1>Company Form</h1>
            <BreadCrumb model={items} home={home} className="mb-5" />
            <div className="card p-fluid mb-5">
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
                            className="hidden"
                            id="image"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                        />
                        <div className="flex gap-3 mb-2">
                            <div>
                                <Button
                                    type="button"
                                    label="Choose File"
                                    onClick={() =>
                                        document.getElementById("image").click()
                                    }
                                />
                            </div>
                            <div>
                                {/* <Button
                                    type="button"
                                    label="Current Image"
                                    className={isEdit ? "" : "hidden"}
                                    severity="secondary"
                                    onClick={(e) => op.current.toggle(e)}
                                />
                                <OverlayPanel ref={op}>
                                    <img
                                        src={`/storage/${data.image}`}
                                        alt="Company Image"
                                    ></img>
                                </OverlayPanel> */}
                            </div>
                        </div>
                        {/* <span>
                            {isEdit && !data.image.name
                                ? " No file chosen"
                                : data.image
                                ? ` ${data.image.name}`
                                : " No file chosen"}
                        </span> */}
                        <InputError message={errors.image} className="" />
                    </div>
                    <Divider />
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
