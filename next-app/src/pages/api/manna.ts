import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import { EdenClient } from '@edenlabs/eden-sdk';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authToken = req.session.token;
  
  if (!authToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const eden = new EdenClient();
    // eden.setAuthToken(authToken);

    // const result = await eden.getManna();
    
    if (true) { //result.error) {
      //return res.status(500).json({ error: result.error });
      return res.status(200).json({ manna: 1 });
    } else {
      //return res.status(200).json({ manna: result.manna });
      return res.status(200).json({ manna: 0 });
    }
  } 
  catch (error: any) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export default withSessionRoute(handler);
