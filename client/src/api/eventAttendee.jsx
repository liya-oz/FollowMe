export const getMyEvents = async () => {
  try {
    const response = await fetch("/api/event-attendees/my-events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching my events:", error);
    throw error;
  }
};
