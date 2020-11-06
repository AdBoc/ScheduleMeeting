import {toast} from "react-toastify";

class Api {
  private _url = "http://localhost:8080/api"

  public async getCharacter(user: string) {
    try {
      const response = await fetch(`${this._url}/character`, {
        method: "POST",
        body: JSON.stringify({user}),
      });
      if (response.status === 201) {
        toast.success("Character Created");
        return;
      } else if (response.status === 200) {
        const character = await response.json();
        localStorage.setItem("user", user);
        localStorage.setItem("character", character);
        return character;
      }
    } catch (error) {
      toast.error("Connection Error");
      return null;
    }
  }

  async sendCharacter() {
    await fetch(`${this._url}/character`, {
      method: "PATCH",
      body: JSON.stringify({
        user: localStorage.getItem("user"),
        character: localStorage.getItem("character"),
      }),
    });
  }

  async deleteCharacter() {
    try {
      const user = localStorage.getItem("user");
      await fetch(`${this._url}/delete`, {
        method: "DELETE",
        body: JSON.stringify({user})
      });
    } catch (e) {
      toast.error("Connection Error")
    }
  }

  async getSelectedMonthData(month: number, year: number, controller: AbortController) {
    try {
      const response = await fetch(`${this._url}/`, {
        method: "POST",
        body: JSON.stringify({month, year}),
        signal: controller.signal,
      });
      return response.json();
    } catch (error) {
      console.log(error);
      toast.error("Connection error");
      if (controller.signal.aborted) return;
      return {daysData: []};
    }
  }

  async selectAllDays(month: number, year: number, user: string) {
    try {
      const response = await fetch(`${this._url}/selectAll`, {
        method: "POST",
        body: JSON.stringify({month, year, user})
      });
      if (response.status === 403) return toast.error("Select only next two months");
    } catch (e) {
      return toast.error("Connection Error");
    }
  }

  async unselectAllDays(month: number, year: number, user: string) {
    try {
      const response = await fetch(`${this._url}/unselectAll`, {
        method: "POST",
        body: JSON.stringify({month, year, user})
      });
      if (response.status === 403) return toast.error("Select only next two months");
    } catch (e) {
      return toast.error("Connection Error");
    }
  }

  async selectDay(month: number, year: number, day: number, user: string) {
    try {
      const response = await fetch(`${this._url}/new`, {
        method: "POST",
        body: JSON.stringify({month, year, day, user}),
      });
      if (response.status === 403) return toast.error("Select only next two months")
    } catch (e) {
      return toast.error("Connection Error");
    }
  }
}

const api = new Api();
export default api;