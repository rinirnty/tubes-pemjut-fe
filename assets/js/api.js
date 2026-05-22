const BASE_URL = "http://localhost:5500/api";

async function getProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}