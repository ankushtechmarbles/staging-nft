<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MintedNfts;
use App\Models\SupportedBlockchains;
use App\Models\ProjectScore;


class Project extends Model
{
    use HasFactory;

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
        'cover_image'
    ];

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
}
