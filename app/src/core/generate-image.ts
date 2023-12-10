export const getPromptElement = async(typeAtt:String, nameAtt:String, minValue:String, maxValue:String) => {
    let pe: String
    switch(typeAtt) {
      case 'integer':
        pe = `${nameAtt}: an integer ranging from ${minValue} to ${maxValue},`
        break;
      case 'range':
        pe = `${nameAtt}: a subinterval of the interval [${minValue} , ${maxValue}],`
        break;
      case 'float':
        pe = `${nameAtt}: a float ranging from ${minValue} to ${maxValue} rounded to 2,`
        break;
      case 'percent':
        pe = `${nameAtt}: a string of plus percentage that less than +${maxValue} %, more than +${minValue}%,` 
        break;
    };
    return pe;
}
  
