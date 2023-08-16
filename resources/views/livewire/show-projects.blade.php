 <div class="product_about row g-5">
     {{-- Display all initially loaded projects --}}
     @foreach ($projects as $project)
         <x-showcase.showcaseItem :title="$project->title" :description="$project->description" :owners="$project->owners" :eth="'1.4'"
             :id="$project->id" :img="'image/pro_'" :slug="$project->slug" />
     @endforeach

     @if ($projects->hasMorePages())
         <livewire:load-more-projects :page="$page" :perPage="$perPage" />
     @endif
 </div>
