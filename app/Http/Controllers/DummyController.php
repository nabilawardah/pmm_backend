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

    public function create_article(Request $request)
    {
        $jsonString = file_get_contents(base_path('public/data/articles.json'));
        $contents = json_decode($jsonString, true);
        $data = $contents['data'];

        $new_article_id = count($data) + 1;

        $new_article = (object) [
            'id' => $new_article_id,
            'published' => false,
        ];
        array_push($data, $new_article);

        $contents['data'] = $data;

        // Write File
        $newJsonString = json_encode($contents, JSON_PRETTY_PRINT);
        file_put_contents(base_path('public/data/articles.json'), stripslashes($newJsonString));

        $path = public_path('articles/article-'.strval($new_article_id));
        if (!File::isDirectory($path)) {
            File::makeDirectory($path, 0777, true, true);
        }

        return redirect('/admin/articles/edit/'.$new_article_id, ['active_page' => 'Articles']);
    }

    public function edit_article(Request $request)
    {
        return view('admin.articles.edit', ['article_id' => $request->id, 'active_page' => 'Articles']);
    }

    public function post_article_media(Request $request)
    {
        request()->validate([
            'media' => 'required|mimes:jpeg,png,jpg,gif,svg,mp4,avi,3gp,webm,mpeg|max:102400',
        ]);

        if ($file = $request->file('media')) {
            $destinationPath = 'articles/article-'.$request->id; // upload path
            $articleMedia = date('YmdHis').'-'.strtolower(str_replace(' ', '-', $file->getClientOriginalName()));
            $file->move($destinationPath, $articleMedia);
            $response = [
                'url' => '/articles/article-'.$request->id.'/'.$articleMedia,
                'media' => $request->file(),
            ];

            return $response;
        }
    }
}
