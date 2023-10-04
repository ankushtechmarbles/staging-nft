<div class="container">
    <div class="row">
{{--   for each marketplace listing --}}
      @foreach($marketplace_items as $listing )
          <div class="col-md-3">
              <a href="/marketplace/{{$listing->tokenId + 1}}">
                  <div class="card nft-card marketplace-listing">
                      <img src="{{$listing->asset->image}}" class="card-img-top" alt="nft-preview">
                      <div class="card-body">
                          <h5 style="font-family: Inter, 'serif'; text-transform: capitalize"  class="card-title">{{$listing->asset->name}}</h5>
                          <p class="card-text"
                             style="white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;"
                          >
                              {{$listing->asset->description}}
                          </p>
                          <div class="d-flex justify-content-between">
                              <div class="card-badge" >
                                <span class="badge text-bg-secondary rounded-pill" style="background: #03CB70 !important; border: 1px solid black" >
                                    <i class="fa-solid fa-medal"></i>
                                    <x-svg.flame-icon />
                                    <span class="badge-count m-0">{{isset($score) && $score}}K</span>
                                </span>
                                              <span class="badge text-bg-secondary rounded-pill" style="background: #03CB70 !important; border: 1px solid black">
                                    <i class="fa-brands fa-ethereum"></i>
                                    <span id="eth-count" class="badge-count m-0">ETH</span>
                                </span>
                              </div>
                          </div>
                      </div>
                  </div>
              </a>
          </div>
      @endforeach
    </div>
</div>
