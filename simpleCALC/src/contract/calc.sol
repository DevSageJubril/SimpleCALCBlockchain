// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calculator {
    struct Calculation {
        uint id;
        string operation;
        int256 operand1;
        int256 operand2;
        int256 result;
    }

    uint public calculationCount = 0;
    mapping(uint => Calculation) public calculations;

    event CalculationRequested(uint id, string operation, int256 operand1, int256 operand2);
    event CalculationCompleted(uint id, int256 result);

    // Request a calculation
    function requestCalculation(string memory operation, int256 operand1, int256 operand2) public returns (uint) {
        calculationCount++;
        emit CalculationRequested(calculationCount, operation, operand1, operand2);
        return calculationCount;
    }

    // Store the result of a calculation (to be called by Cartesi)
    function storeResult(uint id, int256 result) public {
        Calculation storage calc = calculations[id];
        calc.result = result;
        emit CalculationCompleted(id, result);
    }

    // Retrieve the result of a calculation
    function getCalculation(uint id) public view returns (Calculation memory) {
        return calculations[id];
    }
}
