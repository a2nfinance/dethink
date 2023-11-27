import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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"
});

async function getNormalWeapon(dps = "Damage per Second", dph = "Damage per Hit",
                               aps = "Attacks per Second", dhe = " Damage to Healthy Enemies") 
{
  const completion = await openai.chat.completions.create({
    messages: [
        {"role": "user", "content": `Let's create a JSON file including: 
        ${dps}, is an integer ranging from 700 to 900, 
        ${dph}, is a random subinterval of the interval [600, 1000], 
        ${aps}, is a float ranging from 1 to 2 rounded to 2, 
        ${dhe}, is a string of plus percentage that less than +30%, more than +20%.` 
        },
        ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

getNormalWeapon("a", "b", "c", "d").then(results => console.log(results));