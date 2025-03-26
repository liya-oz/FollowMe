export const validateMessage = (message) => {
  if (!message.to || !message.content) {
    return { valid: false, error: "Recipient and content are required" };
  }

  if (typeof message.content !== "string" || message.content.trim() === "") {
    return {
      valid: false,
      error: "Message content must be a non-empty string",
    };
  }

  if (message.content.length > 1000) {
    return { valid: false, error: "Message too long (max 1000 characters)" };
  }

  return { valid: true };
};
