export async function getAllProducts({
  limit = 40,
  category = "",
  brand=""
}: { limit?: number; category?: string,brand?:string } = {}) {
  const URL = category
    ? `${process.env.API_BASE_URL}/api/v1/products?limit=${limit}&category=${category}`
    :brand?
    `${process.env.API_BASE_URL}/api/v1/products?limit=${limit}&brand=${brand}`
    : `${process.env.API_BASE_URL}/api/v1/products?limit=${limit}`;
  try {
    const res = await fetch(`${URL}`);
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

export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/products/${id}`
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
