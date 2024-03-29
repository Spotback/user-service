import * as Constants from "../utils/constants";
import WebUtil from "../utils/webUtil";
import JWT from "../utils/jwtUtil";
import EMAIL from "../utils/emailUtil";
import { v1 as uuidv1 } from "uuid";
import Auth from "../utils/auth";
import UserDB, { User, Car } from "../model/user";
import { Request, Response } from "express";
import * as fs from "fs";
import * as Stripe from "../utils/stripeUtil";

class Create {
  private validateNewAccnt(newAccnt: User): boolean {
    if (Object.keys(newAccnt).length < 5) return false;
    if (
      "freeSpots" in newAccnt ||
      "balance" in newAccnt ||
      "referrals" in newAccnt
    )
      return false;
    return true;
  }

  private create(newUser: User, res: Response, referralCode?: string): void {
    const password: string = newUser.password;
    let freeSpots = 0;
    Auth.hashPassword(password, (err: Error, hash: string) => {
      if (err) {
        // throw and error
        WebUtil.errorResponse(res, err, Constants.SERVER_ERROR, 500);
      } else {
        newUser.password = hash;
        newUser.referralCode = uuidv1();
        // eslint-disable-next-line @typescript-eslint/camelcase
        newUser.created_time = Date.now();
        if (referralCode) {
          UserDB.findOneAndUpdate(
            { referralCode },
            {
              $push: {
                referrals: newUser.email as string,
              },
              $inc: {
                freeSpots: 1,
              },
            },
            {},
            (updateErr: any, doc: User | null, updateRes: any) => {
              if (updateErr) {
                console.log(updateErr);
              } else if (doc) {
                freeSpots = 1;
              }
            }
          );
        }
        const id = Stripe.createCustomer(newUser).then((id: any) => {
          if (id) {
            newUser.stripeToken = id;
            UserDB.create(newUser).then(
              (createResult: User): void => {
                const responseBody = {
                  message: Constants.ACCOUNT_CREATION_MESSAGE,
                  freeSpots: freeSpots,
                  user: WebUtil.stripPII(createResult),
                };
                const token: string = JWT.sign(Object.assign({}, createResult));
                WebUtil.successResponse(res, responseBody, 200, {
                  bearer: token,
                });
              },
              (createErr: any): void => {
                WebUtil.errorResponse(
                  res,
                  createErr,
                  Constants.SERVER_ERROR,
                  500
                );
                return;
              }
            );
          } else {
            WebUtil.errorResponse(
              res,
              Constants.STRIPE_ERROR,
              Constants.SERVER_ERROR,
              500
            );
            return;
          }
        });
      }
    });
  }

  public account = (req: Request, res: Response): void => {
    try {
      const referralCode = req.body.referralCode;
      req.body.referralCode = undefined;
      console.log(Constants.CREATE_REQ_LOG);
      const body: User = req.body ? (req.body as User) : ({} as User);
      const spotbackCorrelationId: string | string[] | undefined =
        req.headers["spotback-correlation-id"];
      if (!this.validateNewAccnt(body) || !spotbackCorrelationId)
        throw new Error(Constants.CLIENT_ERROR_HB);
      UserDB.findOne(
        { email: body.email, phone: body.phone },
        (findErr: any, findRes: User | null): void => {
          if (findErr) {
            WebUtil.errorResponse(res, findErr, Constants.SERVER_ERROR, 500);
            return;
          } else if (findRes) {
            WebUtil.errorResponse(
              res,
              Constants.ACCOUNT_EXISTS_LOG,
              Constants.CLIENT_ERROR_AE,
              409
            );
            return;
          } else {
            // const welcomHTML = fs.readFileSync(
            //   Constants.WELCOME_HTML_LOCATION,
            //   "utf8"
            // );
            // EMAIL.send(
            //   welcomHTML,
            //   Constants.WELCOME_SUBJECT,
            //   body,
            //   (emailErr: any, emailResult: any): void => {
            //     if (emailErr) {
            //       WebUtil.errorResponse(
            //         res,
            //         emailErr,
            //         Constants.SERVER_ERROR,
            //         500
            //       );
            //     } else {
            //       this.create(body, res, referralCode);
            //     }
            //   }
            // );
            this.create(body, res, referralCode);
          }
        }
      );
    } catch (error) {
      WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
      return;
    }
  };
}

export default new Create();
