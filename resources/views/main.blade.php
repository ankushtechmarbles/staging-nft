<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Home</title>
<link href="{{ asset('home/css/bootstrap-reboot.css')}}" rel="stylesheet" media="screen">
<link href="{{ asset('home/css/bootstrap-grid.css')}}" rel="stylesheet" media="screen">
<link href="{{ asset('home/css/bootstrap.css')}}" rel="stylesheet" media="screen">
<link href="{{ asset('home/css/custom.css')}}" rel="stylesheet" media="screen">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="{{ asset('home/scripts/bootstrap.js')}}"></script>
<script src="{{ asset('home/scripts/jquery.stellar.js')}}"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light custom_nav">
	<div class="container">

	<a class="navbar-brand" href="{{url('/')}}"><img src="{{ asset('home/images/logo.svg')}}" width="180px" height="50px"></a>

		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">

			<ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
			<li class="nav-item px-3"><a class="nav-link active" aria-current="page" href="{{url('about')}}">About</a></li>			
			<li class="nav-item dropdown px-3"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Courses</a>
				<ul class="dropdown-menu" aria-labelledby="navbarDropdown">      
			      <li><a class="dropdown-item" href="{{url('leaderboard')}}">Leaderboard</a></li>
			      <li><a class="dropdown-item" href="{{url('showcase')}}">Showcase</a></li>
				</ul>
			</li>
			<li class="nav-item px-3"><a class="nav-link" href="#">Apply</a></li>
			<li class="nav-item dropdown px-3"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Leaderboard</a>
				<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
			      <li><a class="dropdown-item" href="{{url('leaderboard')}}">Leaderboard</a></li>
			      <li><a class="dropdown-item" href="{{url('showcase')}}">Showcase</a></li>
				</ul>
			</li>
			<li class="nav-item px-3">
           		<a class="nav-link" href="https://idea.thecela.com/creator/" target="_blank">Create</a>
			</li>	
                <li class="nav-item">
                    <a class="nav-link" href="{{url('contact')}}">Contact</a>
                </li>		
			</ul>

			<div class="d-flex nav_right_tems">				
				<div class="form-check form-switch">
				<input class="form-check-input toggle" type="checkbox" role="switch" id="flexSwitchCheckDefault">
				<label class="form-check-label" for="flexSwitchCheckDefault"></label>
				</div>
				<a class="px-2" href=""><img src="{{ asset('home/images/discord.png')}}"></a>
				<a class="px-2" href=""><img src="{{ asset('home/images/user.png')}}"></a>
				<a class="px-2 connect_wallet" href=""><img src="{{ asset('home/images/connect_wallet.png')}}"></a>			
			</div>

		</div>
	</div>
</nav>

<div class="banner">
	<div class="container">
	<div class="row">
		<div class="col-md-6">			
			<h1>Create &amp; Contribute <br/> to IDEAs through <br/> 3D NFTs.</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
			<a href="" class="banner_btn b1">Create Project</a>
			<a href="" class="banner_btn b2">How It Works</a>
			<span class="b_i_1"><img src="{{ asset('home/images/b_i_1.png')}}" class="scaling_animation"></span>
			<span class="b_i_2"><img src="{{ asset('home/images/b_i_2.png')}}" class=""></span>
			<span class="b_i_3"><img src="{{ asset('home/images/b_i_3.png')}}" class="floating_animation"></span>
		</div>		
		<div class="col-md-6">			
			<div style="position: relative;">
				<div class="boxy">
					<div class="boxy_img">
						<!-- Use image dimensions of 340px width and 342px height -->
						<img src="{{ asset('home/images/m1.jpg')}}" class="img-fluid">
						<img src="{{ asset('home/images/bitcoin.svg')}}" width="36px" height="36px" style="position: absolute; bottom: 10px; left: 20px;">
						<img src="{{ asset('home/images/logo.svg')}}" width="96px" height="20px" style="position: absolute; bottom: 10px; right: 20px;">
					</div>
					<span class="boxy_txt_1">Helix Auto</span>
					<span class="boxy_txt_2">1.4K Owners</span>
				</div>			
				<div class="boxy2">
					<!-- Use image dimensions of 210px width and 158px height -->
					<img src="{{ asset('home/images/zebra.jpg')}}" class="img-fluid">
					<span class="boxy2_txt_1">Humanity Rocks</span>
					<span class="boxy2_txt_2"><img src="{{ asset('home/images/heart.svg')}}" width="14px" height="14px" vspace="20"> 1.4K </span>
					<span class="boxy2_txt_3"><img src="{{ asset('home/images/ethereum.svg')}}" width="20px" height="20px" vspace="20"> 1.4K </span>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>

<div class="skew_section">
	 <span class="c1">.Creativity</span>
	 <span class="c2">.Innovation</span>
	 <span class="c1">.web3</span>
	 <span class="c3">.IDEAdao</span>
	 <span class="c1">.3D NFTs</span>
	 <span class="c4">.Community</span>
</div>

<div class="divider">
<img src="{{ asset('home/images/divider.png')}}" class="img-fluid">
</div>

