@props(['member', 'index'])

<div class="d-flex align-items-center gap-3 member-card w-auto" style="background: transparent !important; border: none; box-shadow: none">
    <div class="member-avatar-square" id="avatar{{$index}}">
        <div style="position: absolute; margin: auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M11.4482 3.82617L1.94092 13.3341C1.89309 13.3821 1.85855 13.4426 1.84211 13.5077L0.78832 17.7374C0.756798 17.8647 0.794213 18.0001 0.887134 18.0931C0.957441 18.1634 1.05324 18.2023 1.15123 18.2023C1.18125 18.2023 1.21194 18.1986 1.24182 18.191L5.47149 17.1371C5.53741 17.1207 5.5973 17.0863 5.64514 17.0384L15.1532 7.53121L11.4482 3.82617Z" fill="white"/>
                <path d="M17.5091 2.52983L16.4508 1.47152C15.7435 0.764197 14.5107 0.764882 13.8042 1.47152L12.5078 2.76788L16.2127 6.47279L17.5091 5.17642C17.8624 4.82324 18.057 4.35315 18.057 3.85319C18.057 3.35323 17.8624 2.88314 17.5091 2.52983Z" fill="white"/>
            </svg>
        </div>
        <input type="file" style="display: none" id="file-upload{{$index}}" />
        <img id="memberAvatar{{$index}}" src="{{isset($member->image_url) ? $member->image_url : "/image/user-image.png"}}" alt="" style="width: 100px; height: 100px; border-radius: 50%; ">
    </div>
    <div class="d-flex gap-2">
        <div>
            <label style="color: #000" for="memberName">Name</label>
            <input style="width: 90%; border-radius: 8px; border-color: #000; border-width: 1px; padding: 0.25rem;" id='memberName{{$index}}' value="{{ $member->name ?? "" }}" />
        </div>
        <div>
            <label style="color: #000" for="memberRole">Role</label>
            <input style="width: 90%; border-radius: 8px; border-color: #000; border-width: 1px; padding: 0.25rem;" id="memberRole{{$index}}" value="{{ $member->role ?? "" }}" />
        </div>
        <button type="button" class="remove-btn" wire:click="removeMember({{$index}})">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <g filter="url(#filter0_d_358_2366)">
                    <circle cx="13.5" cy="13.5" r="13.5" fill="#DC4537"/>
                    <circle cx="13.5" cy="13.5" r="13.25" stroke="black" stroke-width="0.5"/>
                </g>
                <path d="M16.2811 17.7194L9.92145 11.3598L11.0007 10.2806L17.3603 16.6402L16.2811 17.7194ZM11.0007 17.7194L9.92145 16.6402L16.2811 10.2806L17.3603 11.3598L11.0007 17.7194Z" fill="white"/>
                <defs>
                    <filter id="filter0_d_358_2366" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dx="1" dy="1"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_358_2366"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_358_2366" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </button>
    </div>
</div>

<script>
    const id = @js($index);

    document.getElementById(`avatar${id}`).addEventListener('click', function() {
        document.getElementById(`file-upload${id}`).click();
    });

    document.getElementById(`file-upload${id}`).addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(`memberAvatar${id}`)
            document.getElementById(`memberAvatar${id}`).src = reader.result;

            window.livewire.emit('upload', id, reader.result,)
        }
        reader.readAsDataURL(file);


    });
</script>
