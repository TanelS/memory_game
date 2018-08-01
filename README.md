# Memory Game

Despite not having to touch javascript for more that six months I managed to get the game working.

The game start after running two functions:

- `newGame();`
- `theGame();`

The execution is straightforward:

- cards are shuffled and added cack to the DOM element named `deck`;
- event listener `click` is assignet to each gamecard; 
- if user clicks on the card, the style changes, revealing the card: 
    - `card.target.classList.toggle("show");`;
    - ` card.target.classList.toggle("open");`
- open cards are added to the array `openCards`;
- if the `.lastElementChild.className` of each opened card in `openCards` matches, then the class name is changed: `className = 'card match';`;
- in case when there is no match, then cards background is changed to res and cards are open for one second;


To prevent clicking on the cards marked as a match, one line in `app.scc` is added

```
.deck .card.match {
    cursor: default;
    pointer-events: none; <-- prevents clicking
    background: #02ccba;
    font-size: 33px;
}
```
Stars are calculated on the following rules:

- under 10 moves: 3 stars;
- over 10 moves: 2 stars;
- over 20 moves: 1 stars;
- over 40 moves: 0 stars;


If the game is over, the stats (stars, move count and the time) are displayed as a modal window and there is a possibility to start over.

Starting over is possible via kicking restart button. By doing so all relevant variables are reset.
