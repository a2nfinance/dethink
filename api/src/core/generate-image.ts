import { getImages } from '../../../backend/prompt2Images.js';

export const generateImages = async (prompt: string, size: string) => {
    // load model
    return [await getImages(prompt, size)]
    
    // change settings
    // generate images to folder
    // return image URLs
    //return ["https://m.media-amazon.com/images/I/51D+uNV6ndL._AC_UF1000,1000_QL80_.jpg"];
}

// console.log(generateImages("a blue axe in the game of Diablo", "1024x1024"))