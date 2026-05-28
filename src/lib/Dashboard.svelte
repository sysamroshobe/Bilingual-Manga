<script>
    import RangeSlider from "svelte-range-slider-pips";
	import { onMount } from 'svelte';
	
    export let pauseen;
	export let pausejp;

	export let auto;
    export let check;
    export let chaptersen;
    export let chaptersjp;
    export let checken;
    export let checkjp;
    export let checkpage;
    export let vj;
    export let jjj;
    export let jpp;
    export let vi;
    export let iii;
    export let enp;
    export let langds;
    export let change;
    export let jpcolor;
    export let encolor;
    export let indicator;
    export let allquerys;
    export let refresh;
    export let volumesjp;
    export let volumesen;
    export let sli1;
    export let sli2;
    export let imgs_jap;
    export let imgs_eng;
	export let fitscreen;
	export let nomouse;

	export let updown=true;
	export let upt="M";
	let chfl = false;
	export let ocron = false;
	export let ocroff = false;
	export let ocrbor = false;

	export let fitfunc;
	let autotxt="AX"
	const autoxf=()=>{if(auto){auto=false;autotxt="AO"}else{auto=true;autotxt="AX"};setfunc();}
	const autoxf1=()=>{if(auto){autotxt="AX"}else{autotxt="AO"}}
	onMount(() => {allst();flt();fitfunc();autoxf1()});
	

	const handleKeydown=(e)=>{	
		let key = e.key;
		if(key=="l")
		{
			change()
		}
		else if(key == "m")
		{
			upb()
		}
		else if(key == "o")
		{
			autoxf()
		}
	}



	const flt=()=>{
		if(chfl)
		{
			document.getElementById("langb").style="position:fixed;top:50vh;right:3vw;"
		}
		else
		{
			document.getElementById("langb").style="position:static;"
		}
		setfunc();
	
	}

	


	
	const upb=()=>{
		if(updown)
		{
			upt="W";
			updown=false;
			document.getElementById("dash").style="position:fixed;bottom:1px;right:2.5vw;left:2.5vw;z-index: 999;background-color:rgba(0,0,0,0.6);"
		}
		else
		{
			upt="M";
			updown=true;
			document.getElementById("dash").style="position:static;right:2.5vw;left:2.5vw;z-index: 999;background-color:rgba(0,0,0,0.6);"
		}

	}
const allst=()=>{
	if(localStorage.getItem("checkpage")!=null)
	{checkpage=localStorage.getItem("checkpage")==="false"?false:true;}
	else
	{checkpage=false;}	

	if(localStorage.getItem("check")!=null)
	{check=localStorage.getItem("check")==="false"?false:true;}
	else
	{check=false;}	


	if(localStorage.getItem("chfl")!=null)
	{chfl=localStorage.getItem("chfl")==="false"?false:true;}
	else
	{chfl=false;}	

	if(localStorage.getItem("ocrbor")!=null)
	{ocrbor=localStorage.getItem("ocrbor")==="false"?false:true;}
	else
	{ocrbor=false;}

	if(localStorage.getItem("ocron")!=null)
	{ocron=localStorage.getItem("ocron")==="false"?false:true;}
	else
	{ocron=false;}

	if(localStorage.getItem("ocroff")!=null)
	{ocroff=localStorage.getItem("ocroff")==="false"?false:true;}
	else
	{ocroff=false;}

	if(sessionStorage.getItem("checken")!=null)
	{checken=sessionStorage.getItem("checken")==="false"?false:true;}
	else
	{checken=false;}

	if(sessionStorage.getItem("checkjp")!=null)
	{checkjp=sessionStorage.getItem("checkjp")==="false"?false:true;}
	else
	{checkjp=false;}

	if(sessionStorage.getItem("pauseen")!=null)
	{pauseen=sessionStorage.getItem("pauseen")==="false"?false:true;}
	else
	{pauseen=false;}

	if(sessionStorage.getItem("pausejp")!=null)
	{pausejp=sessionStorage.getItem("pausejp")==="false"?false:true;}
	else
	{pausejp=false;}

	if(localStorage.getItem("fitscreen")!=null)
	{fitscreen=localStorage.getItem("fitscreen")==="false"?false:true;}
	else
	{fitscreen=true;}


	if(sessionStorage.getItem("automatch")!=null)
	{auto=sessionStorage.getItem("automatch")==="false"?false:true;}
	else
	{auto=true;}


	if(localStorage.getItem("nomouse")!=null)
	{nomouse=localStorage.getItem("nomouse")==="true"?true:false;}
	else
	{nomouse=false;}
}

