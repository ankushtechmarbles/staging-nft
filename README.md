<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


## API Routes

#### User Routes
| Method | URI | Action | Middleware |
| --- | --- | --- | --- |
| GET/HEAD | api/user | Closure | api, auth:api |
| GET/HEAD | api/users | App\Http\Controllers\Api\UserController@index | api, auth:api |
| POST | api/users | App\Http\Controllers\Api\UserController@store | api, auth:api |
| GET/HEAD | api/users/{user} | App\Http\Controllers\Api\UserController@show | api, auth:api |
| PUT/PATCH | api/users/{user} | App\Http\Controllers\Api\UserController@update | api, auth:api |
| DELETE | api/users/{user} | App\Http\Controllers\Api\UserController@destroy | api, auth:api |
| GET/HEAD | api/users/{user}/posts | App\Http\Controllers\Api\UserPostController@index | api, auth:api |

#### Draft Routes
| Method | URI | Action | Middleware | Protected Route | Example Response | 
| --- | --- | --- | --- |-------| --- |
| GET/HEAD | api/drafts | App\Http\Controllers\Api\DraftController@index | api, auth:api | False | ```[{"id":1,"title":"Draft 1","body":"This is the body of draft 1","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"},{"id":2,"title":"Draft 2","body":"This is the body of draft 2","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}]``` |
| POST | api/drafts | App\Http\Controllers\Api\DraftController@store | api, auth:api | True | ```{"id":3,"title":"Draft 3","body":"This is the body of draft 3","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}``` |
| GET/HEAD | api/drafts/{draft} | App\Http\Controllers\Api\DraftController@show | api, auth:api | False | ```{"id":1,"title":"Draft 1","body":"This is the body of draft 1","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}``` |
| PUT/PATCH | api/drafts/{draft} | App\Http\Controllers\Api\DraftController@update | api, auth:api | True | ```{"id":1,"title":"Draft 1","body":"This is the body of draft 1","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}``` |
| DELETE | api/drafts/{draft} | App\Http\Controllers\Api\DraftController@destroy | api, auth:api | True | ```{"message":"Draft deleted successfully"}``` |

#### Competition Routes
| Method    | URI                                 | Action | Middleware     | Protected Route     | Example Response |
|-----------|-------------------------------------| --- |----------------|---------------------|------------------|
| GET/HEAD  | api/competitions                    | App\Http\Controllers\Api\CompetitionController@index | api, auth:api  | false               | ```{"current_page":1,"data":[{"id":1,"title":"Competition 1","body":"This is the body of competition 1","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z","votes":0},{"id":2,"title":"Competition 2","body":"This is the body of competition 2","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z","votes":0},{"id":3,"title":"Competition 3","body":"This is the body of competition 3","user_id":1,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z","votes":0}],"first_page_url":"http:\/\/"```} |
| POST      | api/competitions                    | App\Http\Controllers\Api\CompetitionController@store | api, auth:api  | false               |                  |
| GET/HEAD  | api/competitions/{competition}      | App\Http\Controllers\Api\CompetitionController@show | api, auth:api  | false               |                  |
| PUT/PATCH | api/competitions/{competition}/vote | App\Http\Controllers\Api\CompetitionController@update | api, auth:api  | true                |                  |
| PUT/PATCH | api/competitions/{competition}      | App\Http\Controllers\Api\CompetitionController@update | api, auth:api  | true * creator only |                  |
| DELETE    | api/competitions/{competition}      | App\Http\Controllers\Api\CompetitionController@destroy | api, auth:api  | true * admin only   |                  |

#### Community Leaderboard Routes
| Method | URI | Action | Middleware | Protected Route | Example Response |
| --- | --- | --- | --- | --- | --- |
| GET/HEAD | api/leaderboards | App\Http\Controllers\Api\LeaderboardController@index | api, auth:api | false |```[{"id":1,"user_id":1,"score":100,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"},{"id":2,"user_id":2,"score":200,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}]``` |
| POST | api/leaderboards | App\Http\Controllers\Api\LeaderboardController@store | api, auth:api | true | ```{"id":3,"user_id":1,"score":300,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}``` |
| GET/HEAD | api/leaderboards/{leaderboard} | App\Http\Controllers\Api\LeaderboardController@show | api, auth:api | false | ```{"id":1,"user_id":1,"score":100,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}``` |
| PUT/PATCH | api/leaderboards/{leaderboard} | App\Http\Controllers\Api\LeaderboardController@update | api, auth:api | true | ```{"id":1,"user_id":1,"score":100,"created_at":"2021-03-02T20:00:00.000000Z","updated_at":"2021-03-02T20:00:00.000000Z"}``` |
| DELETE | api/leaderboards/{leaderboard} | App\Http\Controllers\Api\LeaderboardController@destroy | api, auth:api | true | ```{"message":"Leaderboard deleted successfully"}``` |

#### Mint NFT Routes
| Method | URI | Action | Middleware | Protected Route | Example Response                                                  |
| --- | --- | --- | --- | --- |-------------------------------------------------------------------|
| POST | api/mint | App\Http\Controllers\Api\MintController@store | api, auth:api | true | ```{"id":1,"user_id":1,"title":"Mint 1","description":" "string"}``` |

#### NFT Prints Routes
| Method | URI | Action | Middleware |
| --- | --- | --- | --- |
| GET/HEAD | api/prints | App\Http\Controllers\Api\PrintController@index | api, auth:api |
| POST | api/prints | App\Http\Controllers\Api\PrintController@store | api, auth:api |
| GET/HEAD | api/prints/{print} | App\Http\Controllers\Api\PrintController@show | api, auth:api |
| PUT/PATCH | api/prints/{print} | App\Http\Controllers\Api\PrintController@update | api, auth:api |
| DELETE | api/prints/{print} | App\Http\Controllers\Api\PrintController@destroy | api, auth:api |
