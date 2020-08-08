class ApiService {
  async getSelectedMonthData(date: string) {
    const rBody = { date };
    const response = await fetch("http://localhost:8080/", {
      method: "POST",
      body: JSON.stringify(rBody)
    });
    if (response.status >= 400 && response.status <= 600) {
      Promise.reject("Could not receieve data for month");
      return { daysData: [] };
    }
    return response.json();
  };

  async addSelectedDay(date: string, day: string, name: string) {
    const rBody = { date, day, name };
    const response = await fetch("http://localhost:8080/new", {
      method: "POST",
      body: JSON.stringify(rBody)
    });
    if (response.status >= 400 && response.status <= 600) {
      return Promise.reject("Failed to add new Data");
    }
    return response.status;
  }

  async unselectDay(date: string, day: string, name: string) {
    const rBody = { date, day, name };
    const response = await fetch("http://localhost:8080/", {
      method: "PATCH",
      body: JSON.stringify(rBody)
    });
    if (response.status >= 400 && response.status <= 600) {
      return Promise.reject("Failed while changing data");
    }
    return response.status;
  }
}
export const apiService = new ApiService();