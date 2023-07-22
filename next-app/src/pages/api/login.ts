import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import { SiweMessage } from 'siwe'
// import { EdenClient } from '@edenlabs/eden-sdk';
import axios from 'axios';

interface ApiRequest extends NextApiRequest {
  body: {
    message: string;
    signature: string;
    address: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { message, signature, address } = req.body;

  try {
    const siweMessage = new SiweMessage(message);
		const fields = await siweMessage.validate(signature);
		if (fields.nonce !== req.session.nonce) {
			return res.status(422).json({ error: "Invalid nonce" });
		}

    // const eden = new EdenClient();

    console.log("login")
    console.log(message)
    console.log(address)
    console.log(signature)
    // const result = await eden.login(
    //   message, 
    //   signature, 
    //   address
    // );

    const result = await axios.post(`/api/login`, {
      address,
      message,
      signature,
    });

    console.log("result");
    console.log(result);

    // if (result.error) {
    //   return res.status(500).json({ error: result.error });
    // }

    // req.session.token = result.token;
    // req.session.userId = result.userId;
    // req.session.username = result.username;
    req.session.address = address;
    
    await req.session.save();

    //res.status(200).send({ message: `Successfully authenticated as ${address}`, newUser: result.newUser });
    res.status(200).send({ message: `Successfully authenticated as ${address}`, newUser: false });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error authenticating key pair" });
  }
};

export default withSessionRoute(handler);
