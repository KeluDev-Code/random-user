const headers = {
  'Content-Type': 'application/json',
};

const get = async <T>(url: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    return await response.json() as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return undefined;
  }
};

export const http = {
  get,
};
