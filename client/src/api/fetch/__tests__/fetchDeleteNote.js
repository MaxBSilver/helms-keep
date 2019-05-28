import { host, mockNote, mockTask } from "../../utilities";
import { fetchDeleteNote } from "../fetchDeleteNote";

describe("fetchDeleteNote", () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve('Note succesfully deleted')
    });
  });

  it("should call fetch with the correct params", () => {
  const url = `${host}quests/1234`;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetchDeleteNote(1234);
    expect(fetch).toHaveBeenCalledWith(url, options);
  });

  it("should return a success message", async () => {
    const response = await fetchDeleteNote(1234);
    const result = await response.json();
    expect(result).toEqual('Note succesfully deleted');
  });

  it("should throw an error if fetch fails", async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });

    try {
      await fetchDeleteNote(1234);
    } catch (error) {
      expect(error.message).toEqual("Failed to delete note");
    }
  });
});
