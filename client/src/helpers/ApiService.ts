class ApiService {
  async getSelectedMonthData() {
    const response = await fetch("http://localhost:8080/api/");
    if (response.status >= 400 && response.status <= 600) {
      return Promise.reject("Server could not access file");
    }
    return response.json();
  };

  async changeSelectedMonthData() { }
  async unselectDay() { }
}
export const apiService = new ApiService();
