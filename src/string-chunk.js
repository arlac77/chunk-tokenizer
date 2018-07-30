export class StringChunk {
  constructor() {
    this.currentLine = 1;
  }

  append(buffer) {
    this.buffer =
      this.buffer === undefined
        ? buffer
        : this.buffer.substring(this.position) + buffer;
    this.position = 0;
    this.markedPosition = undefined;
  }

  extractFromMarkedPositionAndAdvance() {
    const i = this.position;
    this.position = this.markedPosition + 1;
    return this.buffer.substring(this.markedPosition, i);
  }

  markPosition() {
    this.markedPosition = this.position;
  }

  *[Symbol.iterator]() {
    for (; this.position < this.buffer.length; this.position++) {
      yield this.buffer.charCodeAt(this.position);
    }
  }

  newLine() {
    this.currentLine++;
  }
}
