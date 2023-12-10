// Create a prompt element
export const getPromptElement = (typeAtt: string, nameAtt: string, minValue: string, maxValue: string) => {
    let pe: string
    switch (typeAtt) {
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
