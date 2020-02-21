<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;
use App\Tb_user;

class UserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $email = Session::get('email');
        $role_id = Session::get('role_id');
        //$user = \App\Tb_user::where('email', $email)->first();
        if ($role_id == '0') {
            return redirect('/profile/edit/{id}');
        } elseif ($role_id == '2') {
            return $next($request);
        } elseif ($role_id == '1') {
            return redirect('/admin/articles');
        } 

        return $next($request);
    }
}
