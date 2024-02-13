<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\RpmService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Psr7;
use Tymon\JWTAuth\Facades\JWTAuth;

class SocialController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function CallbackUnused(RpmService $rpmService, $provider): \Illuminate\Http\RedirectResponse
    {
        $userSocial =   Socialite::driver($provider)->user();
        $user       =   User::where(['email' => $userSocial->getEmail()])->first();
        if($user){
            Auth::login($user);

            // redirect to home page
            return redirect()->route('home');
        } else {
            // create rpm user
            $rpmData = $rpmService->createAnonUser();

            $user = User::create([
                'name'          => $userSocial->getName(),
                'email'         => $userSocial->getEmail(),
                'image'         => $userSocial->getAvatar(),
                'provider_id'   => $userSocial->getId(),
                'provider'      => $provider,
                'rpm_user_id' => $rpmData['id'],
                'rpm_user_token' => $rpmData['token'],
                'rpm_avatar_id' => $rpmData['avatarId'],
                'rpm_image_url' => $rpmData['imageUrl'],
                'rpm_assets' => json_encode($rpmData['assets']),
                'rpm_body_type' => $rpmData['bodyType'],
                'rpm_glb_file' => $rpmData['glbFile'],
            ]);

            Auth::login($user);
            // redirect
            return redirect()->route('home');
        }
    }

    public function Callback(RpmService $rpmService, $provider): \Illuminate\Http\JsonResponse
    {
        $oAuthUser = Socialite::driver($provider)->stateless()->user();

        $user = User::where('email', $oAuthUser->email)->first();

        Auth::login($user);

        if(!$user) {
            $rpmData = $rpmService->createAnonUser();

            $user = User::create([
                'name' => $oAuthUser->name,
                'email' => $oAuthUser->email,
                'provider_id'   => $oAuthUser->getId(),
                'provider'      => $provider,
                'rpm_user_id' => $rpmData['id'],
                'rpm_user_token' => $rpmData['token'],
                'rpm_avatar_id' => $rpmData['avatarId'],
                'rpm_image_url' => $rpmData['imageUrl'],
                'rpm_assets' => json_encode($rpmData['assets']),
                'rpm_body_type' => $rpmData['bodyType'],
                'rpm_glb_file' => $rpmData['glbFile'],
            ]);

            $userInfo = $this->getUserInfo($user);

            Auth::login($user);

            return response()->json([
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken('API_TOKEN')->plainTextToken,
                'user' => $userInfo
            ]);
        }


        $userInfo = $this->getUserInfo($user);

        return response()->json([
            'message' => 'User Logged In Successfully',
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
            'user' => $userInfo
        ]);
    }

    public function loginWithMetamask(Request $request)
    {
        try {
            // get body from request
            $body = $request->all();

            // create post with HTTP
            $response = Http::post('localhost:3000/auth/login', [
                'payload' => $body['payload'],
            ]);

            $body = $response->body();

            // decode body
            $body = json_decode($body, true);

            $tokenInfo = JWTAuth::decode($body['token']);

            // return a json message
            return response()->json([
                'message' => 'User Logged In Successfully',
                'token' => $tokenInfo,
            ]);
        } catch (\Exception $e) {
            // return error as json
            return response()->json($e->getMessage());
        }

    }

    public function metamaskPayload(Request $request): string
    {
        try {
            // get body from request
            $body = $request->all();

            // create post request without guzzle
                $client = Http::post('localhost:3000/auth/payload', [
                    'address' => $body['address'],
                    'chainId' => $body['chainId']
                ]);


           // return body
            return $client->body();
        } catch (\Throwable $th) {
            // return error as json
            return $th->getMessage();
        }

    }

    public function getMetamask(Request $request)
    {
        try {
            $body = $request->all();

            // create get request qith Http
            $response = Http::get('localhost:3000/auth/user');

            // return body
            return $response->body();
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    private function getUserInfo($user): array
    {
       return [
            'name' => $user['name'],
            'email' => $user['email'],
            'rpm_user_id' => $user['rpm_user_id'],
            'rpm_user_token' => $user['rpm_user_token'],
            'rpm_avatar_id' => $user['rpm_avatar_id'],
            'rpm_image_url' => $user['rpm_image_url'],
            'rpm_assets' => $user['rpm_assets'],
            'rpm_body_type' => $user['rpm_body_type'],
            'rpm_glb_file' => $user['rpm_glb_file'],
        ];
    }


}
