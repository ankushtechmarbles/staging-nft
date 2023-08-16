<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Cashier\Billable;
use Illuminate\Support\Facades\Config;
use App\Traits\StripCard;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use App\Models\MintedNfts;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, SoftDeletes, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'last_name',
        'phone',
        'email',
        'password',
        'company_name',
        'title_position',
        'role',
        'email_verified_at',
        'stripe_id',
        'card_brand',
        'card_last_four',
        'trial_ends_at',
        'campaign_name',
        'tfa_enabled',
        'tfa_key',
        'paper_token',
        'paper_wallet_address',
        'white_listed',
        'credits'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $dates = ['deleted_at', 'trial_ends_at', 'ends_at'];

    protected $softDelete = true;

    public function getAvatarAttribute($value)
    {
        return (empty($value)) ? '' : asset('uploads/' . $value);
    }
}
