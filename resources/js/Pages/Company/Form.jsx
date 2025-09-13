import React from "react";
import Layout from "@/Layouts/layout/layout";
import {BreadCrumb} from "primereact/breadcrumb";
import {InputText} from "primereact/inputtext";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import {Button} from "primereact/button";

const items = [
    { label: 'Companies', url: '/companies' },
    { label: 'Create', url: false }
];

const home = { icon: 'pi pi-home', url: '/dashboard' };

const submit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
};

const Form = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    });
    return (
        <Layout>
            <h1>Company Form</h1>
            <BreadCrumb model={items} home={home} className="mb-5"/>
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
                        <Button icon="pi pi-search" className="p-button-secondary"></Button>
                        <InputText
                            id="post_code"
                            type="text"
                            placeholder="Post Code"
                            className="w-full"
                        />
                        </div>
                        <InputError message={errors.post_code} className="" />
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Form;
