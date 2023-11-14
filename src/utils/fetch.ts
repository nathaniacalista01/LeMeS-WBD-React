export class Fetch {
  private base_url;
  constructor() {
    this.base_url = process.env.REST_URL;
    if (!process.env.REST_URL) {
      this.base_url = "http://localhost:8000/api";
    }
  }

  public async searchUser(username: string, url: string) {
    const fetch_url = `${this.base_url}${url}`;
    const response = await fetch(fetch_url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    });
    console.log(response);
  }
}
