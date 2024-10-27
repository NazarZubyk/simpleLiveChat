// src/msgStorage.ts

class MessageStorage {
  /**
   * Stores messages in memory.
   * @private
   * @remarks
   *   This is a simple in-memory storage. It is not suitable for production.
   */
  private messages: string[] = [];
  
  /**
   * Adds a message to the storage.
   * @param message - The message to add.
   * @remarks
   *   The message is formatted with the current UTC time.
   */
  public push(message: string): void {
    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
    const formattedMessage = `${timestamp}: ${message}`;
    this.messages.push(formattedMessage);
  }
  
  /**
   * Retrieves all messages from the storage.
   * @returns An array of all messages in the storage.
   */
  public get(): string[] {
    return this.messages;
  }
}
  
  export default MessageStorage;