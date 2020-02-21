<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Session;
use App\Tb_user;

class AdminRole
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
       $user = \App\Tb_user::where('email', $email)->first();
        if ($user->role_id == '1') {
            return $next($request);
        } elseif ($user->role_id == '2') {
            return redirect('/');
        }

        return $next($request);
    }
}
