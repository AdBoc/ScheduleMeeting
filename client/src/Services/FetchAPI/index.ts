class ApiService {
  url = "https://dev.moreoverandabove.com/api";
  async getSelectedMonthData(date: string) {
    const rBody = { date };
    try {
      const response = await fetch(`${this.url}/`, {
        method: "POST",
        body: JSON.stringify(rBody),
      });
      if (response.status >= 400 && response.status <= 600) {
        return { daysData: [] };
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return { daysData: [] };
    }
  } //w odpowiedzi przesylac obiekt z propery {datsData: [], error} i jesli te error jest to odpowiedni komunikat

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

// async getSelectedMonthData(date: string) {
//   const rBody = { date };
//   const response = await fetch(`${this.url}/`, {
//     method: "POST",
//     body: JSON.stringify(rBody),
//   });
//   if (response.status >= 400 && response.status <= 600) {
//     return { daysData: [] };
//   }
//   return response.json();
// }
