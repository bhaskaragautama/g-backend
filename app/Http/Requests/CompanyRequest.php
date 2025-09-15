<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:companies,email',
            'prefecture_id' => 'required|exists:prefectures,id',
            'phone' => 'required|digits_between:9,15',
            'postcode' => 'required|string|min:7|max:7',
            'city' => 'required|string|max:255',
            'local' => 'required|string|max:255',
            'street_address' => 'required|string|max:255',
            'business_hour' => 'required|string|max:255',
            'regular_holiday' => 'required|string|max:255',
            'fax' => 'required|digits_between:9,15',
            'url' => 'required|url|max:255',
            'license_number' => 'required|string|max:50',
        ];

        if ($this->isMethod('post')) {
            $rules['image'] = 'required|image|mimes:jpeg,png,jpg,gif|max:2048';
        } elseif ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['image'] = 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:2048';
            $rules['email'] = 'required|email|unique:companies,email,' . $this->company->id;
        }

        return $rules;
    }
}
