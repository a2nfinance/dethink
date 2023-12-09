const { networks } = require("../networks")

task("generate-attributes", "Call to contract to generate attributes")
    .addParam("contractaddress", "address of functions consumer contract")
    .addParam("prompt", "Prompt")
    .setAction(async (taskArgs, hre) => {
        const { contractaddress, prompt } = taskArgs;

        console.log(`\nSend prompt to GenerateAttributesFunctionsConsumer.sol to ${network.name}...`)
        const contractFactory = await ethers.getContractFactory("GenerateAttributesFunctionsConsumer");
        const contract = await contractFactory.attach(contractaddress);
        const updateTx = await contract.getAttribute(
            prompt
        )
        await updateTx.wait(1)

        console.log(`\nSend request to to ${network.name} at ${contract.address}`)
})