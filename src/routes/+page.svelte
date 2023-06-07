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
      <h3 class="text-2xl md:text-4xl text-blue-700">It's a draw</h3>
    {:else}
      <h3 class="text-2xl md:text-4xl text-red-700">You lose</h3>
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
<form method="POST" class="mb-8" action="?/reset" use:enhance>
  <button on:click={() => selected = null} class="bg-black text-white py-2 px-4 hover:bg-slate-950">RESET</button>
</form>
<p><a href="https://github.com/pawelwos/svelte-game-01"><svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
  </svg></a></p>
