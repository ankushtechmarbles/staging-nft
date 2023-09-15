@foreach($projects as $project)
    <div class="col-sm-6 col-lg-3 mb-4">
        <a href="/marketplace/{{$project->id}}">
            <div class="card position-relative overflow-hidden">
                <img src="{{asset('image')}}/nft-card-image.jpeg"  alt="nft-preview">
                <div class="card-body position-absolute d-flex align-items-center card-after-hover">
                    <div class="content_info">
                        <h5 class="card-title">{{$project->title}}</h5>
                        <p class="card-text">{{$project->description}}</p>
                    </div>
                    <div class="nft_value">
                        <div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
                            <span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
                            <span class="value">1224</span>
                        </div>
                    </div>
                </div>
                <div class="card-before-hover">
                    <div class="nft_value d-flex">
                        <div class="p-2 d-flex align-items-center justify-content-center">
                            <span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
                            <span class="value">1224</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
@endforeach


