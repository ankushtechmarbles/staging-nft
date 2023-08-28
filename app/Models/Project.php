<?php

namespace App\Models;

use App\Models\MintedNfts;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SupportedBlockchains;
use App\Models\ProjectScore;
use Illuminate\Database\Eloquent\SoftDeletes;


class Project extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function blockchains()
    {
        return $this->hasOne(SupportedBlockchains::class);
    }

    public function mintedNfts()
    {
        return $this->hasMany(mintedNfts::class);
    }

    public function projectScores()
    {
        return $this->hasMany(ProjectScore::class);
    }

    protected $table = "projects";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "title",
        "description",
        'problem',
        'solution',
        'chains',
        'supply',
        'unlockable_content',
        'discord',
        'twitter',
        'website',
        'items',
        'collections',
        'owners',
        'types',
        'track',
        'slug',
        'cover_image',
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

    /**
     * Get the path to the poster image
     *
     * @return string
     */
    public function coverImagePath()
    {
        return (!empty($this->cover_image) && file_exists('uploads/' . $this->cover_image) ) ? url('uploads/' . $this->cover_image) : url('assets/img/no-image.svg');
    }

    public function projectTypes()
    {
        return $this->belongsTo(ProjectType::class, 'types', 'id');
    }

    public function projectTracks()
    {
        return $this->belongsTo(ProjectTrack::class, 'track', 'id');
    }

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
}
