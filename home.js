//Get our canvas element -> we'll be drawing on this
const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Calculate how many columns will fit on our screen
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

//Set our characters to use while drawing -> this is basically the rain
const katakana = 'アァカサタナハマヤャラワガザダバパイィ'; //not the full set of katakana
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const rainDrops = Array.from({ length: columns }, () => 1);

function drawMatrixRain() {
    //Clear the canvas with a semi-transparent black rectangle to create a fading effect
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    //Set the raindrop color to green
    context.fillStyle = '#00FF00'; //Hex code for Green color
    context.font = `${fontSize}px monospace`;

    //Randomly select a character from the alphabet for each of the 16 columns
    for (let x = 0; x < columns; x++) 
    {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        const y = rainDrops[x] * fontSize;
        //writes the raindrop text to the screen 
        context.fillText(char, x * fontSize, y);

        //Wrap the text back to the top when they reach the canvas lower-depth
        rainDrops[x]++; // Move raindrop down
        if (y > canvas.height) 
        {
            rainDrops[x] = 0;
        }
    }
    
    //Instead of using a fixed interval (like setInterval methods), which can lead to inconsistent frame rates, requestAnimationFrame synchronizes with the browser’s rendering cycle
    //  this basically allows us to loop this method, without any frame skips, etc.
    requestAnimationFrame(drawMatrixRain);
}