import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import axios from 'axios';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.body;

  try {
    const response = await axios.get('http://localhost:5050/memory/get');
    const memories = response.data.memories;
    console.log("mems", memories)
    res.status(200).send({ memories });
  } catch (error: any) {
    res.status(500).send({ error: "Error" });
  }
};

export default withSessionRoute(handler);
