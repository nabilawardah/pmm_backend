<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;

class DummyController extends Controller
{
    private $all_division;
    private $all_working_area;

    public function __construct()
    {
        $this->all_division = [
            (object) ['name' => 'Kebersihan', 'value' => 'Kebersihan'],
            (object) ['name' => 'Operasional', 'value' => 'Operasional'],
            (object) ['name' => 'Logistik', 'value' => 'Logistik'],
            (object) ['name' => 'Konsumsi', 'value' => 'Konsumsi'],
            (object) ['name' => 'Public Relation', 'value' => 'Public Relation'],
            (object) ['name' => 'Marketing', 'value' => 'Marketing'],
        ];

        $this->all_working_area = [
            (object) ['name' => 'OB', 'value' => 'OB'],
            (object) ['name' => 'OP', 'value' => 'OP'],
            (object) ['name' => 'LG', 'value' => 'LG'],
            (object) ['name' => 'KS', 'value' => 'KS'],
            (object) ['name' => 'PR', 'value' => 'PR'],
            (object) ['name' => 'MK', 'value' => 'MK'],
        ];
    }

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
        $user_id = (int) $request->user_id;
        $jsonString = file_get_contents(base_path('public/data/articles.json'));
        $contents = json_decode($jsonString, true);
        $data = $contents['data'];

        $new_article_id = count($data) + 1;

        $new_article = (object) [
            'id' => $new_article_id,
            'author' => $user_id,
            'published' => false,
        ];
        array_push($data, $new_article);

        $contents['data'] = $data;

        // Write File
        $newJsonString = json_encode($contents, JSON_PRETTY_PRINT);
        file_put_contents(base_path('public/data/articles.json'), stripslashes($newJsonString));

        $path = public_path('articles/user-'.strval($user_id));
        if (!File::isDirectory($path)) {
            File::makeDirectory($path, 0777, true, true);
        }

        return redirect('admin/articles/'.$user_id.'/edit/'.$new_article_id)->with('active_page', 'Articles');
    }

    public function edit_article(Request $request)
    {
        return view('admin.articles.edit', [
            'user_id' => $request->user_id,
            'article_id' => $request->id,
            'active_page' => 'Articles',
        ]);
    }

    public function post_article_media(Request $request)
    {
        request()->validate([
            'media' => 'required|mimes:jpeg,png,jpg,gif,svg,mp4,avi,3gp,webm,mpeg|max:102400',
        ]);

        if ($file = $request->file('media')) {
            $destinationPath = 'articles/user-'.$request->id; // upload path
            $articleMedia = date('YmdHis').'-'.strtolower(str_replace(' ', '-', $file->getClientOriginalName()));
            $file->move($destinationPath, $articleMedia);
            $response = [
                'url' => '/articles/user-'.$request->id.'/'.$articleMedia,
                'media' => $request->file(),
            ];

            return $response;
        }
    }

    public function update_article(Request $request)
    {
    }

    public function submit_article(Request $request)
    {
        $data_placeholder = [];
        $new_article = [];
        $jsonString = file_get_contents(base_path('public/data/articles.json'));
        $contents = json_decode($jsonString, true);
        $data = $contents['data'];

        foreach ($data as $article) {
            if ((int) $article['id'] === (int) $request->article_id && (int) $article['author'] === (int) $request->user_id) {
                // return substr($request->html, 1, -1);

                $article['title'] = $request->title;
                $article['subtitle'] = $request->subtitle;
                $article['content'] = json_decode($request->content);
                $article['html'] = $request->html;
                $article['published'] = true;

                $new_article = $article;

                array_push($data_placeholder, $article);
            } else {
                array_push($data_placeholder, $article);
            }
        }

        $contents['data'] = $data_placeholder;

        $newJsonString = json_encode($contents, JSON_PRETTY_PRINT | JSON_HEX_QUOT);
        file_put_contents(base_path('public/data/articles.json'), stripslashes($newJsonString));

        return $new_article;
    }

    public function show_user(Request $request)
    {
        $user = (object) [
            'id' => 1,
            'name' => 'Ongki Herlambang',
            'role' => 'admin',
            'photo' => 'ongki.jpg',
            'email' => 'ongki@herlambang.design',
            'phone' => '082377296969',
            'working_area' => 'OB',
            'divisi' => 'Kebersihan',
        ];

        return view('web.profile.index', [
            'user' => $user,
            'active_page' => 'Profile',
            'all_division' => $this->all_division,
            'all_working_area' => $this->all_working_area,
        ]);
    }

    public function change_role(Request $request)
    {
        if ($request->current === 'admin') {
            $new_role = 'user';
        } else {
            $new_role = 'admin';
        }

        sleep(2);

        return ['id' => $request->id, 'role' => $new_role];
    }

    public function article_page(Request $request)
    {
        $jsonString = file_get_contents(base_path('public/data/articles.json'));
        $contents = json_decode($jsonString, true);
        $data = $contents['data'];

        return view('web.articles.index', ['active_page' => 'Articles', 'articles' => $data]);
    }

    public function show_article(Request $request)
    {
        $jsonString = file_get_contents(base_path('public/data/articles.json'));
        $contents = json_decode($jsonString, true);
        $data = $contents['data'];

        foreach ($data as $article) {
            if ((int) $article['id'] === (int) $request->id) {
                return view('web.articles.detail', ['active_page' => 'Articles', 'article' => $article, 'html' => json_decode($article['html'])]);
            }
        }
    }
}
