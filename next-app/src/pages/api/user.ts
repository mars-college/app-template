import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import { EdenClient } from '@edenlabs/eden-sdk';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, username, address } = req.session;
  const { userAddress } = req.body as { userAddress: string };

  // check if session token still valid
  if (token) {
    const eden = new EdenClient({token: token});
    // eden.setAuthToken(token);
    const result = await eden.manna.balance();
    if (result.error) {
      req.session.destroy();
      return res.status(200).json({ token: null });
    }
  }

  if (userAddress !== address) {
    req.session.destroy();
  }
  
  return res.status(200).send({username, address, token});
}

export default withSessionRoute(handler)
