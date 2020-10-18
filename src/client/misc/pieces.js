const Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
];

const S = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const T = [
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
];

const L = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
];

const J = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
];

const O = [
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
];

const I = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
];

const pieces = [
  [L, "#b69"],
  [T, "lime"],
  [Z, "#f6f"],
  [S, "#69f"],
  [J, "#7ff"],
  [O, "#e26"],
  [I, "#ff8"],
];

const pieceStartPosition = (pieceNumber, pieceVariant) => {
  if (
    pieceNumber === 0 ||
    pieceNumber === 4 ||
    pieceNumber === 2 ||
    pieceNumber === 3
  ) {
    return [0, 3];
  }
  if (pieceNumber === 6) {
    if (pieceVariant === 0 || pieceVariant === 2) return [0, 3];
    else return [-1, 3];
  }
  if (pieceNumber === 1) {
    if (pieceVariant === 1) return [-1, 3];
    else if (pieceVariant === 0 || pieceVariant === 3) return [0, 3];
    else return [0, 4];
  }
  if (pieceNumber === 5) return [0, 4];
};

export { pieces, pieceStartPosition };
