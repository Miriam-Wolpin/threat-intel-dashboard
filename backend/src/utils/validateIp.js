function isValidIp(ip) {
  const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
  return ipRegex.test(ip);
}

module.exports = { isValidIp };
