<?php
 Route::get('get/file/{file}', function ($file) {
    $path = \Illuminate\Support\Facades\Storage::disk('private')->path($file);
    if (file_exists($path)) {
        return response()->file($path);
    }
    abort(404, 'The image you are looking for could not be found.');
})->name('readfile');