function isValidUUID(string) {
  // const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[[0-9a-fA-F]]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  return regex.test(string)
}

module.exports = isValidUUID;