<?php

/**
 * Class Helper
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Schema;
use Intervention\Image\Facades\Image;
use File;
use Storage;
use DB;
use Auth;
use Carbon\Carbon;
use App\Models\ProductModel;
use Illuminate\Support\Str;

/**
 * Class Helper
 *
 */
class Helper extends Model
{

	/**
	 * GET days, hours and minutes 
	 *
	 * @param integer $bytes bytes
	 *
	 * @return \Illuminate\Http\Response
	 */
	public static function timesToHuman($startDate, $endDate)
	{
	    $startDate = Carbon::createFromFormat('Y-m-d H:i:s', $startDate);
	    $endDate = Carbon::createFromFormat('Y-m-d H:i:s', $endDate);

	    $days = $startDate->diffInDays($endDate);
	    $hours = $startDate->copy()->addDays($days)->diffInHours($endDate);
	    $minutes = $startDate->copy()->addDays($days)->addHours($hours)->diffInMinutes($endDate);
	    $seconds = $startDate->copy()->addDays($days)->addHours($hours)->addMinutes($minutes)->diffInSeconds($endDate);

	    return $hours . ' Hours, ' . $minutes . ' Minutes, ' . $seconds . ' Seconds';
	}

	public static function getFileNameOnly($value){
		return ( isset($value) && !empty($value) ) ? Str::of($value)->basename() : '';
	}
 
    public static function string_my_decode($str){
        return base64_decode(str_rot13(base64_decode(trim($str))));
    }
 

}