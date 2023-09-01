@props(["data" => $data])

<div class="d-flex gap-5">
    @foreach($data as $vote)
        <x-cards.icon-card
            :icon="$vote['icon']"
            :title="$vote['title']"
            :description="$vote['description']"
        />
    @endforeach
</div>
