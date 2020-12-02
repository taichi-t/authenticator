import * as express from 'express';

class UserController {
  getUser: express.RequestHandler = (req, res) => {
    const { info } = req.session;
    req.session.info = null;
    if (!req.user) {
      return res
        .status(401)
        .send(info || { message: 'You are not currently logged in' });
    }
    if (info) {
      return res.status(401).send(info);
    }
    return res.json(req.user);
  };
}

export default UserController;
