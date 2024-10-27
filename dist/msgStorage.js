"use strict";
// src/msgStorage.ts
Object.defineProperty(exports, "__esModule", { value: true });
class MessageStorage {
    constructor() {
        /**
         * Stores messages in memory.
         * @private
         * @remarks
         *   This is a simple in-memory storage. It is not suitable for production.
         */
        this.messages = [];
    }
    /**
     * Adds a message to the storage.
     * @param message - The message to add.
     * @remarks
     *   The message is formatted with the current UTC time.
     */
    push(message) {
        const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
        const formattedMessage = `${timestamp}: ${message}`;
        this.messages.push(formattedMessage);
    }
    /**
     * Retrieves all messages from the storage.
     * @returns An array of all messages in the storage.
     */
    get() {
        return this.messages;
    }
}
exports.default = MessageStorage;
