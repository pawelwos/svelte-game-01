<script>
  import { enhance } from "$app/forms";

  import Rock from "../components/rock.svelte";
  import Paper from "../components/paper.svelte";
  import Scissors from "../components/scissors.svelte";

  export let form;

  let selected = null

  $: scoreY = form?.scoreY ? form?.scoreY : 0
  $: scoreC = form?.scoreC ? form?.scoreC : 0
  $: console.log(form)
</script>
<h1 class="text-2xl lg:text-4xl font-bold mb-8">Rock, Paper, Scissors!</h1>
<div class="flex justify-center items-center space-x-8 mb-8">
  <h2 class="flex items-center">You: <span class="pl-4 {scoreY > scoreC && 'text-green-700'} {scoreY < scoreC && 'text-red-700'} {scoreY == scoreC && 'text-blue-700'} text-5xl">{scoreY}</span></h2>
  <h2 class="flex items-center">Computer: <span class="pl-4 {scoreC > scoreY && 'text-green-700'} {scoreC < scoreY && 'text-red-700'} {scoreY == scoreC && 'text-blue-700'} text-5xl">{scoreC}</span></h2>
</div>
{#if form}
  <div class="text-center mb-8">
    {#if form.computer_pick == 'rock'}
    <Rock class="w-48 h-48 mx-auto" />
    {/if}
    {#if form.computer_pick == 'paper'}
    <Paper class="w-48 h-48 mx-auto" />
    {/if}
    {#if form.computer_pick == 'scissors'}
    <Scissors class="w-48 h-48 mx-auto" />
    {/if}
  </div>
  <div class="pb-4">
    {#if form.win == 1}
      <h3 class="text-2xl md:text-4xl text-green-700">You Win!</h3>
    {:else if  form.win == 2}
      <h3 class="text-2xl md:text-4xl text-blue-700">That's a tie!</h3>
    {:else}
      <h3 class="text-2xl md:text-4xl text-red-700">You loose!</h3>
    {/if}
  </div>
{/if}
<form class="flex justify-center space-x-8 mb-8" method="POST" action="?/play" use:enhance>
  <button class="{selected == 1 && 'border-b-2 border-red-800'}" on:click={()=>selected = 1} name="pick" value="rock">
  <Rock class="w-16 h-16 transition-transform hover:scale-125" />
  </button>
  <button class="{selected == 2 && 'border-b-2 border-red-800'}" on:click={()=>selected = 2} name="pick" value="paper">
  <Paper class="w-16 h-16 transition-transform hover:scale-125" />
  </button>
  <button class="{selected == 3 && 'border-b-2 border-red-800'}" on:click={()=>selected = 3} name="pick" value="scissors">
  <Scissors class="w-16 h-16 transition-transform hover:scale-125" />
  </button>
</form>
<form method="POST" action="?/reset" use:enhance>
  <button on:click={() => selected = null} class="bg-black text-white py-2 px-4 hover:bg-slate-950">RESET</button>
</form>
