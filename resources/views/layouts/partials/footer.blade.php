    <footer class="footer pt-5 pb-4 pb-lg-5 ">
      <div class="container-fluid">
          <div class="row">
            <div class="col col-md-1 border-top border-bottom d-none d-sm-block"></div>
            <div class="col col-md-10 ">
                <div class="row">
                    <div class="col-12 col-md-4 p-4 border">
                        <a href="#"><img src="{{asset('assets\img\logo\logo.svg')}}" width="180"></a>
                    </div>
                    <div class="col-12 col-md-4 p-4 border-top-md border-bottom-md  border-start border-start-md-0 border-end border-end-md-0 border-bottom-md">
                        <div class="community_sec">
                            <h5 class="footer_title">Community</h5>
                            <div class="footer_social_icon">
                                <ul class="nav nav-pills">
                                    <li class="nav-item">
                                        <a target="_blank" href="https://twitter.com/IDEA_NFTs" rel="nofollow" title="Twitter" class="me-2">
                                          <svg class="social-icon">
                                              <use xlink:href="{{asset('assets/img/idea-icon.svg#twitter')}}"></use>
                                          </svg> 
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a target="_blank" href="https://discord.gg/nWpATbdZ" rel="nofollow" title="Discord" class="me-2">
                                          <svg class="social-icon">
                                              <use xlink:href="{{asset('assets/img/idea-icon.svg#discord')}}"></use>
                                          </svg> 
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 p-4 border">
                        <div class="link_sec">
                            <h5 class="footer_title">Links</h5>
                            <div class="useful-links">
                              <ul class="nav flex-row">
                                <li class="nav-item">
                                    <a href="{{route('privacy-policy')}}" class="nav-link d-inline-block px-0 pt-1 pb-2 pe-5">Privacy Policy</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{route('terms')}}" class="nav-link d-inline-block px-0 pt-1 pb-2">Terms</a>
                                </li>                                
                              </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-1 border-top border-bottom d-none d-sm-block"></div>
        </div>
        <p class="d-block text-center pb-2 pb-lg-0 mb-0 copyright_text my-3">
          &copy; <a class="nav-link d-inline-block p-0" href="{{url('/')}}" target="_blank" rel="noopener" title="{{config('app.name')}}">IDEA NFTs</a> All Rights Reserved.
        </p>
      </div>
    </footer>
<!-- 
    <div class="">

    <div class="copyright_text">
        <p>© IDEA NFTs All Rights Reserved.</p>
    </div> -->
</div> 