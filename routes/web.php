<?php
 
// Route::get('/sign-in', function () {
//     return view('sign-in', ['active_page' => 'Sign in']);
// });
// Route::post('/sign-in', function () {
//     sleep(2); //Give delay in seconds

//     return view('web.home', ['active_page' => 'Home']);
// });

Route::get('/sign-in', array('uses' => 'LoginController@showlogin'));
Route::post('/sign-in', array('uses' => 'LoginController@login'));

// Web
Route::get('/', function () {
    return view('web.home', ['active_page' => 'Home']);
});
Route::get('/profile/{id}', 'DummyController@show_user');

Route::get('/articles', 'DummyController@article_page');
Route::get('/articles/{id}', 'DummyController@show_article');

Route::get('/events', 'DummyController@events_page');
Route::get('/events/{id}', 'DummyController@show_event');

Route::get('/gallery', 'DummyController@gallery_page');

Route::get('/admin/articles', function () {
    return view('admin.articles.index', ['active_page' => 'Articles']);
});
Route::get('/admin/articles/{user_id}/edit/{id}', 'DummyController@edit_article');
Route::get('/admin/articles/{id}', 'DummyController@show_article_admin');

Route::get('/admin/events', function () {
    return view('admin.events.index', ['active_page' => 'Events']);
});
Route::get('/admin/events/{id}', function () {
    return view('admin.events.detail', ['active_page' => 'Events']);
});
Route::get('/admin/events/create/{user_id}', 'DummyController@create_event');
Route::get('/admin/events/{user_id}/edit/{id}', 'DummyController@edit_event');

Route::get('/admin/users', function () {
    return view('admin.users.index', ['active_page' => 'Users']);
});
Route::get('/admin/users/{id}', function () {
    return view('admin.users.detail', ['active_page' => 'Users']);
});
Route::get('/admin/gallery', 'DummyController@admin_gallery_page');

Route::post('/api/role/{id}', 'DummyController@change_role');
Route::post('/api/profile/{id}', 'DummyController@save_user');
Route::post('/api/photo/{id}', 'DummyController@save_photo');

Route::get('/articles/create/{user_id}', 'DummyController@create_article');

Route::post('/api/articles/media/{id}', 'DummyController@post_article_media');
Route::post('/api/articles/submit/{article_id}', 'DummyController@submit_article');
Route::get('/api/articles', 'DummyController@get_all_articles');

Route::get('/api/articles/unlist/{article_id}', 'DummyController@unlist_article');
Route::get('/api/articles/publish/{article_id}', 'DummyController@publish_article');
Route::get('/api/articles/delete/{article_id}', 'DummyController@delete_article');

Route::get('/api/media/{user_id}', 'DummyController@get_all_media');

Route::get('/api/events', 'DummyController@get_data_events');
Route::post('/api/events/submit/{event_id}', 'DummyController@submit_event');
Route::post('/api/events/join/{event_id}', 'DummyController@join_event');
Route::post('/api/events/cancel_registration/{event_id}', 'DummyController@cancel_event_registration');
Route::get('/api/events/delete/{event_id}', 'DummyController@delete_event');

Route::post('/api/gallery/{user_id}', 'DummyController@post_gallery_item');
Route::post('/api/gallery/post/{user_id}', 'DummyController@post_gallery');
