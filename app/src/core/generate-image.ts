// import { getImages } from '../../../backend/prompt2Images.js';


// Create a prompt element
export const getPromptElement = async(typeAtt:String, nameAtt:String, minValue:String, maxValue:String) => {
    let pe: String
    switch(typeAtt) {
      case 'integer':
        pe = `${nameAtt}: an integer ranging from ${minValue} to ${maxValue},`
        break;
      case 'range':
        pe = `${nameAtt}: a random subinterval of the interval [${minValue} , ${maxValue}],`
        break;
      case 'float':
        pe = `${nameAtt}: a float ranging from ${minValue} to ${maxValue} rounded to 2,`
        break;
      case 'percent':
        pe = `${nameAtt}: a string of plus percentage that less than +${minValue} %, more than +${maxValue}%,` 
        break;
    };
    return pe;
  }
  
export const generateImages = async (prompt: string, size: string) => {
    // load model
    // return [await getImages(prompt, size)]
    
    // change settings
    // generate images to folder
    // return image URLs
    //return ["https://m.media-amazon.com/images/I/51D+uNV6ndL._AC_UF1000,1000_QL80_.jpg"];
}

// console.log(generateImages("a blue axe in the game of Diablo", "1024x1024"))