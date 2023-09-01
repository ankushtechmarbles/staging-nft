@props(['icon', 'title', 'description'])

<div class="icon-card">
        @switch($icon)
            @case('users')
                <x-svg.users-icon />
                @break
            @case('cursor')
                <x-svg.cursor-icon />
                @break
            @case('money')
                <x-svg.money-icon />
                @break
            @case('wrench')
                <x-svg.wrench-icon />
                @break
        @endswitch
        <h6>{{ $title }}</h6>
        <p>{{ $description }}</p>
</div>
