export const setObject = async (key, payload) => {
  try {
    const tempUser = JSON.stringify(payload);
    await localStorage.setItem(key, tempUser);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getObject = async (key) => {
  try {
    const jsonValue = await localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const clearObject = async (key) => {
  try {
    await localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
    // saving error
  }
};
