@props(['owner', 'title', 'description', 'owners', 'eth', 'slug', 'img', 'id'])

<div class="card nft-card">
    @if(isset($owner) && $owner)
        <a class="edit-nft btn-yellow" href="#"><i class="fa-solid fa-pen"></i></a>
    @endif
    <img src="{{asset('image')}}/nft-card-image.jpeg" class="card-img-top" alt="nft-preview">
    <div class="card-body">
        <h5 style="font-family: Inter, 'serif'; text-transform: capitalize"  class="card-title">{{$title}}</h5>
        <p class="card-text"
           style="white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;"
        >
            {{$description}}
        </p>
        <div class="d-flex justify-content-between">
            <div class="card-badge" >
                <span class="badge text-bg-secondary rounded-pill" style="background: #03CB70 !important; border: 1px solid black" >
                    <i class="fa-solid fa-medal"></i>
                    <x-svg.flame-icon />
                    <span class="badge-count m-0">3.1K</span>
                </span>
                <span class="badge text-bg-secondary  rounded-pill" style="background: #03CB70 !important; border: 1px solid black">
                    <i class="fa-brands fa-ethereum"></i>
                    <span class="badge-count m-0">4.1K</span>
                </span>
            </div>
            <div class="card-show-eye">
                @if(isset($owner) && $owner)
                    <div class="form-check form-switch d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
                    </div>
                @endif
            </div>
        </div>
        @if(isset($owner) && $owner)
            <a href="#" class="btn btn-mint btn-yellow text-dark rounded border py-2">Mint</a>
        @endif
    </div>
</div>
