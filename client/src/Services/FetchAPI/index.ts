class ApiService {
  url = "https://moreoverandabove/api";
  async getSelectedMonthData(date: string) {
    const rBody = { date };
    const response = await fetch(`${this.url}/`, {
      method: "POST",
      body: JSON.stringify(rBody),
    });
    if (response.status >= 400 && response.status <= 600) {
      return { daysData: [] };
    }
    return response.json();
  }

  async addSelectedDay(date: string, day: string, name: string) {
    const rBody = { date, day, name };
    const response = await fetch(`${this.url}/new`, {
      method: "POST",
      body: JSON.stringify(rBody),
    });
    return response.status;
  }

  async unselectDay(date: string, day: string, name: string) {
    const rBody = { date, day, name };
    const response = await fetch(`${this.url}/`, {
      method: "PATCH",
      body: JSON.stringify(rBody),
    });
    return response.status;
  }

  async getCharacter() {
    const rBody = {
      user: localStorage.getItem("user"),
    };
    const response = await fetch(`${this.url}/character`, {
      method: "POST",
      body: JSON.stringify(rBody),
    });
    if (response.status >= 400 && response.status <= 600) {
      return "error";
    }
    return response.json();
  }

  async sendCharacter() {
    const rBody = {
      user: localStorage.getItem("user"),
      character: localStorage.getItem("character"),
    };
    const response = await fetch(`${this.url}/character`, {
      method: "PATCH",
      body: JSON.stringify(rBody),
    });
    return response.status;
  }
}
export const apiService = new ApiService();
