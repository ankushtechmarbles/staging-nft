<div>
    <h1 style="font-family: Inter, 'serif'; font-weight: 500">Similar to this</h1>
    <div class="container">
        <div class="row">
            @foreach($similar_projects as $project)
                <div class="col-3">
                    <a href="/marketplace/{{$project->id}}" style="color: black; text-decoration: none">
                        <x-cards.nft-card
                            :title="$project->title"
                            :description="$project->description"
                            :owners="$project->owners"
                            :eth="'1.4'"
                            :id="$project->id"
                            :img="'image/pro_'"
                            :slug="$project->slug"
                        />
                    </a>
                </div>
          @endforeach
        </div>
    </div>
</div>
