<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::all();
        return Inertia::render('Company/Index', [
            'companies' => $companies,
            'flash' => session('flash'),
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
    public function store(CompanyRequest $request)
    {
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
        return redirect()->route('companies.index')->with('flash', [
            'type' => 'success',
            'message' => 'Company created successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        // Not implemented as per current requirements
        return redirect()->route('companies.index');
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
    public function update(CompanyRequest $request, Company $company)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            if ($request->hasFile('image')) {
                // Delete old image
                Storage::disk('public')->delete($company->image);
                $image = $request->file('image');
                $imageName = 'Image_' . $company->id . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('public/company_images', $imageName);
                if (!$path) {
                    throw new Exception('Image upload failed');
                }
                $company->image = 'company_images/' . $imageName;
                $company->save();
            } else {
                $data['image'] = $company->image;
            }
            $company->update($data);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Company update failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
                'company_id' => $company->id,
            ]);
            return redirect()->back()->withErrors(['error' => 'Failed to update company.']);
        }
        DB::commit();
        return redirect()->route('companies.index')->with('flash', [
            'type' => 'success',
            'message' => 'Company updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        DB::beginTransaction();
        try {
            // Delete associated image
            Storage::disk('public')->delete($company->image);
            $company->delete();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Company deletion failed: ' . $e->getMessage(), [
                'exception' => $e,
                'company_id' => $company->id,
            ]);
            return redirect()->back()->withErrors(['error' => 'Failed to delete company.']);
        }
        DB::commit();
        return redirect()->route('companies.index');
    }
}
