// selectors section ---------------------------------------------------------------------------------------------------
const colorSeed = document.getElementById('select-color');
const scheme = document.getElementById('select-schemes');
const getColorBtn = document.getElementById('getColorbtn')
const mainContainer = document.getElementById('all-color-container');
const toBeRemoved = document.getElementById('toBeRemoved');

// checks to see if any colors are rendered already
let colorsAreRendered = false;

// checks to see if new colors or new scheme is chosen
let checkIfClicked = true;




// events section --------------------------------------------------------------------------------------------------------
getColorBtn.addEventListener('click', renderByClick);
mainContainer.addEventListener("click", saveToClipBoard);
colorSeed.addEventListener("click", () => {
    checkIfClicked = true;
});
scheme.addEventListener("click", () => {
    checkIfClicked = true;
});




// functions section -----------------------------------------------------------------------------------------------------

// function to trigger the render()
// or trigger the removeit() then render()
// decided by conditional
function renderByClick(){
    event.preventDefault();
    
    // removes words
    toBeRemoved.remove();

    // if nothing is rendered already 
    // call render function
    if(!colorsAreRendered){
        render();

        // if something is rendered and a new color OR a new scheme 
        // is picked remove what is already rendered and
        // render new colors.
        // if something is rendered BUT no new color OR scheme is picked
        // dont do anything -> prevents extra of the same colors from being 
        // rendered which would result in 12 colors all at once show.
    } else if (colorsAreRendered === true && checkIfClicked === true){
        removeIt();
        render();
    };
};


// function to allow us to save color to clipboard
function saveToClipBoard(e){
    const target = e.target;

    // if target class is single-color-container 
    // copy targets background-color value to 
    // clipboard
    if(target.classList[0] == "single-color-container"){
        console.log(target.style.backgroundColor);
        navigator.clipboard.writeText(target.style.backgroundColor);
        alert('Copied the color!');
    };

    // if target class is hex-container 
    // copy targets textcontent to 
    // clipboard
    if(target.classList[0] == "hex-container"){
        console.log(target.textContent);
        navigator.clipboard.writeText(target.textContent);
        alert('Copied the color!');
    };
};

// removes rendered divs
function removeIt(){
    for(let i = 0; i < 6; i++){
        document.getElementById("remove-this").remove();
    }
    colorsAreRendered = false;
    checkIfClicked = false;
};


// the actual function that 
// creates all the divs, colors, hex numbers
function render(){
    let yourColor = colorSeed.value;
    const yourScheme = scheme.value;
    yourColor = yourColor.substring(1);
    checkIfClicked = false;

    fetch(`https://www.thecolorapi.com/scheme?hex=${yourColor}&format=JSON&mode=${yourScheme}&count=6`)
    .then(response => response.json())
    .then(data => { 
        
        // loops through 6 of the colors 
        for(let i = 0; i < 6; i++){

            // saves all 6 colors hex value into variable
            const colorToRender = data.colors[i].hex.value;

            // Creates 6 containers for each color & hex number
            const newDiv = document.createElement('div');
            newDiv.classList.add("rendered-single-color-el");
            newDiv.setAttribute("id", "remove-this");
            mainContainer.appendChild(newDiv);

            // creates div that has the actual color
            // does this 6 times
            const colorDiv = document.createElement('div');
            colorDiv.classList.add('single-color-container');
            colorDiv.setAttribute("id", "red-el");
            colorDiv.style.backgroundColor = colorToRender;
            newDiv.appendChild(colorDiv);
        
            // creates h3 that contains hex number
            // does this 6 times
            const hexDiv = document.createElement('h3');
            hexDiv.classList.add("hex-container");
            hexDiv.innerHTML = `${colorToRender}`;
            newDiv.appendChild(hexDiv);

        };

    });
    // turns this variable false
    // which means that there are colors already rendered
    colorsAreRendered = true;
};