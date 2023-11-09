const API_URL = 'https://boom-dorian-forest.glitch.me/api';

export const getData = async (url) => {
  try {
    const response = await fetch(`${API_URL}${url}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json();

  } catch (error) {
    console.error('Ошибка при получении данных: ', error);
    throw error;
  }
};