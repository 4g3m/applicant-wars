Play the game on repl [here](https://repl.it/@fs0/TimelyDarkcyanInterfaces). Below are some notes of my brainstorming in the process of building this game.

### OOP spike

####description:
 - Fight until a fighter get slapped so hard by an applicant that they can't walk anymore (HP is 0)
 - Fighters/candidates recover after each match

####rules:
  - slap damage is random
  - first fighter is random
  - a match has 1+ rounds of candidates fighting eachother
  - output the candidates sorted by number of wins

####entities:
- players
   - slap
- game / battle system
   - play
   - end
- scoreboard
   - output candidates sorted by number of wins
- match
   - two players
   - simulate

####notes/decisions/assumptions made to reader:
  - every player gets to play each other once
  - players recover to full health after match
  - I made max slap damage more random to allow for greater variance in results
  - I forgoed created a scoreboard class as I delegated/spread the logic by to different classes instead of scoreboard. In the future should I extend this game I would probably bring logic and the responsiblity back into a scoreboard class.
  - Bob Barker was great in the price is right but he is awful in this game
