const prompt = args[0]
const size = args[1]

if (
    !secrets.openaiKey
) {
    throw Error(
        "Need to set OPENAI_KEY environment variable"
    )
};

const dalleRequest = Functions.makeHttpRequest({
    url: "https://api.openai.com/v1/images/generations",
    method: "POST",
    headers: {
        'Authorization': `Bearer ${secrets.openaiKey}`,
    },
    data: { "model": "dall-e-3", 
            "prompt": prompt,
            "n": 1,
            "size": size,
            },
});

const [dalleResponse] = await Promise.all([
    dalleRequest
]);
console.log("raw response", dalleResponse);

const result = dalleResponse.data[0].url;
return Functions.encodeString(result);


