const prompt = args[0]

if (
    !secrets.openaiKey
) {
    throw Error(
        "Need to set OPENAI_KEY environment variable"
    )
};

const openAIRequest = Functions.makeHttpRequest({
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: {
        'Authorization': `Bearer ${secrets.openaiKey}`
    },
    data: { "model": "gpt-3.5-turbo", 
            "messages": [
                {"role": "user", "content": prompt},
                ],
            },
});

const [openAiResponse] = await Promise.all([
    openAIRequest
]);
console.log("raw response", openAiResponse);

const result = openAiResponse.data.choices[0].message.content;
return Functions.encodeString(result);