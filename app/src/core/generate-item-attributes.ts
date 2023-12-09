// // import { getAttributes } from '../../../backend/prompt2Attributes.js';

// // Create a prompt element
// export const getPromptElement = async(typeAtt:String, nameAtt:String, minValue:String, maxValue:String) => {
//     let pe: String
//     switch(typeAtt) {
//       case 'integer':
//         pe = `${nameAtt}: an integer ranging from ${minValue} to ${maxValue},`
//         break;
//       case 'range':
//         pe = `${nameAtt}: a random subinterval of the interval [${minValue} , ${maxValue}],`
//         break;
//       case 'float':
//         pe = `${nameAtt}: a float ranging from ${minValue} to ${maxValue} rounded to 2,`
//         break;
//       case 'percent':
//         pe = `${nameAtt}: a string of plus percentage that less than +${minValue} %, more than +${maxValue}%,` 
//         break;
//     };
//     return pe;
//   }
  
// export const generateItemAttributes =async (message: string) => {
//     // load model
//     return (await getAttributes(message));
//     // change settings
//     // generate item attributes
    
// }