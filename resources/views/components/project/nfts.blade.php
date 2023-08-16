@props(['project'])

<section class="container-fluid p-0 w-100 h-100">
    <div class="row padding-0 margin-0 g-0">
        {{-- side bar --}}
        <aside class="col-md-2 h-100">
            <input type="text" class="form-control custom-input border-0" placeholder="Keyword" aria-label="Keyword"
                aria-describedby="search">

            <div class="accordion" id="accordionExample">

                <div class="accordion-item border-0">

                    <h2 class="accordion-header border-0" id="headingOne">
                        <button class="accordion-button border-0 collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>

                    <div id="collapseOne" class="accordion-collapse border-0 collapse" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body border-0">

                        </div>
                    </div>

                </div>

                <div class="accordion-item  border-0">
                    <h2 class="accordion-header  border-0" id="headingTwo">
                        <button class="accordion-button border-0 collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse border-0 collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                        </div>
                    </div>
                </div>

                <div class="accordion-item  border-0">
                    <h2 class="accordion-heade  border-0r" id="headingThree">
                        <button class="accordion-button border-0 collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                        <div class="accordion-body"></div>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse border-0 collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body border-0">

                        </div>
                    </div>
                </div>

                <div class="accordion-item  border-0">
                    <h2 class="accordion-heade  border-0r" id="headingFour">
                        <button class="accordion-button border-0 collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Accordion Item #4
                        </button>
                        <div class="accordion-body"></div>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse border-0 collapse" aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body border-0">

                        </div>
                    </div>
                </div>

                <div class="accordion-item  border-0">
                    <h2 class="accordion-heade  border-0r" id="headingFive">
                        <button class="accordion-button border-0 collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Accordion Item #5
                        </button>
                        <div class="accordion-body"></div>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse border-0 collapse" aria-labelledby="headingFive"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body border-0">

                        </div>
                    </div>
                </div>
            </div>

        </aside>
        {{-- main secition --}}
        <div class="col-md-10 border-start border-dark">
            {{-- filter --}}
            <div class="d-flex p-5 w-100 justify-content-start align-items-center">
                <input type="text" class="form-control w-25 border-0" placeholder="search" aria-label="Keyword"
                    aria-describedby="search">
                <div>
                    <h4 class="fw-light">Filter</h4>
                </div>
                <div class="ms-auto d-flex gap-3">
                    <img src="/assets/img/pages/project/list-view.svg" />
                    <img src="/assets/img/pages/project/list-stacked.svg" />
                </div>
            </div>
            {{-- nfts --}}
            <div class="container-fluid">
                <livewire:show-nfts :project="$project" />
            </div>
        </div>
    </div>
</section>
