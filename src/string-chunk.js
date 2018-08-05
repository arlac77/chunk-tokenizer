/**
 * @property {Number} position current peek position in the buffer
 * @property {string} buffer
 * @property {Number} currentLine
 */
export class StringChunk {
  constructor(buffer = '') {
    this.buffer = buffer;
    this.position = 0;
    this.currentLine = 1;
  }

  /**
   * append content of buffer
   * and reset the position(s)
   * @param {string} buffer
   */
  append(buffer) {
    let preserve = this.position;
    if (this.markedPosition < preserve) {
      preserve = this.markedPosition;
    }

    if (preserve >= this.buffer.length) {
      this.buffer = buffer;
    } else {
      this.buffer = this.buffer.substring(preserve) + buffer;
    }
    this.markedPosition -= preserve;
    this.position = 0;
  }

  /**
   *
   */
  extractFromMarkedPosition() {
    const n = this.markedPosition;
    delete this.markedPosition;
    return this.buffer.substring(n, this.position);
  }

  /**
   *
   */
  markPosition() {
    if (this.markedPosition === undefined) {
      this.markedPosition = this.position;
      return true;
    }
    return false;
  }

  *[Symbol.iterator]() {
    for (; this.position < this.buffer.length; this.position++) {
      yield this.buffer.charCodeAt(this.position);
    }
  }

  /**
   * @return {Number} char at the current position
   */
  peek() {
    return this.buffer.charCodeAt(this.position);
  }

  /**
   * Advance current position by one (after delivring the current char)
   * @return {Number} char at the current position
   */
  advance() {
    return this.buffer.charCodeAt(this.position++);
  }

  lineEndReached() {
    this.currentLine++;
  }
}
