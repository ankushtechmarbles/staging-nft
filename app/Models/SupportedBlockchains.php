<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportedBlockchains extends Model
{
    use HasFactory;

    protected $table = "supported_blockchains";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['ethereum',  'polygon', 'avalanche', 'fantom', 'arbitrum', 'optimism' ];

    public function supportedBlockchains()
    {
        return $this->belongsTo(Project::class);
    }
}
