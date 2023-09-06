@props(['members'])

<div class="d-flex flex-column align-items-start">
    @foreach($members as $member)
        <div class="d-flex align-items-center gap-3 member-card">
            <div class="member-avatar">
                <x-svg.avatar-frame />
                <img src="{{asset('assets/img/avatar/')}}/user.png" alt="" style="width: 100px; height: 100px; border-radius: 50%">
            </div>
            <div class="d-flex flex-column">
                <h1 class="member-title">{{$member['name']}}</h1>
                <p class="m-0">@ {{$member['role']}}</p>
            </div>
        </div>
    @endforeach

</div>
