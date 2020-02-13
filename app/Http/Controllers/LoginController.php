<?php
 
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\tb_user;
use App\login_tb_user;
use Validator;
use Illuminate\Support\Facades\Input;


class LoginController extends Controller
{
	public function showlogin () {
		return view ('sign-in');
	}
    public function login (Request $request){
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

    $uid_raw = explode("@", $email);
        $uid_1 = $uid_raw[0];
        $ldap_dn_pti = "uid=$uid_1,ou=user,o=pti,dc=pti-cosmetics,dc=com";
        $ldap_dn_prm = "uid=$uid_1,ou=user,o=pti,dc=paramaglobalinspira,dc=com";
        $ldap_password = $password;
        $host_paragon = "10.3.181.220";
        $host_parama = "10.3.181.221";
        $port = 389;

        $ldap_con_pti = ldap_connect($host_paragon,$port);
        $ldap_con_prm = ldap_connect($host_parama,$port);
        ldap_set_option($ldap_con_pti, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldap_con_prm, LDAP_OPT_PROTOCOL_VERSION, 3);

          if(@ldap_bind($ldap_con_pti, $ldap_dn_pti, $ldap_password) || @ldap_bind($ldap_con_prm, $ldap_dn_prm, $ldap_password)) {

          // $data = [
          //   'user_id' => $user['user_id'],
          //   'role_id' => $user['role_id'],
          //   'dc' => $user['dc'],
          //   'username' => $user['username'],
          //   'email' => $user['user_email'],
          // ];

        // if successful, then redirect to their intended location
      return redirect()->intended('/');
    } else {
        return redirect('sign-in')->with('alert','Password atau Email, Salah !');
    }

  }
 



//==============LOGIN LOCAL DATABASE=========================
    // 	$data=tb_user::where('email_user',$request->email_user)->where('password', $request->password)->get();
    // 	if(count($data)>0) {
    // 		return redirect('/');
    // 	}else {
    // 		 return redirect('sign-in')->with('alert','Password atau Email, Salah !');
    // 	}

  


    function logout (Request $request) {
    	Session::flush();
        return redirect('sign-in')->with('alert','Kamu sudah logout');
    }

}
 