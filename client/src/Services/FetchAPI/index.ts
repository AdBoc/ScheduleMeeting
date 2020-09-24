class ApiService {
  url = "http://localhost:8080/api";

  async getSelectedMonthData(date: string, controller: AbortController) {
    const rBody = {date};
    try {
      const response = await fetch(`${this.url}/`, {
        method: "POST",
        body: JSON.stringify(rBody),
        signal: controller.signal,
      });
      return response.json();
    } catch (error) {
      if (controller.signal.aborted) return {daysData: false};
      return {daysData: [], error: true};
    }
  }

  async addSelectedDay(date: string, day: string, name: string) {
    const rBody = {date, day, name};
    try {
      const response = await fetch(`${this.url}/new`, {
        method: "POST",
        body: JSON.stringify(rBody),
      });
      return response.status;
    } catch (error) {
      return error;
    }
  }

  async unselectDay(date: string, day: string, name: string) {
    const rBody = {date, day, name};
    try {
      const response = await fetch(`${this.url}/`, {
        method: "PATCH",
        body: JSON.stringify(rBody),
      });
      return response.status;
    } catch (error) {
      return error;
    }
  }

  async getCharacter() {
    const rBody = {
      user: localStorage.getItem("user"),
    };
    try {
      const response = await fetch(`${this.url}/character`, {
        method: "POST",
        body: JSON.stringify(rBody),
      });
      if (response.status === 400) return "error";
      return response.json();
    } catch (error) {
      return "error";
    }
  }

  async sendCharacter() {
    const rBody = {
      user: localStorage.getItem("user"),
      character: localStorage.getItem("character"),
    };
    try {
      const response = await fetch(`${this.url}/character`, {
        method: "PATCH",
        body: JSON.stringify(rBody),
      });
      return response.status;
    } catch (error) {
      return error;
    }
  }
}

export const apiService = new ApiService();
