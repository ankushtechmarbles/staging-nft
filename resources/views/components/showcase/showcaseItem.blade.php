@props(['title', 'description', 'owners', 'eth', 'slug', 'img', 'id'])

<div class='col-md-3'>
    <div class="col">
        <a style='text-decoration: none;' href="/project/{{ $slug }}">
            <div class="card" style="width: 16.5rem;">
                {{-- ! Images for cards need to be added into database --}}
                <img src="{{ $img }}0{{ rand(1, 4) }}.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ $title }}</h5>
                    <p class="card-text">{{ strip_tags($description) }}</p>
                    <div class="social_like">
                        <button class="btn_vote">🏅🔥
                            3.2k</button>
                        <span class="pepole_like">1.4K</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
