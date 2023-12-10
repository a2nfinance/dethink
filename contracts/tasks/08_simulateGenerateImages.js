const { networks } = require("../networks")
const fs = require("fs");
const path = require("path");
const {
    simulateScript,
    ReturnType,
    decodeResult,
} = require("@chainlink/functions-toolkit");
task("simulate-generate-images", "Call to contract to generate images")
    .addParam("prompt", "Prompt")
    .addParam("size", "Prompt")
    .setAction(async (taskArgs, hre) => {
        const { prompt, size } = taskArgs;

        const source = fs
            .readFileSync(path.resolve(__dirname, "./source/promptToImages.js"))
            .toString();
        ///////// START SIMULATION ////////////

        console.log("Start simulation...");

        const response = await simulateScript({
            source: source,
            args: [prompt, size],
            bytesArgs: [], // bytesArgs - arguments can be encoded off-chain to bytes.
            secrets: {}, // no secrets in this example
        });

        console.log("Simulation result", response);
        const errorString = response.errorString;
        if (errorString) {
            console.log(`❌ Error during simulation: `, errorString);
        } else {
            const returnType = ReturnType.string;
            const responseBytesHexstring = response.responseBytesHexstring;
            if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
                const decodedResponse = decodeResult(
                    response.responseBytesHexstring,
                    returnType
                );
                console.log(`✅ Decoded response to ${returnType}: `, decodedResponse);
            }
        }
    })