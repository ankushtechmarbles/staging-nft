<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $data = [];

        $days = ['0' => 'Today', '1' => 'Yesterday', '7' => 'Last 7 days', '30' => 'Last 30 days', '90' => 'Last 90 days', '180' => 'Last 180 days', '365' => 'Last 365 days'];

        $q = $request->input( 'q' ) ?? 7;
        $start_date = Carbon::now()->subDays($q);
        $end_date =  Carbon::now();
        
        return view('admin.dashboard', ['data' => $data, 'q' => $q, 'start_date' => $start_date,'end_date' => $end_date, 'days' => $days]);
    }    



}
