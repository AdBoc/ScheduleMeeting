class ApiService {
  async getSelectedMonthData(date: string) {
    const rBody = { date };
    const response = await fetch("http://localhost:8080/", {
      method: "POST",
      body: JSON.stringify(rBody)
    });
    if (response.status >= 400 && response.status <= 600) {
      return Promise.reject("Could not get response");
    }
    return response.json();
  };

  async addSelectedDay(date: string, day: string, color: string) {
    const rBody = { date, day, color };
    console.log('adding day');
    const response = await fetch("http://localhost:8080/new", {
      method: "POST",
      body: JSON.stringify(rBody)
    });
    if (response.status >= 400 && response.status <= 600) {
      return Promise.reject("Could not get response");
    }
    return response.status;
  }

  async unselectDay(date: string, day: string, color: string) {
    const rBody = { date, day, color };
    console.log('deleting day');
    const response = await fetch("http://localhost:8080/", {
      method: "PATCH",
      body: JSON.stringify(rBody)
    });
    if (response.status >= 400 && response.status <= 600) {
      return Promise.reject("Could not get response");
    }
    return response.status;
  }
}
export const apiService = new ApiService();
