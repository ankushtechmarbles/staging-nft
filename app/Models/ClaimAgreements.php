<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClaimAgreements extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'claim_agreements';

    protected $fillable = [
        'owner_id',
        'claimer_id',
        'draft_id',
        'project_id',
        'nft_id',
    ];

    protected $dates = ['deleted_at', 'published_at'];

    protected $date = ['published_at', 'created_at', 'updated_at'];

    protected $softDelete = true;

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function claimer()
    {
        return $this->belongsTo(User::class, 'claimer_id');
    }

    public function draft()
    {
        return $this->belongsTo(Drafts::class, 'draft_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function nft()
    {
        return $this->belongsTo(MintedNfts::class, 'nft_id');
    }
}
