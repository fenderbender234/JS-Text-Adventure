//Josh Freeman
//Javascript Text Adventure

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//Keeps track of what items are on the character, starts empty.
let state = {}

//Function starts the game and sets the states
function startGame() {
  state = {}
  showTextNode(1)
}

//Takes the index of text nodes
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}
//If required state returns true, or if there are no required states, then it will show the option
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
//Required states for items.  Game knows what items you picked up so you can progress
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

//Each id number is 1 'slide' in the game
//Each id number has either 1 or 2 options to choose from
//States are set to true if an item is picked up
//Some choices require a set state to unlock, which can be done by having a true state via picking up an item
const textNodes = [
  {
    id: 1,
    text: 'You are adventuring in the wilderness, and come across a mysterious looking cave.  As you cross the threshold, you notice 2 doors and 2 objects on the ground.',
    options: [
      {
        text: 'Pick up the penguin',
        //This will set the state to true for the penguin item if picked up.  Similar mechanic for other items
        setState: { penguin: true },
        //After this choice is selected, the 2nd id node is brought up along with its options
        nextText: 2
      },
      {
        text: 'Pick up the steel pry bar',
        setState: { pryBar: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'With your object in hand, you decide to venture through one of the doors.',
    options: [
      {
        text: 'Enter the door on the left',
        nextText: 3
      },
      {
        text: 'Enter the door on the right',
        nextText: 10
      }
    ]
  },
  {
    id: 3,
    text: 'You entered the door on the left.  Inside is an enormous elephant with "Edward" drawn on his forehead.  Edward is blocking your path.',
    options: [
      {
        text: 'Place the penguin in front of the elephant',
        //This choice won't be visible unless the player has picked up the penguin, and thus setting their current state for penguin to true
        requiredState: (currentState) => currentState.penguin,
        nextText: 4
      },  
      {
          //If the player doesnt have the required item, the only option is to restart
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'Edward the elephant is fascinated by the penguin, and picks him up as he moves to the other side of the room.  The way forward is now clear, and you notice a gas mask and a remote control on the ground where Edward was previously sitting.',
    options: [
    {
        text: 'Pick up the gas mask',
        setState: { gasMask: true },
        nextText: 5
      },
      {
        text: 'Pick up the remote control',
        setState: { remoteControl: true },
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'You pick up your item, and you notice another 2 doors in front of you.  Knowing your only way out is forward, you ponder for a moment on which door to open.',
    options: [
    {
        text: 'Enter the door on the left',
        nextText: 6
      },
      {
        text: 'Enter the door on the right',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'You entered the door on the left.  Once inside you notice the room is quickly filling with poison gas.',
    options: [
      {
        text: 'Put on your gas mask',
        requiredState: (currentState) => currentState.gasMask,
        nextText: 8
      },  
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You entered the door on the right.  In the back of the room, you can see...a robot ninja?  He seems upset you are in his home and moves to block your path.',
    options: [
      {
        text: 'Frantically start pushing buttons on the remote control',
        requiredState: (currentState) => currentState.remoteControl,
        nextText: 9
      },  
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'After putting on your gas mask, you venture deeper into the cave.  After several minutes you see a light a the end of the tunnel, you are saved!',
    options: [
      {
          //After the player wins, the You win! button functions the same as the restart button
        text: 'You win!',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'One of the buttons seemed to work, the robot shut down just before it could unsheathe its blades.  Behind him you see a light at the end of the tunnel, you are saved!',
    options: [
      {
        text: 'You win!',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You entered the door on the right.  After a moment you hear a "click" and the walls start closing in on you!',
    options: [
      {
        text: 'Use the pry bar to hold the walls open',
        requiredState: (currentState) => currentState.pryBar,
        nextText: 11
      },  
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Quickly, you used the pry bar to hold the walls open, just long enough for you to do an Indiana Jones dive and make it through the booby trap.  Before you lies a flashlight resting on a chair.',
    options: [
    {
        text: 'Pick up the chair',
        setState: { chair: true },
        nextText: 12
      },
      {
        text: 'Pick up the flashlight',
        setState: { flashlight: true },
        nextText: 12
      }
    ]
  },
  {
    id: 12,
    text: 'Before you lies another 2 doors.  You ponder for a moment on which door to venture through.',
    options: [
    {
        text: 'Enter the door on the left',
        nextText: 13
      },
      {
        text: 'Enter the door on the right',
        nextText: 15
      }
    ]
  },
  {
    id: 13,
    text: 'You entered the door on the left.  Inside you see a tiger with "Elsa" on her collar.  Elsa moves to block your path.',
    options: [
      {
        text: 'Defend yourself with the chair',
        requiredState: (currentState) => currentState.chair,
        nextText: 14
      },  
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'Upon seeing the chair, Elsa backs down, she seems to have had some training from a circus.  What a weird place for a circus animal!  You venture deeper into the cave and finally find a light at the end of the tunnel, you are saved!',
    options: [
      {
        text: 'You win!',
        nextText: -1
      }
    ]
  },
  {
    id: 15,
    text: 'You entered the door on the right.  The cave ahead is pitch black, who knows what could be ahead?',
    options: [
      {
        text: 'Use your flashlight to illuminate the path',
        requiredState: (currentState) => currentState.flashlight,
        nextText: 16
      },  
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: 'You turn the flashlight on, and travel deeper into the cave.  Finally, you see a light at the end of the tunnel, you are saved!',
    options: [
      {
        text: 'You win!',
        nextText: -1
      }
    ]
  },
]

//Calls the startGame function
startGame()