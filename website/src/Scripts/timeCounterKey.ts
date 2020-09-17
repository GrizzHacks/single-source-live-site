let key: number;

export const setKey = (newKey: number) => {
  key = newKey;
};

const keysMatch = (currentKey: number) => key === currentKey;

export const updateCurrentTime = (
  key: number,
  setCurrentTimeMilliseconds: (time: number) => void
) => {
  setKey(key);
  setCurrentTimeMilliseconds(Date.now());
  setTimeout(() => {
    if (keysMatch(key)) {
      updateCurrentTime(key, setCurrentTimeMilliseconds);
    }
  }, 1000);
};
