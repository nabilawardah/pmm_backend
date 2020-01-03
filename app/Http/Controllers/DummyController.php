<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;

class DummyController extends Controller
{
    public function save_user(Request $request)
    {
        sleep(2);

        return $request;
    }

    public function save_photo(Request $request)
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

    public function create_post(Request $request)
    {
        $jsonString = file_get_contents(base_path('public/data/articles.json'));
        $data = json_decode($jsonString, true);
        $new_article_id = count($data) + 1;

        $new_article = (object) ['id' => $new_article_id];
        array_push($data, $new_article);

        // Write File
        $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(base_path('public/data/articles.json'), stripslashes($newJsonString));

        $path = public_path('articles/article-'.strval($new_article_id));
        if (!File::isDirectory($path)) {
            File::makeDirectory($path, 0777, true, true);
        }

        return 'articles/article-'.strval($new_article_id);
    }

    public function post_media(Request $request)
    {
        request()->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
           ]);

        if ($file = $request->file('image')) {
            $destinationPath = 'images/users/'; // upload path
            $profileImage = date('YmdHis').'-'.strtolower($file->getClientOriginalName());
            $file->move($destinationPath, $profileImage);

            sleep(2);

            return $profileImage;
        }
    }
}
