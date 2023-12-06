const { networks } = require("../networks")

task("deploy-function-consumer", "deploy FunctionsConsumer.sol").setAction(async (taskArgs, hre) => {
    const routerAddress = networks[network.name].functionRouter;
    console.log("\n__Compiling Contracts__")
    await run("compile")

    console.log(`\nDeploying OneMesNaming.sol to ${network.name}...`)
    const contractFactory = await ethers.getContractFactory("FunctionsConsumer")
    const functionContract = await contractFactory.deploy(routerAddress)
    await functionContract.deployTransaction.wait(1)

    console.log(`\nSender contract is deployed to ${network.name} at ${functionContract.address}`)
})