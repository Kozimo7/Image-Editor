async function get_random_dog_image() {
    await fetch("https://dog.ceo/api/breeds/image/random")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            resetFilter();
            document.getElementById("image").src = data.message;
        })
        .catch(function (error) {
            console.log("Error: " + error);
        })
}


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');
canvas.width=550;
canvas.height=335;

let imgObj=new Image();
imgObj.src = document.getElementById("image").src;
imgObj.onload = function(){
    let w = canvas.width;
    let nw = imgObj.naturalWidth;
    let nh = imgObj.naturalHeight;
    let aspect = nw / nh;
    let h = w / aspect;
    canvas.height=h;

    imgObj.src = document.getElementById("image").src;
    ctx.drawImage(imgObj,0,0,w,h)
};


filterOption = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterValue = document.querySelector(".filter-info .value");
filterSlider = document.querySelector(".slider input");
previewImg = document.querySelector("#myCanvas");
resetFilterBtn = document.querySelector(".reset-filter");
rotateOptions = document.querySelectorAll(".rotate button");

let brightness = 100;
let contrast = 100;
let invert = 0;
let grayscale = 0;
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) invert(${invert}%) grayscale(${grayscale}%)`;
}

filterOption.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max="200"
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}`;
        } else if(option.id === "contrast") {
            filterSlider.max="200"
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}`;
        } else if(option.id === "invert") {
            filterSlider.min="0"
            filterSlider.max="100"
            filterSlider.value = invert;
            filterValue.innerText = `${invert}`;
        } else {
            filterSlider.min="0"
            filterSlider.max="100"
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}`;
        }
    })
})

const updateFilter = () =>{
    filterValue.innerText = filterSlider.value;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }
    else if(selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    }
    else if(selectedFilter.id === "invert") {
        invert = filterSlider.value;
    } else {
        grayscale = filterSlider.value
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = 100;
    contrast = 100;
    invert = 0;
    grayscale = 0;
    rotate = 0;
    flipHorizontal = 1;
    flipVertical = 1;

    filterOption[0].click();
    applyFilter();
}

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
