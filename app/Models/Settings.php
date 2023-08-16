<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Settings extends Model
{
	use Notifiable;

    protected $table = 'settings';

    protected $primaryKey = 'setting_id';

    public $timestamps = false;

    protected $fillable = ['setting_key', 'setting_value'];
}