<!-- Use image sizes of 370px width and 562px height -->
<div class="carousel3d">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<span class="carousel3d_title">Popular Projects</span>
			</div>
		</div>
		<div class="row">
			<section id="slider">
			<input type="radio" name="slider" id="s1">
			<input type="radio" name="slider" id="s2">
			<input type="radio" name="slider" id="s3" checked>
			<input type="radio" name="slider" id="s4">
			<input type="radio" name="slider" id="s5">
			<label for="s1" id="slide1"><img src="{{ asset('home/images/mountain.png')}}"></label>
			<label for="s2" id="slide2"><img src="{{ asset('home/images/mountain1.jpg')}}"></label>
			<label for="s3" id="slide3"><img src="{{ asset('home/images/mountain2.jpg')}}"></label>
			<label for="s4" id="slide4"><img src="{{ asset('home/images/mountain3.jpg')}}"></label>
			<label for="s5" id="slide5"><img src="{{ asset('home/images/mountain2.jpg')}}"></label>
			</section>
		</div>
	</div>
</div>

<div class="htc">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<span class="htc_title"> How To Create</span>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<div class="htc_col wbg">
					<h3>Step1</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="htc_col pbg">
					<h3>Step2</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="htc_col wbg">
					<h3>Step3</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="leaderboard_sec">
	<div class="container">
		<div class="row">
				<div class="col-12">
				<div class="leaderboard_title"><h4>Current Leaderboard</h4></div>

				<div class="results_table">
					<table style="width:100%">					
					<tr>
						<td><span class="ideas_img"><img src="{{ asset('home/images/idea_icon.png')}}"></span> Humanity Rocks</td>
						<td>Charity, Gaming</td>
						<td>356,021</td>
						<td>654,152</td>
						<td>1,458</td>
						<td>235,020</td>
						<td>
							<span class="discord_blue"><img src="{{ asset('home/images/discord_blue.png')}}"></span>
							<img src="{{ asset('home/images/twitter.png')}}">
						</td>
					</tr>
					</table>
				</div>
				<div class="results_table">
					<table style="width:100%">					
					<tr>
						<td><span class="ideas_img"><img src="{{ asset('home/images/idea_icon.png')}}"></span> Humanity Rocks</td>
						<td>Charity, Gaming</td>
						<td>356,021</td>
						<td>654,152</td>
						<td>1,458</td>
						<td>235,020</td>
						<td>
							<span class="discord_blue"><img src="{{ asset('home/images/discord_blue.png')}}"></span>
							<img src="{{ asset('home/images/twitter.png')}}">
						</td>
					</tr>
					</table>
				</div>
				<div class="results_table">
					<table style="width:100%">					
					<tr>
						<td><span class="ideas_img"><img src="{{ asset('home/images/idea_icon.png')}}"></span> Humanity Rocks</td>
						<td>Charity, Gaming</td>
						<td>356,021</td>
						<td>654,152</td>
						<td>1,458</td>
						<td>235,020</td>
						<td>
							<span class="discord_blue"><img src="{{ asset('home/images/discord_blue.png')}}"></span>
							<img src="{{ asset('home/images/twitter.png')}}">
						</td>
					</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="contribution_sec">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<span class="contribution_sec_title">How to contribute. Be part of our ecosystem</span>
					</div>
					<div class="col-md-12">
						<div class="contribution_col cc1">
						<span class="contribution_col_title">Lorel ipsum dolor</span>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="contribution_col cc2">
				<span class="contribution_col_title">Lorel ipsum dolor</span>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
				</div>
			</div>
			<div class="col-md-3">
				<div class="contribution_col cc3">
				<span class="contribution_col_title">Lorel ipsum dolor</span>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="icons_sec">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-10">
				<div class="icons_box">
					<img src="{{ asset('home/images/nft1.png')}}"/>
					<img src="{{ asset('home/images/nft2.png')}}"/>
					<img src="{{ asset('home/images/nft3.png')}}"/>
					<img src="{{ asset('home/images/nft4.png')}}"/>
					<img src="{{ asset('home/images/nft5.png')}}"/>
					<img src="{{ asset('home/images/nft6.png')}}"/>
					<img src="{{ asset('home/images/nft7.png')}}"/>
					<img src="{{ asset('home/images/nft8.png')}}"/>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="tokenomics">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<span class="tokenomics_title">Tokenomics</span>
				<span class="tokenomics_subtitle">A quick breakdown of our distribution system</span>
			</div>
		</div>
		<div class="row">
			<div class="col-md-5">
				<img src="{{ asset('home/images/tokens_number.jpg')}}" class="img-fluid" style="margin-bottom: 25px;">
			</div>
			<div class="col-md-7">
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg1">
					<h6><span class="tp1">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg2">
					<h6><span class="tp2">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg3">
					<h6><span class="tp3">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg4">
					<h6><span class="tp4">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="subfooter">
<div class="container">
	<div class="row">
		<div class="col-sm-12 col-md-4 fcol">
			<img src="{{ asset('home/images/logo.png')}}">
		</div>
		<div class="col-sm-12 col-md-4 fcol">
			<h2>Community</h2>
			<img src="{{ asset('home/images/discord.png')}}">
			<img src="{{ asset('home/images/twitter_footer.png')}}">
		</div>
		<div class="col-sm-12 col-md-4 fcol">
			<h2>Links</h2>
			<a href="">Privacy Policy</a>
			<a href="">Terms</a>
		</div>
	</div>
</div>
</div>

<div class="footer">
<div class="container-fluid">
<div class="row">
<div class="col-12">
	&copy; IDEADAO. All Rights Reserved
</div>
</div>
</div>
</div>

</body>
</html>

