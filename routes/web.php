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
    return view('sign-in', ['active_page' => 'Sign in']);
});
Route::post('/sign-in', function () {
    sleep(2);

    return view('web.home', ['active_page' => 'Home']);
});

// Web
Route::get('/', function () {
    return view('web.home', ['active_page' => 'Home']);
});
Route::get('/profile', function () {
    return view('web.profile.index', ['active_page' => 'Profile']);
});
Route::get('/profile/{id}', function () {
    return view('web.profile.detail', ['active_page' => 'Profile']);
});
Route::get('/events', function () {
    return view('web.events.index', ['active_page' => 'Events']);
});
Route::get('/articles', function () {
    return view('web.articles.index', ['active_page' => 'Articles']);
});
Route::get('/articles/{id}', function () {
    return view('web.articles.detail', ['active_page' => 'Articles']);
});
Route::get('/events/{id}', function () {
    return view('web.events.detail', ['active_page' => 'Events']);
});
Route::get('/gallery', function () {
    return view('web.gallery.index', ['active_page' => 'Gallery']);
});

// Admin
// Route::get('/admin', function () {
//     return view('admin.home', ['active_page' => 'Home']);
// });
Route::get('/admin/articles', function () {
    return view('admin.articles.index', ['active_page' => 'Articles']);
});

Route::get('/admin/articles/edit/{id}', 'DummyController@edit_article');

Route::get('/admin/articles/{id}', function () {
    return view('admin.articles.detail', ['active_page' => 'Articles']);
});
Route::get('/admin/events', function () {
    return view('admin.events.index', ['active_page' => 'Events']);
});
Route::get('/admin/events/{id}', function () {
    return view('admin.events.detail', ['active_page' => 'Events']);
});
Route::get('/admin/users', function () {
    return view('admin.users.index', ['active_page' => 'Users']);
});
Route::get('/admin/users/{id}', function () {
    return view('admin.users.detail', ['active_page' => 'Users']);
});
Route::get('/admin/gallery', function () {
    return view('admin.gallery.index', ['active_page' => 'Gallery']);
});

Route::post('/api/profile/{id}', 'DummyController@save_user');
Route::post('/api/photo/{id}', 'DummyController@save_photo');
Route::get('/articles/{user_id}/create', 'DummyController@create_article');
Route::post('/articles/{id}/media', 'DummyController@post_article_media');
