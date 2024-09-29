<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileEntry extends Model
{
    use HasFactory;

    /**
     * Get the current user entries
     *
     * @return $id
     */
    public function scopeCurrentUser($query)
    {
        $query->where('user_id', userAuthInfo()->id);
    }

    /**
     * Get only none expired
     *
     * @return $id
     */
    public function scopeNotExpired($query)
    {
        $query->where(function ($query) {
            $query->where('expiry_at', '>', Carbon::now())->orWhereNull('expiry_at');
        });
    }

    /**
     * Get users entries
     *
     * @return $id
     */
    public function scopeUserEntry($query)
    {
        $query->where('user_id', '!=', null);
    }

    /**
     * Get guests entries
     *
     * @return $id
     */
    public function scopeGuestEntry($query)
    {
        $query->where('user_id', null);
    }

    /**
     * File can be previewed
     *
     * @return $id
     */
    public function scopeHasPreview($query)
    {
        $query->whereIn('type', ['image', 'pdf']);
    }

    /**
     * File without parent
     *
     * @return $id
     */
    public function scopeHasNoParent($query)
    {
        $query->where('parent_id', null);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'ip',
        'shared_id',
        'user_id',
        'storage_provider_id',
        'name',
        'filename',
        'mime',
        'size',
        'extension',
        'type',
        'path',
        'link',
        'access_status',
        'password',
        'downloads',
        'views',
        'admin_has_viewed',
        'expiry_at',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['expiry_at'];

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function storageProvider()
    {
        return $this->belongsTo(StorageProvider::class, 'storage_provider_id', 'id');
    }

    public function reports()
    {
        return $this->hasMany(FileReport::class, 'file_entry_id', 'id');
    }
}
