<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/sign-in', function () {
    return view('sign-in');
});

// Web
Route::get('/', function () {
    return view('web.home');
});
Route::get('/profile', function () {
    return view('web.profile.index');
});
Route::get('/profile/{id}', function () {
    return view('web.profile.detail');
});
Route::get('/events', function () {
    return view('web.events.index');
});
Route::get('/articles', function () {
    return view('web.articles.index');
});
Route::get('/articles/{id}', function () {
    return view('web.articles.detail');
});
Route::get('/events/{id}', function () {
    return view('web.events.detail');
});
Route::get('/gallery', function () {
    return view('web.gallery.index');
});

// Admin
Route::get('/admin', function () {
    return view('admin.home');
});
Route::get('/admin/articles', function () {
    return view('admin.articles.index');
});
Route::get('/admin/articles/{id}', function () {
    return view('admin.articles.detail');
});
Route::get('/admin/events', function () {
    return view('admin.events.index');
});
Route::get('/admin/events/{id}', function () {
    return view('admin.events.detail');
});
Route::get('/admin/users', function () {
    return view('admin.users.index');
});
Route::get('/admin/users/{id}', function () {
    return view('admin.users.detail');
});
Route::get('/admin/gallery', function () {
    return view('admin.gallery.index');
});

Route::get('/api/users', function () {
    $users = [
        'data' => [
        (object) [
            'id' => 1,
            'name' => 'Ongki Herlambang',
            'email' => 'ongkiherlambang@gmail.com',
            'photo' => 'helloworld',
            'phone' => '082377296969',
            'divisi' => 'Kebersihan',
            'working_area' => 'OB',
        ],
        (object) [
            'id' => 2,
            'name' => 'Khairani Ummah',
            'email' => 'khairani@gmail.com',
            'photo' => 'dungdung',
            'phone' => '080989999',
            'divisi' => 'Kebersihan',
            'working_area' => 'OB',
        ], ],
    ];

    return $users;
});
