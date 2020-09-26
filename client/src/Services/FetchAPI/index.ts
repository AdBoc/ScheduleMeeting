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

  async getCharacter(user: string) {
    try {
      const response = await fetch(`${this.url}/character`, {
        method: "POST",
        body: JSON.stringify({user}),
      });
      console.log(response);
      if (response.status === 400) return "error";
      return response.json();
    } catch (error) {
      return "error";
    }
  }

  sendCharacter() {
    const rBody = {
      user: localStorage.getItem("user"),
      character: localStorage.getItem("character"),
    };
    fetch(`${this.url}/character`, {
      method: "PATCH",
      body: JSON.stringify(rBody),
    });
  }

  async selectAllDays(date: string, name: string) {
    const rBody = {
      name,
      date: date
    };
    try {
      const response = await fetch(`${this.url}/selectAll`, {
        method: "POST",
        body: JSON.stringify(rBody)
      });
      console.log(response.status);
      return response.status;
    } catch (error) {
      return "error";
    }
  }

  async unselectAllDays(date: string, name: string) {
    const rBody = {
      name,
      date: date
    };
    try {
      const response = await fetch(`${this.url}/unselectAll`, {
        method: "POST",
        body: JSON.stringify(rBody)
      });
      return response.status
    } catch (error) {
      return "error";
    }
  }
}

export const apiService = new ApiService();
