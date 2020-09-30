class ApiService {
  url = "http://localhost:8080/api";

  async getSelectedMonthData(month: number, year: number, controller: AbortController) {
    try {
      const response = await fetch(`${this.url}/`, {
        method: "POST",
        body: JSON.stringify({month, year}),
        signal: controller.signal,
      });
      return response.json();
    } catch (error) {
      if (controller.signal.aborted) return {daysData: false};
      return {daysData: [], error: true};
    }
  }

  async addSelectedDay(month: number, year: number, day: number, user: string) {
    try {
      const response = await fetch(`${this.url}/new`, {
        method: "POST",
        body: JSON.stringify({month, year, day, user}),
      });
      return response.status;
    } catch (error) {
      return error;
    }
  }

  async unselectDay(month: number, year: number, day: number, user: string) {
    try {
      const response = await fetch(`${this.url}/`, {
        method: "PATCH",
        body: JSON.stringify({month, year, day, user}),
      });
      return response.status;
    } catch (error) {
      return error;
    }
  }

  async getCharacter(user: string) {
    try {
      const response = await fetch(`${this.url}/character`, {
        method: "POST",
        body: JSON.stringify({user}),
      });
      if (response.status === 400) return "error";
      return response.json();
    } catch (error) {
      return "error";
    }
  }

  async sendCharacter() {
    await fetch(`${this.url}/character`, {
      method: "PATCH",
      body: JSON.stringify({
        user: localStorage.getItem("user"),
        character: localStorage.getItem("character"),
      }),
    });
  }

  async selectAllDays(month: number, year: number, user: string) {
    try {
      const response = await fetch(`${this.url}/selectAll`, {
        method: "POST",
        body: JSON.stringify({month, year, user})
      });
      return response.status;
    } catch (error) {
      return "error";
    }
  }

  async unselectAllDays(month: number, year: number, user: string) {
    try {
      const response = await fetch(`${this.url}/unselectAll`, {
        method: "POST",
        body: JSON.stringify({month, year, user})
      });
      return response.status
    } catch (error) {
      return "error";
    }
  }
}

export const apiService = new ApiService();
