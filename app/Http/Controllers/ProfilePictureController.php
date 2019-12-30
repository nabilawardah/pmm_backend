<?php

namespace App\Http\Controllers;

class ProfilePictureController extends Controller
{
    public function index()
    {
        return 'default.png';
    }

    public function save()
    {
        request()->validate([
            'fileUpload' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
       ]);
        if ($files = $request->file('fileUpload')) {
            $destinationPath = 'public/images/users/'; // upload path
            $profileImage = date('YmdHis').'.'.$files->getClientOriginalExtension();
            $files->move($destinationPath, $profileImage);

            return $profileImage;
        }
    }
}
