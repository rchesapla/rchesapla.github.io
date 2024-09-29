<?php

namespace App\Http\Controllers\Frontend\User;

use App\Http\Controllers\Controller;
use App\Models\FileEntry;
use Hash;
use Illuminate\Http\Request;
use Validator;

class FileController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('search')) {
            $q = $request->search;
            $fileEntries = FileEntry::where(function ($query) {
                $query->currentUser();
            })->where(function ($query) use ($q) {
                $query->where('shared_id', 'like', '%' . $q . '%')
                    ->OrWhere('name', 'like', '%' . $q . '%')
                    ->OrWhere('filename', 'like', '%' . $q . '%')
                    ->OrWhere('mime', 'like', '%' . $q . '%')
                    ->OrWhere('size', 'like', '%' . $q . '%')
                    ->OrWhere('extension', 'like', '%' . $q . '%');
            })->notExpired()->orderByDesc('id')->paginate(20);
            $fileEntries->appends(['search' => $q]);
        } else {
            $fileEntries = FileEntry::currentUser()->notExpired()->orderByDesc('id')->paginate(20);
        }
        return view('frontend.user.files.index', ['fileEntries' => $fileEntries]);
    }

    public function edit($shared_id)
    {
        $fileEntry = FileEntry::where('shared_id', $shared_id)->currentUser()->notExpired()->firstOrFail();
        return view('frontend.user.files.edit', ['fileEntry' => $fileEntry]);
    }

    public function update(Request $request, $shared_id)
    {
        $fileEntry = FileEntry::where('shared_id', $shared_id)->currentUser()->notExpired()->first();
        if (is_null($fileEntry)) {
            toastr()->error(lang('File not found, missing or expired please refresh the page and try again', 'files'));
            return back();
        }
        $validator = Validator::make($request->all(), [
            'filename' => ['required', 'string', 'max:255'],
            'access_status' => ['required', 'boolean'],
            'password' => ['nullable', 'string', 'max:255'],
        ]);
        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                toastr()->error($error);
            }
            return back();
        }
        if ($request->has('password') && !is_null($request->password)) {
            if (subscription()->plan->password_protection) {
                $request->password = Hash::make($request->password);
            } else {
                $request->password = null;
            }
        }
        $update = $fileEntry->update([
            'name' => $request->filename,
            'access_status' => $request->access_status,
            'password' => $request->password,
        ]);
        if ($update) {
            toastr()->success(lang('Updated successfully', 'files'));
            return back();
        }
    }

    public function destroy($shared_id)
    {
        $fileEntry = FileEntry::where('shared_id', $shared_id)->currentUser()->notExpired()->first();
        if (is_null($fileEntry)) {
            toastr()->error(lang('File not found, missing or expired please refresh the page and try again', 'files'));
            return back();
        }
        try {
            $handler = $fileEntry->storageProvider->handler;
            $delete = $handler::delete($fileEntry->path);
            if ($delete) {
                $fileEntry->delete();
                toastr()->success(lang('Deleted successfully', 'files'));
                return redirect()->route('user.files.index');
            }
        } catch (\Exception$e) {
            toastr()->error(lang('File not found, missing or expired please refresh the page and try again', 'files'));
            return back();
        }
    }

    public function destroyAll(Request $request)
    {
        if (empty($request->ids)) {
            return response()->json(['error' => lang('You have not selected any file', 'files')]);
        }
        $ids = explode(',', $request->ids);
        foreach ($ids as $shared_id) {
            $fileEntry = FileEntry::where('shared_id', $shared_id)->currentUser()->notExpired()->first();
            if (!is_null($fileEntry)) {
                try {
                    $handler = $fileEntry->storageProvider->handler;
                    $delete = $handler::delete($fileEntry->path);
                    if ($delete) {
                        $fileEntry->delete();
                    }
                } catch (\Exception$e) {
                    toastr()->error(lang('File not found, missing or expired please refresh the page and try again', 'files'));
                    return back();
                }
            }
        }
        toastr()->success(lang('Deleted successfully', 'files'));
        return back();
    }
}
