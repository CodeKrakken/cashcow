class SymbolValidator {
  static validate(symbol) {
    if (symbol === "MSFT") {
      return {
      valid: true,
      error: false
      }
    } else {
      return {
        valid: false,
        error: "not a valid symbol"
      }
    }
  }
}

module.exports = SymbolValidator;
