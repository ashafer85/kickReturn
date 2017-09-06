## JS Project Proposal: kickReturn

### Background

Inspired by the classic Bugs vs Daffy football game online, kickReturn is a game in which a player will control the movements of the returner, attempting to avoid being tackled by the kickoff team and score a touchdown.

Conway's Game of Life is a classic example of the concept of **cellular automata**.  The original GoL is a 0-player game that plays out on a rectangular grid.  Each cell on the grid is either dead or alive when the game begins.  On the next iteration of the game (called a "generation") the cells follow these rules:

1) Any live cell with 2 or 3 live neighbors (defined to be the eight cells surrounding it) stays alive,
2) Any dead cell with exactly 3 neighbors will come to life,
3) Any live cell with less than 2 neighbors or more than 3 neighbors will die.

There are many variations on the GoL.  This simulation will incorporate several of those variations, outlined in the **Functionality & MVP** and **Bonus Features** sections.  

### Functionality & MVP  

With this game, users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Move freely in 2D using Up, Down, Right, & Left arrow keys
- [ ] Perform a stiff arm on a defender using 'D' key
- [ ] Toggle which hand is carrying the ball using 'S' key

### Wireframes

This app will consist of a single screen with game view, game controls, and nav links to the Github, my LinkedIn, and the About modal.  

Game controls will include Start, Stop, and Reset buttons as well as movement keys, stiff arm key, and toggle ball side.

![wireframes]

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `Foo.js` with `HTML5 Baz` for effects rendering,
- `Browserify` to bundle js files.

In addition to the entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Foo.js` elements and rendering them to the DOM.

`automata.js`: this script will handle the logic behind the scenes.  An Automata object will hold a `type` (hexagon, triangle, or square) and a 2D array of `Cell`s.  It will be responsible for doing neighbor checks for each `Cell` upon iteration and updating the `Cell` array appropriately.

`cell.js`: this lightweight script will house the constructor and update functions for the `Cell` objects.  Each `Cell` will contain a `type` (hexagon, triangle, or square) and an `aliveState` (`true` or `false`).

### Implementation Timeline

**Day 1**: Setup kick returner character that users will control with movement ability.

**Day 2**: Include 'defenders' that gravitate towards the kick returner, and attempt tackle when contact is made.

**Day 3**: Create more aesthetic looking view for user. Finish up movement/interaction event logic.
