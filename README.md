# UTFSnow
UTF Snow is a tiny, highly configurable javascript library that snows down interactive UTF characters on your page. You are not just limited to falling snow. You an also have hearts, footballs, or whatever text you'd like.

Good place to find symbol codes:
http://www.w3schools.com/charsets/ref_utf_misc_symbols.asp

----
### See it in action and customise it live at:
#### https://utfsnow.danruta.co.uk
 
-----
To start a new UTF particle snow (you can start as many different ones as you want at any time), use as following: 
```javascript
// Default options
const utfSnow = new UTFSnow()

// Customised
const utfSnow = new UTFSnow({content:"&#9829;", color:"red"})
```
## Available customisation options are:
| Key | What it does| Type | Default|
| ------------- |:-------------:| :-----:| :-----:| 
| content | The text to snow down. | Can be a symbol code, or random string. Even an  HTML element, such as img | "&amp;#x2744;" (&#x2744;) |
| color | The colour of the text falling down | String (css colour) | "black" |
| speedMultiplier | Increase or decrease the particle speed | Number | 1 |
| densityMultiplier | Increase or decrease how often new particles are spawned (and thus, how dense they are) | Number | 1 |
| limit | The maximum number of particles on screen at any time | Number | 25 | 
| mouseTilt | Make particles fall more towards the left or right side of the screen, following the cursor movements | Boolean | true |
| mouseNudge | Add some light physics to the particles, when hovered over  with the mouse | Boolean | true |
| mousePop | Pop the particles when clicked on | Boolean | true |

You can pause and resume the particle fall at any time by using ```.pause()``` or ```.resume()```.

## Future plans
Ideas I've been given include:
- Device orientation tilting (for phones, tablets)
- Custom start and cut-off points (instead of top and bottom of the screen) 
- Ability to add custom event listeners to particles (some example uses could be clicking to increment a total score, mouseover (used together with a football symbol), to increment a keep-ups score, etc ).
- Particle accumulation (at the bottom, or atop fenced off areas)

As I get some free time, I may come back to a couple of these. Otherwise, pull requests are always welcome ;).