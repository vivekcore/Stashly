import { UserAuth, Uservalidation } from "../middlewares/userMiddleware.js";
import jwt from "jsonwebtoken";
import getConfig from "../config.js";
import models, { contentTypes } from "../db/db.js";

import { Request, Response } from "express";
import { compare, hash } from "bcrypt-ts";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
//import z from "zod";
const router = Router();
const env = getConfig();

router.post("/signup", Uservalidation, async (req: Request, res: Response) => {
  const { Username, email, password } = req.body;
  try {
    const response = await models.userModel.findOne({ Username });
    if (response) {
      res.status(401).json({
        msg: "Username already exist try differern name",
      });
      return;
    }
    const result = await hash(password, 10);
    const data = await models.userModel.create({
      Username,
      email,
      password: result,
    });
    const payload = { userId: data._id.toString() };
    const token = jwt.sign(payload, env.USER_SECRET_KEY);
    res.status(200).json({
      msg: "Signup sucussfully",
      token,
    });
  } catch (error) {
    res.status(401).json({
      msg: "Error: " + error,
    });
  }
});
router.post("/signin", async (req: Request, res: Response) => {
  const { Username, password } = req.body;
  try {
    const user = await models.userModel.findOne({ Username });
    if (!user || !user.password) {
      res.status(401).json({
        msg: "Invalid username or password",
      });
      return;
    }
    const result = await compare(password, user.password);
    if (!result) {
      res.status(401).json({
        msg: "Incorrect password",
      });
      return;
    }
    const payload = { userId: user._id.toString() };
    const token = jwt.sign(payload, env.USER_SECRET_KEY);
    res.status(200).json({
      msg: "SignIn sucessfully",
      token,
    });
  } catch (error) {
    res.json({
      msg: "Error: " + error,
    });
  }
});
router.post("/content", UserAuth, async (req: Request, res: Response) => {
  const { link, type, title, description, linkType,tags } = req.body;
  try {
    // const schemaValid = z.object({
    //   link: z.string(),
    //   type: z.enum(contentTypes),
    //   title: z.string(),
    // });
    // const parse = schemaValid.safeParse(req.body);
    // if (!parse.success) {
    //   return res.status(400).json({
    //     msg: parse.error.issues.map((val) => ({
    //       Field: val.path,
    //       Message: val.message,
    //     })),
    //   });
    // }
    const result = await models.contentModel.create({
      link,
      type,
      title,
      tags: tags || [],
      description,
      linkType,
      //@ts-ignore
      userId: req.userId,
    });
    res.status(200).json({
      msg: "content added",
      result,
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
router.get("/content", UserAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  try {
    const resp = await models.contentModel
      .find({ userId })
      .populate("userId", "Username");
    res.status(200).json({
      msg: resp,
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
router.get(
  "/content/linktype",
  UserAuth,
  async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    // linkType is sent as a query parameter from the client (axios.get with params)
    const linkType = String(req.query.linkType || "");
    try {
      const resp = await models.contentModel
        .find({ userId, linkType })
        .populate("userId", "Username");
      res.status(200).json({
        msg: resp,
      });
    } catch (error) {
      res.json({
        msg: error,
      });
    }
  },
);
router.delete("/content", UserAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const { contentId } = req.body;
  try {
    await models.contentModel.deleteOne({
      _id: contentId,
      userId,
    });
    res.status(200).json({
      msg: "Content deleted",
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
router.get("/content/share", UserAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const { share } = req.body;
  //   const { contentId } = req.body.contentId;
  //   const { host } = req.headers;
  try {
    if (share) {
      const existingLink = await models.linksModel.findOne({ userId });
      if (existingLink) {
        res.json({
          msg: "Link generated",
          Link: "user/content/" + existingLink.hash,
        });
        return;
      }
      let hash = uuidv4();
      await models.linksModel.create({
        userId,
        hash,
      });
      res.json({
        msg: "Link generated",
        Link: "user/content/" + hash,
      });
    } else {
      await models.linksModel.deleteOne({ userId });

      res.json({
        msg: "Removed sharable link",
      });
    }
    // const response = await models.contentModel.findOne({ userId, contentId });
    // res.json({
    //   Link: `${host}/user/content/${response?.id}`,
    // });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
router.get("/content/:shareLink", async (req: Request, res: Response) => {
  const hash = req.params.shareLink;

  try {
    const link = await models.linksModel.findOne({ hash: hash as string });

    if (!link || !link.userId) {
      res.status(411).json({
        msg: "Sorry incorrect input",
      });
      return;
    }

    const content = await models.contentModel.find({
      userId: link.userId,
    });
    const user = await models.userModel.findOne({ _id: link.userId });
    if (!user) {
      res.status(411).json({
        msg: " Error user does not exist",
      });
      return;
    }
    res.json({
      username: user?.Username,
      constent: content,
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
  //   try {
  //     const response = await models.contentModel.findOne({ _id: contentId });
  //     res.json({
  //       Content: response,
  //     });
  //   } catch (error) {
  //     res.json({
  //       msg: error,
  //     });
  //   }
});
export default router;
