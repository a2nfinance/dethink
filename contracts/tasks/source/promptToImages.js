const prompt = args[0]
const size = args[1]

const url = "https://dethink.a2n.finance/api/get-image";
const req = Functions.makeHttpRequest({
    url: url,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    data: JSON.stringify({ prompt: prompt, size: size })
});

const res = await req;

if (res.error) {
    console.error(
        res.response
            ? `${res.response.status},${res.response.statusText}`
            : ""
    );
    throw Error("Request failed");
}

return Functions.encodeString(JSON.stringify(res["data"]));


