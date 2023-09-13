
const addDoctor = async (req, res) => {
  try {
    return res.status(200).send('route completed');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports ={
  addDoctor
}