pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title Chainlink Functions example on-demand consumer contract example
 */
contract FunctionsConsumer is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;

  bytes32 public donId; // DON ID for the Functions DON to which the requests are sent

  bytes32 public latestRequestId;
  bytes public latestResponse;
  bytes public latestError;
  string public latestName;
  // Custom error type
  error UnexpectedRequestID(bytes32 requestId);
  event SuperHeroName(string name);
  event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
  // Custom error type
  //error UnexpectedRequestID(bytes32 requestId);
  
  //constructor(address oracle) FunctionsClient(oracle) ConfirmedOwner(msg.sender) {
    // donId = _donId;
  //}

  constructor(address router, bytes32 _donId) FunctionsClient(router) ConfirmedOwner(msg.sender) {
    donId = _donId;
  }

  /**
   * @notice Set the DON ID
   * @param newDonId New DON ID
   */
  
  function setDonId(bytes32 newDonId) external onlyOwner {
    donId = newDonId;
  }
  
  /**
   * @notice Triggers an on-demand Functions request using remote encrypted secrets
   * @param source JavaScript source code
   * @param secretsLocation Location of secrets (only Location.Remote & Location.DONHosted are supported)
   * @param encryptedSecretsReference Reference pointing to encrypted secrets
   * @param args String arguments passed into the source code and accessible via the global variable `args`
   * @param bytesArgs Bytes arguments passed into the source code and accessible via the global variable `bytesArgs` as hex strings
   * @param subscriptionId Subscription ID used to pay for request (FunctionsConsumer contract address must first be added to the subscription)
   * @param callbackGasLimit Maximum amount of gas used to call the inherited `handleOracleFulfillment` method
   */
  function sendRequest(
    string calldata source,
    bytes calldata secrets,
    FunctionsRequest.Location secretsLocation,
    string[] calldata args,
    // bytes[] calldata bytesArgs,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) external onlyOwner returns (bytes32) {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
    req.secretsLocation = secretsLocation;
    //req.encryptedSecretsReference = encryptedSecretsReference;
    if (secrets.length > 0) {
        if (secretsLocation = FunctionsRequest.Location.Inline) {
          req.addInlineSecrets(secrets);
        } else {
          req.addRemoteSecrets(secrets);
        }
    }
    if (args.length > 0) req.setArgs(args);

    bytes32 assignedReqID = _sendRequest(req.encodeCBOR(), subscriptionId, callbackGasLimit, donId);
    latestRequestId = assignedReqID;
    return assignedReqID;
  }
    /** 
    if (bytesArgs.length > 0) {
      req.setBytesArgs(bytesArgs);
    }
    */

  /**
   * @notice Store latest result/error
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  
   function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    latestResponse = response;
    latestError = err;
    emit OCRResponse(requestId, response, err);
    latestName = string(abi.encodePacked(response));
    emit SuperHeroName(latestName);
  }
}
