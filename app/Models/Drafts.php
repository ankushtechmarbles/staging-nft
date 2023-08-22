<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Drafts extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'drafts';

    protected $fillable = [
        'name',
        'description',
        'problem',
        'solution',
        'utilities',
        'members',
        'animation_url',
        'image_url',
        'blockchain',
        'is_public',
        'is_minted',
        'project_id',
        'user_id',
    ];

    protected $dates = ['deleted_at', 'published_at'];

    protected $date = ['published_at', 'created_at', 'updated_at'];
    protected $softDelete = true;

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function claimAgreements()
    {
        return $this->hasOne(ClaimAgreements::class, 'draft_id');
    }

    public function mintedNfts()
    {
        return $this->hasMany(MintedNfts::class, 'draft_id');
    }
}
