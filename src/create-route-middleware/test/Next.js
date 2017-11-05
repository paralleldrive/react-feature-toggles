const Next = (v = false) => ({
  next: () => v = true,
  valueOf: () => v
});

export default Next;