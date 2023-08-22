<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
//use App\Http\Livewire\CourseStudyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseStudyController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('cc', function () {
    \Artisan::call('config:cache');
    \Artisan::call('cache:clear');
    \Artisan::call('config:clear');
    \Artisan::call('view:clear');
    dd("All cache cleared successfully.");
});

Route::get('/', function () {
    return view('home-new');
});

Route::get('/painter', function() {
   return view ('reactPainterDemo');
});

 Route::get('/f', function () {
     return view('front-page');
 });

Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/courses/', [CourseController::class, 'index'])->name('course.index');
Route::get('/courses/{course}', [CourseController::class, 'show'])->name('course.show');

Route::get('/course-multichoice', function () {
    return view('course.course-multichoice');
});
Route::get('/course-multichoice-2', function () {
    return view('course.course-multichoice-2');
});

Route::get('/showcase', function () {
    return view('showcase');
})->name('showcase');

Route::get('project/{project:slug}', [ProjectController::class, 'show']);

Route::get('/leaderboard', function () {
    return view('leaderboard');
})->name('leaderboard');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');



Route::get('/privacy-policy', function () {
    return view('privacy-policy');
})->name('privacy-policy');

Route::get('/terms', function () {
    return view('terms');
})->name('terms');

/* Login & Registrasion Route */
Auth::routes(['register' => false]);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/dashboard', [App\Http\Controllers\UserController::class, 'dashboard'])->name('dashboard');

/*admin side*/
Route::get('/admin/login', [App\Http\Controllers\admin\LoginController::class, 'showLoginForm'])->name('admin-login');

Route::get('/admin', function () {
    if (auth()->check()) {
        return redirect('/admin/dashboard');
    } else {
        return view('admin.login');
    }
});
Route::get('/dashboard-new', [App\Http\Controllers\CourseController::class, 'newdashboard'])->name('newdashboard');




// Old / React End points
Route::get('/marketplace', function () {
    return view('reactApp');
});

Route::get('/play', function () {
    return view('reactApp');
});

Route::get('/user', function () {
    return view('reactApp');
});

Route::get('/idea', function () {
    return view('reactApp');
});

Route::get('/create', function () {
    return view('reactApp');
});

Route::get('/humanity', function () {
    return view('reactApp');
});

Route::get('/auth/login', function () {
    return view('reactApp');
});

Route::get('/auth/register', function () {
    return view('reactApp');
});

Route::get('/profile', function () {
    return view('reactApp');
});
