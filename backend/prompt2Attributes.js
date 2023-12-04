import OpenAI from "openai";

// Create a prompt element
export const getPromptElement = (typeAtt, nameAtt, minValue, maxValue) => {
  let pe
  switch(typeAtt) {
    case 'integer':
      pe = `${nameAtt}: an integer ranging from ${minValue} to ${maxValue}, \n`
      break;
    case 'range':
      pe = `${nameAtt}: a subinterval of the interval [${minValue}, ${maxValue}], \n`
      break;
    case 'float':
      pe = `${nameAtt}: a float ranging from ${minValue} to ${maxValue} rounded to 2, \n`
      break;
    case 'percent':
      pe = `${nameAtt}: a string of plus percentage that less than +${maxValue} %, more than +${minValue}%, \n` 
      break;
  };
  return pe;
}

const openai = new OpenAI({
  apiKey: "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", dangerouslyAllowBrowser: true
});

// Create functions to generate a prompt to attributes.
export const getAttributes = async(message) => { 
  const completion = await openai.chat.completions.create({
    messages: [
        {"role": "user", "content": message
        },
        ],
    model: "gpt-3.5-turbo",
  });

  return [completion.choices[0].message.content];
}
