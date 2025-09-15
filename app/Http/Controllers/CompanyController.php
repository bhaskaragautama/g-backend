<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyStoreRequest;
use App\Models\Company;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::all();
        return Inertia::render('Company/Index', [
            'companies' => $companies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Company/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyStoreRequest $request)
    {
        echo '<pre>';
        print_r($request->all());
        echo '</pre>';
        exit;
        DB::beginTransaction();
        try {
            $company = Company::create($request->validated());

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = 'Image_' . $company->id . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('public/company_images', $imageName);
                if (!$path) {
                    throw new Exception('Image upload failed');
                }
                $company->image = 'company_images/' . $imageName;
                $company->save();
            }
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Company creation failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
                'company_id' => isset($company) ? $company->id : null,
            ]);
            return redirect()->back()->withErrors(['error' => 'Failed to create company.']);
        }
        DB::commit();
        return redirect()->route('companies.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        return Inertia::render('Company/Form', [
            'company' => $company
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
