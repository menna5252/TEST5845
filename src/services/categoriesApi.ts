export async function getAllCategories() {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/categories`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
export async function getSpecificCategory(categoryId: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/categories/${categoryId}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
