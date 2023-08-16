<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('shutdown', function(){
	\Artisan::call('down');
	return redirect()->route('admin.settings')->with('success', 'Website shutdown now..');
});

Route::get('live', function(){
    \Artisan::call('up');
	return redirect()->route('admin.settings')->with('success', 'Website live now..');dd('live');
}); 

Route::get('cache-clear', function () {
    \Artisan::call('config:cache');
    \Artisan::call('cache:clear');
    \Artisan::call('config:clear');
    \Artisan::call('view:clear');
	return redirect()->route('admin.settings')->with('success', 'Remove all cache..');dd('live');
}); 

Route::get('/dashboard', 'DashboardController@index')->name('dashboard');

/*
 * Course Category  
 */
Route::any('course-categories', 'CourseCategoryController@index')->name('course-categories');
Route::any('course-category/add', 'CourseCategoryController@add')->name('course-category.add');
Route::any('course-category/edit/{course_category}', 'CourseCategoryController@edit')->name('course-category.edit');
Route::get('course-category/delete/{course_category}', 'CourseCategoryController@delete')->name('course-category.delete');

/*
* Course Level
*/
Route::any('course-levels', 'CourseLevelController@index')->name('course-levels');
Route::any('course-level/add', 'CourseLevelController@add')->name('course-level.add');
Route::any('course-level/edit/{course_level}', 'CourseLevelController@edit')->name('course-level.edit');
Route::get('course-level/delete/{course_level}', 'CourseLevelController@delete')->name('course-level.delete');

/*
 * Courses  
 */
Route::any('courses', 'CourseController@index')->name('courses');
Route::any('course/add', 'CourseController@add')->name('course.add');
Route::any('course/edit/{course}', 'CourseController@edit')->name('course.edit');
Route::get('course/delete/{course}', 'CourseController@delete')->name('course.delete');
Route::get('course/duplicate/{course}', 'CourseController@duplicate')->name('course.duplicate');
Route::get('course/remove-file/{course}/{filename}', 'CourseController@removeFile')->name('course.remove-file'); 

/*
 * Lessons  
 */
Route::any('lessons/{course}', 'LessonController@index')->name('lessons');
Route::any('lesson/add/{course}', 'LessonController@add')->name('lesson.add');
Route::any('lesson/edit/{lesson}', 'LessonController@edit')->name('lesson.edit');
Route::get('lesson/delete/{lesson}', 'LessonController@delete')->name('lesson.delete');
Route::get('lesson/duplicate/{lesson}', 'LessonController@duplicate')->name('lesson.duplicate');
Route::get('lesson/remove-file/{lesson}/{filename}', 'LessonController@removeFile')->name('lesson.remove-file');  
Route::post('lessons/update/display-order/', 'LessonController@updateLessonDisplayOrder')->name('lesson.update-display-order');

/*
 * Quiz
 */
Route::any('quizzes/{course}', 'QuizController@index')->name('quizzes');
Route::any('quiz/add/{course}', 'QuizController@add')->name('quiz.add');
Route::any('quiz/edit/{quiz}', 'QuizController@edit')->name('quiz.edit');
Route::get('quiz/delete/{quiz}', 'QuizController@delete')->name('quiz.delete');

/*
 * Projects  
 */
Route::any('projects', 'ProjectController@index')->name('projects');
Route::any('project/add', 'ProjectController@add')->name('project.add');
Route::any('project/edit/{project}', 'ProjectController@edit')->name('project.edit');
Route::get('project/delete/{project}', 'ProjectController@delete')->name('project.delete');
Route::get('project/remove-file/{project}/{filename}', 'ProjectController@removeFile')->name('project.remove-file'); 

/*
* Site Settings
*/
Route::any('settings', 'SettingsController@setting')->name('settings');
/*
* CRUD Users by Admin
*/
Route::any('users', 'UsersController@index')->name('users');
Route::any('users/deleted', 'UsersController@deleted')->name('users.deleted');
Route::any('user/add', 'UsersController@add')->name('user.add');
Route::any('user/edit/{user}', 'UsersController@edit')->name('user.edit');
Route::get('user/delete/{user}/{restore?}', 'UsersController@delete')->name('user.delete');
Route::get('user/find', 'UsersController@findUser')->name('user.find');
/*
*  UserAccess Reset password by Admin 
*/
Route::any('user/useraccess/{user}', 'UsersController@userAccess')->name('user.useraccess');
Route::any('user/resetpassword/{user}', 'UsersController@resetpassword')->name('user.resetpassword');
/*
* Change Profile, Change Password by User 
*/
Route::any('profile/', 'UsersController@profile')->name('profile');
Route::any('change-password/', 'UsersController@changepassword')->name('changepassword');