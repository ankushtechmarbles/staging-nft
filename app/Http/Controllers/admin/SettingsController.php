<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Settings;
use Artisan;

class SettingsController extends Controller
{   
    public function __construct()
    {
        $this->middleware('auth');
    }
     
    public function setting(Request $request)
    {

    	if ($request->getMethod() == 'POST') {

    		$request->validate([
                'site_name' => 'required|string|max:191',
	            'email_to' => 'required|email|string|max:100',
            ]);

            try{

                $requests = $request->except('_token');

                foreach ($requests as $key => $value) {

                    $data = Settings::firstOrNew(array('setting_key' => $key));                    
                    $data->setting_key = $key;
                    $data->setting_value = $value;
                    $data->save();
                    
                }

                $exitCode = Artisan::call('cache:clear');
                $exitCode = Artisan::call('config:clear');
                $exitCode = Artisan::call('view:clear');
                $exitCode = Artisan::call('config:cache');

	            return redirect()->back()->with('success', 'Site Settings updated!');

	        } catch(\Exception $e){

	            return redirect()->back()->with('error', $e->getMessage());

	        }
	    }else{

            $settings = Settings::all();

            $setting = array();

            foreach ($settings as $row) {
              	$setting[$row->setting_key] =  $row->setting_value;
            }	    	

	    	return view('admin.settings.index', ['setting' => $setting]);	        
	    }
    }

}
