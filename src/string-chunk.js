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
    if (this.position >= this.buffer.length) {
      this.buffer = buffer;
    } else {
      this.buffer = this.buffer.substring(this.position) + buffer;
    }
    this.markedPosition -= this.position;
    this.position = 0;
  }

  extractFromMarkedPosition() {
    return this.buffer.substring(this.markedPosition, this.position);
  }

  markPosition() {
    this.markedPosition = this.position;
  }

  *[Symbol.iterator]() {
    for (; this.position < this.buffer.length; this.position++) {
      yield this.buffer.charCodeAt(this.position);
    }
  }

  peek() {
    return this.buffer.charCodeAt(this.position);
  }

  advance() {
    return this.buffer.charCodeAt(this.position++);
  }

  lineEndReached() {
    this.currentLine++;
  }
}
