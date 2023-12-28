export const API = "https://pokeapi.co/api/v2/";

export async function get<T>(url: string, fullpath: boolean = true) {
  try {
    const data = await fetch(fullpath ? url: `${API}${url}`);
    const response: T = await data.json();

    return response;
  }
  catch (error: any) {
    console.log('error', error);
    return null;
  }
}
