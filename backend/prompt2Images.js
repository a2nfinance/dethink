import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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"
});

// Create functions to generate a prompt to images.
export const getImages = async (prompt, size) => {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: size,
    });
    const image_url = response.data[0].url;
    return image_url;
}

// console.log(await promptToImage("a blue axe in the game of Diablo", "1024x1024"));
