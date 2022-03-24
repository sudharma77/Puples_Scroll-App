const imagec = document.getElementById('imgcontainer')
const loader = document.getElementById('loader')
//loader.hidden = true



let count = 12;
const APIkey = "r-ZzHz6OnqIJqU0kQcnIO4Xcps636gLnvXL6AqDsijk"
const query = "puppy"; //"monument";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIkey}&count=${count}&query=${query}&orientation=squarish;`;
const jokes = 'https://dog.ceo/api/breeds/image/random';
let photoArray = [] ;

let imageLoade  = 0 ;
let totalImage = 0 ;
let ready = false

function setAttributes(element , attributs){
    //console.log('sudharma1')
    for(const key in attributs){
        //console.log(attributs[key])
       element.setAttribute(key , attributs[key])
    }
}

function imageLoad(){
    imageLoade++
    if(imageLoade === totalImage){
        ready = true ;
        loader.hidden = true ;
        
    }
}

function showPhotos(){
    imageLoade = 0 ;
    totalImage = photoArray.length ;
    console.log(totalImage)
    for(let i = 0 ; i < totalImage ; i++){
       let l = photoArray[i];
       
       const item = document.createElement("a");        
        setAttributes(item,{
            href: l.links.html,
            target: "_blank",
        })        
        const img = document.createElement("img")
        setAttributes(img , {
            src: l.urls.regular,
            alt: l.alt_description,
            title: l.alt_description,
            width:'350px' ,
            height: '400px'
        })
    img.addEventListener('load' ,imageLoad)
    item.appendChild(img)
    imagec.appendChild(item)
    console.log('sudharma1')
        
        
    }
    // photoArray.forEach((photo)=>{
    //     const item = document.createElement('a');
    //     console.log(photo)
    //     setAttributes(item ,{
    //     href:photo.links.html ,
    //     alt:'_Blank'
    
    //     })
    //     const img = document.createElement('img')
    //     setAttributes(img , {
    //         src:photo.urls.regular
    //     })
    // })
    // console.log('sudharma1')
    // const item = document.createElement("a");  
    // const img = document.createElement("img")
    
    
}
    

async function getPhotoes(){
    try{
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        console.log(photoArray)
        showPhotos()
    }catch(error){
        console.log('error')
    }

}
getPhotoes()

window.addEventListener("scroll", () => {
     console.log(window.scrollY,window.innerHeight,document.body.offsetHeight)
    
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        ready
      ) {
        ready = false;
        getPhotoes()
      }
    });