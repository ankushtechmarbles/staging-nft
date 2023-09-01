@props(['title', 'description', 'owners', 'eth', 'slug', 'img', 'id'])

    <div class="w-100 max-w-full">
        <a style='text-decoration: none;' href="/project/{{ $slug }}">
            <div class="card" style="border: 1px solid black;">
                {{-- ! Images for cards need to be added into database --}}
                <img src="/image/explore02.jpeg" class="card-img-top" alt="..." style="min-height: 10rem; max-height: 20rem; object-fit: cover; border-radius: 28px 28px 0 0;">
                <div class="card-body">
                    <h5 class="card-title">{{ $title }}</h5>
                    <p class="card-text">{{ strip_tags($description) }}</p>
                    <div class="social_like d-flex gap-2">
                        <button class="btn_vote">
                            🏅🔥 3.2k
                        </button>
                        <div id="eth-pill" class="btn_vote" >
                            <img style="height: 23px; filter: brightness(0)" src="{{asset("/assets/img/pages/showcase/ethereum-icon.png")}}"/>
                           <span style="color: transparent; font-weight: normal; text-shadow: 0 0 0 black">1.4k</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
