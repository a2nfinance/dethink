// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title Chainlink Functions example on-demand consumer contract example
 */
contract GenerateImagesFunctionsConsumer is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;
  string public source;
  uint64 public subscriptionId;
  uint32 public callbackGasLimit;
  bytes32 public donId;

  bytes32 public latestRequestId;
  bytes public latestResponse;
  bytes public latestError;

  // Custom error type
  error UnexpectedRequestID(bytes32 requestId);
  event Images(bytes32 indexed requestId, bytes result, bytes err);

  // Step 1: Init contract with function router --- Avalanche Fuji
  constructor(address router) FunctionsClient(router) ConfirmedOwner(msg.sender) {}

  // Step 2: Update contract storage
  function updateRequest(
    string calldata _source,
    uint64 _subscriptionId,
    uint32 _callbackGasLimit,
    bytes32 _donId
  ) external onlyOwner {
    source = _source;
    subscriptionId = _subscriptionId;
    callbackGasLimit = _callbackGasLimit;
    donId = _donId;
  }

  function _sendRequestWithoutCBOR(string memory _prompt, string memory _size) internal returns (bytes32) {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
    string[] memory args = new string[](2);
    args[0] = _prompt;
    args[1] = _size;
    if (args.length > 1) req.setArgs(args);

    bytes32 assignedReqID = _sendRequest(req.encodeCBOR(), subscriptionId, callbackGasLimit, donId);
    latestRequestId = assignedReqID;
    return assignedReqID;
  }

  /**
   * @notice Store latest result/error
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */

  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    if (latestRequestId != requestId) {
      revert UnexpectedRequestID(requestId);
    }
    latestResponse = response;
    latestError = err;
    emit Images(requestId, latestResponse, latestError);
  }

  /**
   * Step 3: To send request to get attributes.
   * @param _prompt AI command
   * @param _size Image size
   */
  function getAttribute(string memory _prompt, string memory _size) external {
    _sendRequestWithoutCBOR(_prompt, _size);
  }
}
