<?php


namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Image;
use Storage;
use Session;
use File;
use PragmaRX\Google2FALaravel\Facade as Google2FA;

class UsersController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
      $this->middleware('auth');
  }


  public function index(Request $request)
  {
      $q = $request->input( 'q' );

      $result = User::whereNull('deleted_at')->whereIn('role', ['admin','staff']);

      if($q != ""){
          $result = $result->where(function ($query) use($q) {
              $query->where('name', 'like', '%' . $q . '%')
                 ->orWhere('email', 'like', '%' . $q . '%')
                 ->orWhere('phone', 'like', '%' . $q . '%')
                 ->orWhere('role', 'like', '%' . $q . '%');
          });
      }

      $result = $result->orderBy('created_at','desc')->paginate();

      return view ('admin.users.index' )->withResult( $result )->withQuery( $q )->withisDeleted(false);
      
  }

  public function deleted(Request $request)
  {

      $q = $request->input( 'q' );

      $result = User::onlyTrashed()->whereIn('role', ['admin','staff']);

      if($q != ""){
          $result = $result->where(function ($query) use($q) {
              $query->where('name', 'like', '%' . $q . '%')
                 ->orWhere('email', 'like', '%' . $q . '%')
                 ->orWhere('phone', 'like', '%' . $q . '%')
                 ->orWhere('role', 'like', '%' . $q . '%');
          });
      }

      $result = $result->orderBy('created_at','desc')->paginate();

      return view ('admin.users.index' )->withResult( $result )->withQuery( $q )->withisDeleted(true);
  }    

  public function add(Request $request)
  {
      if ($request->getMethod() == 'POST') {

          $request->validate([
              'name' => 'required|string|max:255',
              'phone' => 'required|numeric|digits_between:10,20|unique:users',
              'email' => 'required|string|email|max:255|unique:users',
              'password' => 'required|string|min:6',
              'role' => 'required',
              'avatar' => 'nullable|image',
          ]);

          try{

              $user = new User();
              $user->name = $request->name;
              $user->email = $request->email;
              $user->password = Hash::make($request->password);
              $user->email_verified_at = date('Y-m-d H:i:s');
              $user->cela_verified = 1;
              $user->phone = $request->phone;

              $user->role = $request->role;
              $user->ip_address = $request->ip_address;
              $user->notification = $request->has('notification') ? 1 : 0;
              $user->inactive = $request->has('inactive') ? 1 : 0;

              ini_set('memory_limi', -1);
              if ($request->hasFile('avatar')) {
                  @Storage::delete($user->getOriginal('avatar'));
                  $path = $request->file('avatar')->store('profile');
                  $user->avatar = $path;
                  $image = Image::make(Storage::path($path));
                  $dimension = config('keysuser_avtar_dimension');
                  $image->resize($dimension['width'], $dimension['height']);
                  $image->save();
              }             

              $user->address = $request->address;
              $user->city = $request->city;
              $user->state = $request->state;
              $user->country = $request->country;
              $user->postalcode = $request->postalcode;

              if ($request->has('tfa_enabled')) {
                  $user->tfa_enabled = 1;
                  $user->tfa_key = Google2FA::generateSecretKey();
              } else {
                  $user->tfa_enabled = 0;
                  $user->tfa_key = null;
              }  
              
              $user->save();

              return redirect()->route('admin.users')->with('success', 'New User created.');

          } catch(\Exception $e){

              return redirect()->back()->with('error', $e->getMessage());

          }
      } 
      return view('admin.users.add');  
  }

  public function edit($user, Request $request)
  {
      $user = User::withTrashed()->find($user);

      if ($request->getMethod() == 'POST') {
          $request->validate([
              'name'   => 'required',
              'phone' => 'required|numeric|unique:users,phone,' . $user->id,
              'email'  => 'required|email|unique:users,email,' . $user->id,
              'role' => 'required',
              'avatar' => 'nullable|image',
          ]);

          try{
              $user->name = $request->name;
              $user->email = $request->email;
              $user->phone = $request->phone;

              $user->role = $request->role;
              $user->ip_address = $request->ip_address;
              $user->notification = $request->has('notification') ? 1 : 0;
              $user->inactive = $request->has('inactive') ? 1 : 0;

              ini_set('memory_limi', -1);
              if ($request->hasFile('avatar')) {
                  @Storage::delete($user->getOriginal('avatar'));
                  $path = $request->file('avatar')->store('profile');
                  $user->avatar = $path;
                  $image = Image::make(Storage::path($path));
                  $dimension = config('keysuser_avtar_dimension');
                  $image->resize($dimension['width'], $dimension['height']);
                  $image->save();
              }             

              $user->address = $request->address;
              $user->city = $request->city;
              $user->state = $request->state;
              $user->country = $request->country;
              $user->postalcode = $request->postalcode; 

              if ($request->has('tfa_enabled')) {
                  $user->tfa_enabled = 1;
                  $user->tfa_key = Google2FA::generateSecretKey();
              } else {
                  $user->tfa_enabled = 0;
                  $user->tfa_key = null;
              }

            $user->save();
            return redirect()->route('admin.users')->with('success', 'User Updated');
            
            } catch(\Exception $e){

                return redirect()->back()->with('error', $e->getMessage());

            }
      } 
      return view('admin.users.edit', compact('user'));
      
  }

  public function delete($user, $restore = 0)
  {

      $user = User::withTrashed()->find($user);

      if ($restore == 1) {
          $user->deleted_at = null;
          $user->save();
          $name = $user->name;
          return redirect()->back()->with('success', 'User ' . $name . ' Restored');
      }else if ($restore == 2) {
          $name = $user->name;
          $user->forceDelete();
          return redirect()->back()->with('success', 'User ' . $name . ' Deleted');
      } else {
          $name = $user->name;
          $user->delete();
          return redirect()->back()->with('success', 'User ' . $name . ' Deleted');
      }
  }  
  
  public function profile(Request $request)
  {
      $user = Auth::user();

      if ($request->getMethod() == 'POST') {

          $request->validate([
              'name' => 'required|string|max:255',
              'email' => 'required|string|email|max:255|unique:users,email,' .$user->id,
              'phone' => 'required|numeric|digits_between:10,20|unique:users,phone,' .$user->id,
              'avatar' => 'nullable|image',
          ]);

          $user->name = $request->name;
          $user->email = $request->email;
          $user->phone = $request->phone;

          ini_set('memory_limi', -1);
          if ($request->hasFile('avatar')) {
              @Storage::delete($user->getOriginal('avatar'));
              $path = $request->file('avatar')->store('profile');
              $user->avatar = $path;
              $image = Image::make(Storage::path($path));
              $dimension = config('keysuser_avtar_dimension');
              $image->resize($dimension['width'], $dimension['height']);
              $image->save();
          }

          if ($request->has('tfa_enabled')) {
              $user->tfa_enabled = 1;
              $user->tfa_key = Google2FA::generateSecretKey();
          } else {
              $user->tfa_enabled = 0;
              $user->tfa_key = null;
          }

          $user->address = $request->address;
          $user->city = $request->city;
          $user->state = $request->state;
          $user->country = $request->country;
          $user->postalcode = $request->postalcode; 

          $user->save();
          return redirect()->back()->with('success', 'Profile updated.');
      }

      return view('admin.profile.profile', ['user' => $user]);
  }


  public function changepassword(Request $request)
  {
      if ($request->getMethod() == 'POST') {
          $request->validate([
              'current' => 'required|string|min:6',
              'password' => 'required|string|min:6|confirmed',
          ]);

          $user = Auth::user();

          if (!Hash::check($request->current, $user->password)) {
            return redirect()->back()->with('error', 'Current password does not match.');
          }

          $user->password = Hash::make($request->password);
          $user->save();
          return redirect()->back()->with('success', 'Password updated.');
      }
      return view('admin.profile.password');
  }

  /*change password by admin*/
  public function resetPassword($user, Request $request)
  {
      $user = User::withTrashed()->find($user);

      if ($request->getMethod() == 'POST') {
          $request->validate([
              'password' => 'required|min:6',
          ]);
          $user->password = Hash::make($request->password);
          $user->save();
          return redirect()->back()->with('success', 'Password Change: ' . $user->name);
      }
  }

  public function userAccess($user, Request $request){

      $user = User::withTrashed()->find($user);

      $model_list = $this->getModelsList();

      if ($request->getMethod() == 'POST') {

        try{

          $requests = $request->except('_token');

          $user_accesses = count($requests) > 0 ? json_encode($requests) : NULL;

          $user->user_accesses = $user_accesses;

          $user->save();

          return redirect()->route('admin.users')->with('success', 'User access updated!');

        } catch(\Exception $e){
          
          return redirect()->back()->with('error', $e->getMessage());
        }
      }
      
      $user->user_accesses = empty($user->user_accesses) ? [] : json_decode($user->user_accesses,true);

      return view('admin.users.useraccess', ['user' => $user,'model_list'=>$model_list]);
    }

    public function getModelsList(){
      $out = [ "user", "settings", "courses","course_category","course_level","lessons","quiz", "project"];
      sort($out);
      return $out;
    }

    public function findUser(Request $request)
    {

      $data = [];


        if($request->has('q')){

            $q = $request->q;

            $data = \DB::table('users')->select('id', \DB::raw("CONCAT(email,' (',name,')') as name"))->whereNull('deleted_at')->where('role','=','seller');

            $data = $data->where(function ($query) use($q) {
                    $query->Where('email', 'like', '%' . $q . '%')
                       ->orWhere('phone', 'like', '%' . $q . '%');
            });

            $data = $data->get();

        }


        return response()->json($data);

    }
}