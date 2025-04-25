
export const test = (req, res) => {
  try {
    console.log("Inside test route");
    res.json("Hello");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

