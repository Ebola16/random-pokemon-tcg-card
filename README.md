# Random Pokémon TCG Card

Get a random Pokémon TCG Card from [https://pokemontcg.io/](https://pokemontcg.io/) A case-insensitive "r" query parameter ([RE2 regex](https://www.npmjs.com/package/re2), which is regex without backreferences and lookahead assertions) is supported. A case-insensitive "e" query parameter (exclude) is also supported that excludes matches separated by commas. These filter the contents of `/data/images.json`. Artificial intelligence tools are helpful for learning how to generate RE2 regex.

Pokémon assets are ©2025 Nintendo, Creatures Inc., and GAME FREAK inc.
All trademarks and copyrights are property of their respective owners.
These assets are used here under fair use for non-commercial, educational, and fan-based purposes.
No affiliation or endorsement by Nintendo, Creatures Inc., GAME FREAK, or The Pokémon Company is implied.

Part of [random image examples](https://ebola16.github.io/random-image-examples/).

---

### Examples

- **Get a random Pokémon TCG card:**  
  [https://random-pokemon-tcg-card.vercel.app](https://random-pokemon-tcg-card.vercel.app)

- **Get a random card from Fossil (base set 3):**  
  [https://random-pokemon-tcg-card.vercel.app/?r=base3](https://random-pokemon-tcg-card.vercel.app?r=base3)

- **Get a random card from Fossil (base set 3), excluding Aerodactyl (1/62):**  
  [https://random-pokemon-tcg-card.vercel.app/?e=^(?!.*\/1$).*&r=base3](https://random-pokemon-tcg-card.vercel.app?e=^(?!.*\/1$).*&r=base3)