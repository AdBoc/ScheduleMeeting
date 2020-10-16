const url = "http://localhost:8080/api"

export async function getSelectedMonthData(month: number, year: number, controller: AbortController) {
  try {
    const response = await fetch(`${url}/`, {
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

export async function selectAllDays(month: number, year: number, user: string) {
  try {
    const response = await fetch(`${url}/selectAll`, {
      method: "POST",
      body: JSON.stringify({month, year, user})
    });
    return response.status;
  } catch (error) {
    return "error";
  }
}

export async function unselectAllDays(month: number, year: number, user: string) {
  try {
    const response = await fetch(`${url}/unselectAll`, {
      method: "POST",
      body: JSON.stringify({month, year, user})
    });
    return response.status
  } catch (error) {
    return "error";
  }
}

export async function selectDay(month: number, year: number, day: number, user: string) {
  try {
    const response = await fetch(`${url}/new`, {
      method: "POST",
      body: JSON.stringify({month, year, day, user}),
    });
    return response.status;
  } catch (error) {
    return error;
  }
}

export async function getCharacter(user: string) {
  try {
    const response = await fetch(`${url}/character`, {
      method: "POST",
      body: JSON.stringify({user}),
    });
    if (response.status !== 200) return response.status;
    return response.json();
  } catch (error) {
    return 500;
  }
}

export async function sendCharacter() {
  await fetch(`${url}/character`, {
    method: "PATCH",
    body: JSON.stringify({
      user: localStorage.getItem("user"),
      character: localStorage.getItem("character"),
    }),
  });
}