const { networks } = require("../networks")

task("deploy-function-consumer-attributes", "deploy GenerateAttributesFunctionsConsumer.sol").setAction(async (taskArgs, hre) => {
    const routerAddress = networks[network.name].functionRouter;
    console.log("\n__Compiling Contracts__")
    await run("compile")

    console.log(`\nDeploying GenerateAttributesFunctionsConsumer.sol to ${network.name}...`)
    const contractFactory = await ethers.getContractFactory("GenerateAttributesFunctionsConsumer")
    const functionContract = await contractFactory.deploy(routerAddress)
    await functionContract.deployTransaction.wait(1)

    console.log(`\nSender contract is deployed to ${network.name} at ${functionContract.address}`)
})

task("deploy-function-consumer-images", "deploy GenerateImagesFunctionsConsumer.sol").setAction(async (taskArgs, hre) => {
    const routerAddress = networks[network.name].functionRouter;
    console.log("\n__Compiling Contracts__")
    await run("compile")

    console.log(`\nDeploying GenerateImagesFunctionsConsumer.sol to ${network.name}...`)
    const contractFactory = await ethers.getContractFactory("GenerateImagesFunctionsConsumer")
    const functionContract = await contractFactory.deploy(routerAddress)
    await functionContract.deployTransaction.wait(1)

    console.log(`\nSender contract is deployed to ${network.name} at ${functionContract.address}`)
})