const setfunc=()=>{
	localStorage.setItem("nomouse", nomouse);
	localStorage.setItem("fitscreen", fitscreen);
	sessionStorage.setItem("automatch", auto);
	localStorage.setItem("check", check);
	localStorage.setItem("checkpage", checkpage);
	localStorage.setItem("chfl", chfl);
	localStorage.setItem("ocrbor", ocrbor);
	localStorage.setItem("ocron", ocron);
	localStorage.setItem("ocroff", ocroff);
	sessionStorage.setItem("checken", checken);
	sessionStorage.setItem("checkjp", checkjp);
	sessionStorage.setItem("pauseen", pauseen);
	sessionStorage.setItem("pausejp", pausejp);
	
	fitfunc();
}


</script>
<svelte:window on:keydown={handleKeydown}/>
<div id="slider" >
	<div id="r-opt">
		<span id="langb">
			<button id="autox" on:click={autoxf} title="Auto match">{autotxt}</button>
			<button on:click={()=>{change();}} style="height:45px;width:45px;" title="Switch language">{langds}</button>
			<button id="updownb" on:click={upb} title="Dock controls">{upt}</button>
		</span>
	</div>
	<div class="opt-row">
		<label><input type=checkbox bind:checked={chfl} on:change={flt}> Float buttons</label>
		<label><input type=checkbox bind:checked={fitscreen} on:change={setfunc}> Fit-screen</label>
		<label><input type=checkbox bind:checked={auto} on:change={setfunc}> Auto</label>
		<label><input type=checkbox bind:checked={nomouse} on:change={setfunc}> No-click</label>
		<label><input type=checkbox bind:checked={check} on:change={setfunc}> Chapter drag</label>
		<label><input type=checkbox bind:checked={checkpage} on:change={setfunc}> Reverse page</label>
	</div>
	<div class="opt-row">
		<span class="opt-title">OCR:</span>
		<label><input type=checkbox bind:checked={ocrbor} on:change={setfunc}> No-border</label>
		<label><input type=checkbox bind:checked={ocron} on:change={setfunc}> Show</label>
		<label><input type=checkbox bind:checked={ocroff} on:change={setfunc}> Off</label>
	</div>
	<div id="jpslider" class="lang-panel" style={jpcolor}>
	<div class="lang-head"><span class="lang-badge">JP</span>
	<button on:click={()=>{indicator.b=2;indicator.d=true;allquerys();refresh();}} title="Previous chapter">❮❮❮</button><button on:click={()=>{indicator.b=1;indicator.d=true;allquerys();refresh();}} title="Next chapter">❯❯❯</button>
	</div>
	<select id='volumejp' bind:value={vj}>
		<option value="" disabled selected>Volumes</option>
		<option value="" disabled selected>----------</option>
		{#each  Object.keys(volumesjp) as vol_n1,volj}
		<option value={volj}>{vol_n1}</option>  
		{/each}
	</select>


	<select id="selectjp" bind:value={jjj} on:change={sli1} >
		<option value="" disabled selected>Chapters</option>
        {#each chaptersjp as chapter_n1,jjjj}
		{#if (volumesjp[Object.keys(volumesjp)[vj]].s<=jjjj&&volumesjp[Object.keys(volumesjp)[vj]].e>=jjjj)}
		<option value="" disabled selected>----------</option>
		<option value={jjjj}>{chapter_n1}</option> 
		{:else}
		<option value={jjjj}  hidden>{chapter_n1}</option> 
		{/if}
		{/each}
    </select>
	<div class="meter-row">
		{jpp[0]}/{imgs_jap.length-1}
		<label><input type=checkbox bind:checked={checkjp} on:change={setfunc}> 2x</label>
		<label><input type=checkbox bind:checked={pausejp} on:change={setfunc}> Pause</label></div>

	<RangeSlider  bind:values={jpp} on:change={sli1} pipstep={1}  rest={false}  float hoverable max={imgs_jap.length-1}  />	
	</div>
<div id="enslider" class="lang-panel" style={encolor}>
<div class="lang-head">
	<span class="lang-badge">ENG</span>
	<button on:click={()=>{indicator.a=2;indicator.c=true;allquerys();refresh();}} title="Previous chapter">❮❮❮</button><button on:click={()=>{indicator.a=1;indicator.c=true;allquerys();refresh();}} title="Next chapter">❯❯❯</button>

	<select id='volumeen' bind:value={vi}>
		<option value="" disabled selected>Volumes</option>
		<option value="" disabled selected>----------</option>
		{#each  Object.keys(volumesen) as vol_n,voli}
		<option value={voli}>{vol_n}</option>  
		{/each}
	</select>


	<select id="selecten" bind:value={iii} on:change={sli2} >
		<option value="" disabled selected>Chapters</option>
        {#each chaptersen as chapter_n,ii}
		{#if (volumesen[Object.keys(volumesen)[vi]].s<=ii&&volumesen[Object.keys(volumesen)[vi]].e>=ii)}
		<option value="" disabled selected>----------</option>
		<option value={ii}>{chapter_n}</option>  
		{:else}
		<option value={ii}  hidden>{chapter_n}</option> 
		{/if}
		{/each}
    </select>
	<div class="meter-row">
		{enp[0]}/{imgs_eng.length-1}
		<label><input type=checkbox bind:checked={checken} on:change={setfunc}> 2x</label>
		<label><input type=checkbox bind:checked={pauseen} on:change={setfunc}> Pause</label>
	</div>
</div>

	<RangeSlider bind:values={enp} on:change={sli2} pipstep={1}  rest={false}  float hoverable max={imgs_eng.length-1}  />	
</div>
</div> 
<style>

#slider
	{
		margin:auto;
		text-align: left;
		width:95vw;
		font-size:auto;
		padding: 0.75rem;
		border-radius: 0.9rem;
		border: 1px solid rgba(255,255,255,0.14);
		background: linear-gradient(180deg, rgba(12,16,28,0.88), rgba(5,8,18,0.85));
		backdrop-filter: blur(10px);
		box-shadow: 0 10px 30px rgba(0,0,0,0.35);

	}
#r-opt{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 0.5rem;
	}
#jpslider{
	margin-left:1vw;margin-right:1vw;
}
#enslider{
	margin-left:1vw;margin-right:1vw;
}
#langb{
	z-index: 999;
	
}

#langb>button{
	background-color: rgba(98, 227, 156, 0.2);
	color: #eafff2;
	border: 1px solid rgba(133, 247, 183, 0.35);
	padding: 6px 10px;
	border-radius: 10px;
	margin-left: 0.35rem;
	font-weight: 700;
}
#langb>button:hover{
	background-color: rgba(130, 231, 135, 0.35);

}



