import {
  getJokes,
  getOneJoke,
  updateJoke,
  deleteJoke,
  addJokeToDeliver,
  deleteJokeFromDeliver,
} from "../services/jokeService.js";

export const fetchJokes = async (req, res) => {
  try {
    const jokes = await getJokes();
    res.status(200).json(jokes.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jokes", error: error.message });
  }
};

export const fetchOneJoke = async (req, res) => {
  try {
    const id = req.params.id;
    const jokeResponse = await getOneJoke(id);
    res.status(200).json(jokeResponse.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching joke", error: error.message });
  }
};

export const editJoke = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedJoke = await updateJoke(id, updatedData);
    res.status(200).json(updatedJoke.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating joke", error: error.message });
  }
};

export const removeJoke = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteJoke(id);
    res.status(200).json({ message: "Joke deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting joke", error: error.message });
  }
};

export const submitJokeToDeliver = async (req, res) => {
  try {
    const newJoke = req.body;
    const jokeId = newJoke._id; // Assuming the joke ID is passed within the newJoke object

    // Step 1: Submit the joke to the Deliver Jokes microservice
    const savedJoke = await addJokeToDeliver(newJoke);

    // Step 2: Delete the joke from the Submit Jokes microservice if it was successfully added to Deliver Jokes
    await deleteJoke(jokeId);

    // Step 3: Respond with the success message
    res.status(200).json({
      message:
        "Joke submitted to Deliver Jokes and deleted from Submit Jokes successfully",
      data: savedJoke.data,
    });
  } catch (error) {
    // If either request fails, check if the joke was added to Deliver Jokes
    if (error.response && error.response.status === 500 && savedJoke) {
      // If deletion failed but the joke was submitted, attempt to roll back by deleting from Deliver Jokes
      await deleteJokeFromDeliver(savedJoke.data._id);
    }
    // Send an error response
    res.status(500).json({
      message:
        "Error submitting joke to deliver or deleting from submit jokes. Rolled back successfully.",
      error: error.message,
    });
  }
};
