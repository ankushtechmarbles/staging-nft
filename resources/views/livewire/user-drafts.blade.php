<div class="tab-content bg-light" id="nav-tabContent">
    <div class="tab-pane {{$is_editting === true ? "active" : ""}} fade show size_chart" id="draft" role="tabpanel" aria-labelledby="explore-tab">
        <div class="container inner-element">
            <div class="row">
                <div class="col-md-3">
                    <x-dashboard.filter live_nfts="{{$live_nfts}}" />
                </div>
                @if($is_editting)
                    <div class="col-md-9">
                        <livewire:user-drafts-form :project_id="$this->edit_draft_id"/>
                    </div>
                @else
                    @foreach($drafts as $draft)
                        <div class="col-md-3">
                            <x-cards.nft-card
                                :project="$draft"
                                :owner="true"
                                :title="$draft->title"
                                :description="$draft->description"
                                :is_public="$draft->is_public"
                                :is_minted="$draft->is_minted"
                                :id="$draft->id"
                            />
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
    </div>
</div>