#selecten{
	max-width: 60vw;

}
#selectjp{
	max-width: 60vw;

}
#volumeen{
	max-width: 60vw;

}
#volumejp{
	max-width: 60vw;

}

.opt-row{
	display:flex;
	flex-wrap:wrap;
	gap: 0.5rem 0.8rem;
	align-items:center;
	margin: 0.35rem 0 0.65rem 0;
}

.opt-row label{
	font-size: 0.82rem;
	color: #d7deef;
	background: rgba(255,255,255,0.06);
	border: 1px solid rgba(255,255,255,0.12);
	border-radius: 999px;
	padding: 0.26rem 0.65rem;
}

.opt-title{
	font-size:0.82rem;
	color:#9ca9c8;
}

.lang-panel{
	padding: 0.65rem;
	margin-top: 0.45rem;
	border-radius: 0.8rem;
	border: 1px solid rgba(255,255,255,0.12);
	background: rgba(255,255,255,0.03);
}

.lang-head{
	display:flex;
	align-items:center;
	gap: 0.35rem;
	margin-bottom: 0.4rem;
}

.lang-badge{
	font-size: 0.72rem;
	letter-spacing: 0.06em;
	font-weight: 700;
	color: #9fffcf;
	background: rgba(112,255,185,0.13);
	border: 1px solid rgba(112,255,185,0.25);
	border-radius: 999px;
	padding: 0.14rem 0.48rem;
	margin-right: 0.35rem;
}

.lang-head button{
	border:1px solid rgba(255,255,255,0.18);
	background: rgba(255,255,255,0.06);
	color:#e9eefb;
	border-radius: 8px;
	padding: 0.22rem 0.44rem;
}

.lang-head button:hover{
	background: rgba(255,255,255,0.13);
}

.meter-row{
	display:flex;
	flex-wrap:wrap;
	align-items:center;
	gap:0.7rem;
	font-size:0.82rem;
	color:#c8d2ea;
	margin: 0.35rem 0 0.45rem 0;
}

#slider select{
	background: rgba(5,8,18,0.85);
	color: #e9edf9;
	border: 1px solid rgba(255,255,255,0.18);
	border-radius: 8px;
	padding: 0.2rem 0.4rem;
}

</style>