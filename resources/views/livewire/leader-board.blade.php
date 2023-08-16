<div>
    <div class="table_top">
        <div class="filter_panel w-100">
            <div class="form-group row d-flex align-items-center">

                <div class="col-md-3 col-sm-6 col-12 text-black mb-3">
                    <input type="text" class="form-control btn border " wire:model="searchColumns.title" placeholder="Find Project" /> 
                </div>

                <div class="col-md-2 col-sm-6 col-12 text-black mb-3">
                    <select class="form-control btn border btn-outline-success"  wire:model="searchColumns.project_track_name">
                        <option value="">Filter Track</option>
                        @foreach($project_tracks as $project_track)
                          <option value="{{$project_track->project_track_name}}">{{$project_track->project_track_name}}</option>
                        @endforeach
                    </select>
                </div> 

                <div class="col-md-2 col-sm-12 col-12 text-black mb-3">
                    <select class="form-control btn border btn-outline-success"  wire:model="searchColumns.project_type_name">
                        <option value="">Filter Types</option>
                        @foreach($project_types as $project_type)
                          <option value="{{$project_type->project_type_name}}">{{$project_type->project_type_name}}</option>
                        @endforeach
                    </select>
                </div> 
                <div class="col-md-5 col-sm-12 col-12 mb-3 d-flex justify-content-end"> {{ $projects->links('pagination::bootstrap-4') }}</div>
            </div>
        </div> 
    </div>

    <div class="info_table table-responsive">
        <table class="table table-striped">
            <thead class="table_header">
                <tr>
                    <th>#</th>
                    <th wire:click="sortByColumn('title')" class="cursor">
                        IDEAs
                        @if ($sortColumn == 'title')
                            <i class="fa fa-fw fa-sort-{{ $sortDirection }}"></i>
                        @else
                            <i class="fa fa-fw fa-sort" style="color:#DCDCDC"></i>
                        @endif
                    </th>
                    <th wire:click="sortByColumn('project_track_name')" class="cursor">
                        Track
                        @if ($sortColumn == 'project_track_name')
                            <i class="fa fa-fw fa-sort-{{ $sortDirection }}"></i>
                        @else
                            <i class="fa fa-fw fa-sort" style="color:#DCDCDC"></i>
                        @endif
                    </th>
                    <th wire:click="sortByColumn('project_type_name')" class="cursor">
                        Type
                        @if ($sortColumn == 'project_type_name')
                            <i class="fa fa-fw fa-sort-{{ $sortDirection }}"></i>
                        @else
                            <i class="fa fa-fw fa-sort" style="color:#DCDCDC"></i>
                        @endif
                    </th>
                    <th wire:click="sortByColumn('owners')" class="cursor">
                        Owners
                        @if ($sortColumn == 'owners')
                            <i class="fa fa-fw fa-sort-{{ $sortDirection }}"></i>
                        @else
                            <i class="fa fa-fw fa-sort" style="color:#DCDCDC"></i>
                        @endif
                    </th>
                    <th wire:click="sortByColumn('items')" class="cursor">
                        Items
                        @if ($sortColumn == 'items')
                            <i class="fa fa-fw fa-sort-{{ $sortDirection }}"></i>
                        @else
                            <i class="fa fa-fw fa-sort" style="color:#DCDCDC"></i>
                        @endif
                    </th>
                    <th> Chains </th>
                    <th>Community</th>
                </tr>
            </thead>
            <tbody class="table_containt">
                @forelse ($projects as $project)
                    <tr>
                        <td>{{ $loop->iteration ?? '' }}</td>
                        <th scope="row"><img src="{{ $project->coverImagePath() }}" width="36"> <a
                                style="text-decoration: none; color: black;" class="leaderboard-href"
                                href="/project/{{ $project->slug }}">
                                {{ $project->title ?? 'N/a' }}
                            </a></th>
                        <td>{{ $project->project_track_name ?? '' }}</td>
                        <td>{{ $project->project_type_name ?? '' }}</td>
                        <td>{{ number_format($project->owners ?? 0) }}</td>
                        <td>{{ number_format($project->items ?? 0) }}</td>
                        <td>
                            @if (isset($project->ethereum) && $project->ethereum == 1)
                                <img class="me-2" width="16" src="{{ asset('assets/img/chains/ethereum.svg') }}">
                            @endif
                            @if (isset($project->polygon) && $project->polygon == 1)
                                <img class="me-2" width="16" src="{{ asset('assets/img/chains/polygon.svg') }}">
                            @endif
                            @if (isset($project->avalanche) && $project->avalanche == 1)
                                <img class="me-2" width="16"
                                    src="{{ asset('assets/img/chains/avalanche.svg') }}">
                            @endif
                            @if (isset($project->fantom) && $project->fantom == 1)
                                <img class="me-2" width="16" src="{{ asset('assets/img/chains/fantom.svg') }}">
                            @endif
                            @if (isset($project->arbitrum) && $project->arbitrum == 1)
                                <img class="me-2" width="16" src="{{ asset('assets/img/chains/arbitrum.png') }}">
                            @endif
                            @if (isset($project->optimism) && $project->optimism == 1)
                                <img class="me-2" width="16" src="{{ asset('assets/img/chains/optimism.svg') }}">
                            @endif
                        </td>
                        <td>
                            <a href="{{ $project->discord ?? '#' }}"><img src="{{ asset('image/share.png') }}"></a>
                            <a href="{{ $project->twitter ?? '#' }}"><img src="{{ asset('image/twitter.png') }}"></a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8">No projects found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <!-- <table class="table table-striped">
            <thead class="table_header">
               <tr>
                   <th scope="col">IDEAs</th>
                   <th scope="col">Type</th>
                   <th scope="col">24h Vol</th>
                   <th scope="col">Total Vol</th>
                   <th scope="col">Owners</th>
                   <th scope="col">Items</th>
                   <th scope="col">Community</th>
                </tr>
            </thead>
            <tbody class="table_containt">
                <tr>
                  <th scope="row"><img src="image/img_01.png">Humanity Rocks</th>
                  <td>Charity, Gaming</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td>
                  <a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><img src="image/img_02.png">Helix Auto</th>
                  <td>Gaming</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr>
                <tr>
                  <th scope="row"><img src="image/img_03.png">PIMLR</th>
                  <td>Philosophy, Scie...</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr>
                <tr>
                  <th scope="row"><img src="image/img_04.png">Save the environment</th>
                  <td>Charity</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr><tr>
                  <th scope="row"><img src="image/img_05.png">MetAvatars Universal</th>
                  <td>Metaverse, Gami...</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr><tr>
                  <th scope="row"><img src="image/img_06.png">Roman Reloded</th>
                  <td>Art</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr><tr>
                  <th scope="row"><img src="image/img_07.png">Amargeddon vs Amongus</th>
                  <td>Gaming</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr><tr>
                  <th scope="row"><img src="image/img_08.png">Abstract Superiority</th>
                  <td>Art</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr><tr>
                  <th scope="row"><img src="image/img_09.png">Art for Charity</th>
                  <td>Art, Charity</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr>
                <tr>
                  <th scope="row"><img src="image/img_10.png">Art, Charity</th>
                  <td>Wokeism</td>
                  <td>356,021</td>
                  <td>654,152</td>
                  <td>1,458</td>
                  <td>235,020</td>
                  <td><a href="#"><img src="image/share.png"></a>
                  <a href="#"><img src="image/twitter.png"></a></td>
                </tr>
            </tbody>
        </table> -->
    </div>
</div>
