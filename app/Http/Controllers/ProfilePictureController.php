<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;

class ProfilePictureController extends Controller
{
    public function index()
    {
        return 'default.png';
    }

    public function save(Request $request)
    {
        request()->validate([
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
           ]);

        if ($file = $request->file('photo')) {
            $destinationPath = 'images/users/'; // upload path
            $profileImage = date('YmdHis').'-'.strtolower($file->getClientOriginalName());
            $file->move($destinationPath, $profileImage);

            sleep(2);

            return $profileImage;
        }
    }
}
