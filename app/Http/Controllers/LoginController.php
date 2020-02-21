<?php
  
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Tb_user;
use App\Login_tb_user;
use Validator;
use Illuminate\Support\Facades\Input;
use DB;

class LoginController extends Controller
{
  protected $session;
  protected $load;
 
	public function showlogin () {
		return view ('sign-in');
	}
    public function login (Request $request){

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');
        $role_user = '2';

          $request->session()->put('emails', $email);

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

          $data = Tb_user::where(['email' => $email])->first();

          if($data) {
                 Session::put('name',$data->name);
                Session::put('email',$data->email);
                Session::put('user_id',$data->user_id);
                Session::put('role_id',$data->role_id);
                Session::put('divisi_user',$data->divisi_user);
                Session::put('area_user',$data->area_user);
                Session::put('phone_user',$data->phone_user);
                Session::put('login',TRUE);

                $role = Session::get('role_id');

             if ($role == 2) {
              # User
            return redirect()->intended('/');
          } elseif ($role == 1) {
            # Admin
            return redirect()->intended('/admin/articles');
          } 
               else{
                return redirect('/sign-in')->with('alert','Password atau Email, Salah !');
            }
        } else {

          DB::table('tb_user')->insert([
          'email' => $email,
          'role_id' => $role_user,
        ]);

          $data = Tb_user::where(['email' => $email])->first();

          Session::put('role_id',$data->role_id);
        
         return redirect()->intended('profile/edit/{id_user}');
        }
      } else {
         return redirect('/sign-in')->with('alert','Gunakan email pti-cosmetics!');
      }
    }
      
//==============LOGIN LOCAL DATABASE=========================
    // 	$data=tb_user::where('email_user',$request->email_user)->where('password', $request->password)->get();
    // 	if(count($data)>0) {
    // 		return redirect('/');
    // 	}else {
    // 		 return redirect('sign-in')->with('alert','Password atau Email, Salah !');
    // 	}

    public function logout (Request $request) {
    	Session::flush();
        return redirect('sign-in')->with('alert','Kamu sudah logout');
    }

}
 