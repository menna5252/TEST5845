export async function getAllBrands() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands`);
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
export async function getSpecificBrand(brandIs: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/brands/${brandIs}`
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
