export const getExampleData = async () => {
    const response = await fetch('http://localhost:5051/api/get-data');
    if (!response.ok) {
      throw new Error('Ошибка при получении данных с API');
    }
    return response.json();
  };
  