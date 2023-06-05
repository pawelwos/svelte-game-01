import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export const load = ({ cookies }) => {
  const scoreY = cookies.get('scoreY') ? cookies.get('scoreY') : 0
  const scoreC = cookies.get('scoreC') ? cookies.get('scoreC') : 0
  return {
    scoreY,
    scoreC
  };
};


export const actions = {
  play: async ({ cookies, request }) => {
    const possible_actions = ["rock", "paper", "scissors"]
    let scoreY = cookies.get('scoreY') ? cookies.get('scoreY') : 0
    let scoreC = cookies.get('scoreC') ? cookies.get('scoreC') : 0
    const data = await request.formData();
    const pick = data.get('pick')
    const computer_pick = possible_actions[Math.floor(Math.random() * possible_actions.length)]
    let win = 0
    if (pick == 'rock') {
      if(computer_pick == 'rock')
      {
        win = 2
      }
      else if (computer_pick == 'scissors') {
        win = 1
        scoreY++
      }
      else {
        win = 0
        scoreC++
      }
    } else if (pick == 'paper') {
      if(computer_pick == 'paper')
      {
        win = 2
      } else if (computer_pick == 'rock') {
        win = 1
        scoreY++
      } else {
        win = 0
        scoreC++
      }
    } else if (pick == 'scissors') {
      if(computer_pick == 'scissors')
      {
        win = 2
      } else if (computer_pick == 'paper') {
        win = 1
        scoreY++
      } else {
        win = 0
        scoreC++
      }
    }
    cookies.set('scoreY', scoreY)
    cookies.set('scoreC', scoreC)
    return {
      win,
      computer_pick,
      scoreY,
      scoreC
    }
  },

  reset: async ({ cookies, request }) => {
    cookies.set('scoreY', 0)
    cookies.set('scoreC', 0)
    throw redirect(303, '/')
  }
}
