import * as Constants from '../utils/constants';
import WebUtil from '../utils/webUtil'
import JWT from '../utils/jwtUtil';
import { Request, Response, response } from 'express';
import UserTransactionDB, { TransactionDetail, UserTransactions, Rating } from '../model/transaction';
import UserDB from '../model/user';
import { match } from 'assert';

class Rate {

    // Validate if user has transaction using token, id and stars
    private validate(req: Request): boolean {
        const body = req.body;
        if (req.headers.bearer && body.transactionId && body.stars) {
            return true;
        } else return false;
    } 
    // find transaction using email as index
    private findTransaction = async (email: string, req: Request, res: Response, flag: boolean, callback: Function) => {
        console.log("body", req.body);
        let rating = {} as Rating;
        let body = req.body
        UserTransactionDB.findOne({ email }, (findErr: any, findResult: UserTransactions) => {
            if (findErr) {
                callback(Constants.TRANSACTION_NOT_FOUND, null)
            } else {
                //flag: true for user getting rated and false for user giving rating
                if (flag) {
                    findResult.transactions.forEach(transactionDetail => {
                        // make sure id is eqal to bod req.body.id and thtat transactionDetail doesnt already have a rating
                        if (transactionDetail.transactionId === body.transactionId && transactionDetail.rating == undefined) {
                            rating.stars = body.stars;
                            rating.comment = body.comment;
                            rating.timestamp = Date.now();
                            transactionDetail.rating = rating
                        } else {
                            WebUtil.errorResponse(res, Error, Constants.CLIENT_ERROR_RATING, 400);
                        }
                    });
                    callback(null, findResult.transactions)
                } else {
                    console.log("test", findResult);
                    // else speciic dowwn to specific one and return
                    let matchingTransaction = findResult.transactions.filter(transactionDetail => transactionDetail.transactionId === req.body.transactionId);
                    console.log('matching t', matchingTransaction);

                    if (!matchingTransaction || matchingTransaction.length < 1) {
                        // respond with error msg transaction not exist 404
                        WebUtil.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                        callback(Constants.TRANSACTION_NOT_FOUND, null)
                    } else {
                        callback(null, matchingTransaction);
                    }
                }
            }

        });
    }

    private updateAvgRating = (email: string, rating: number, res: Response): void => {
        // add updated rating to user table
        UserDB.findOneAndUpdate({ email }, { rating }, (findErr: any, findResult: any | null) => {
            if (findErr) {
                WebUtil.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                return;
            } else {
                const message = {
                    code: Constants.SUCCESS,
                    message: Constants.TRANSACTION_FOUND
                }
                WebUtil.successResponse(res, message, 202);
            }
        });
    }

    public account = (req: Request, res: Response): void => {
        try {
            console.log(Constants.RATING_LOG);
            const spotbackCorrelationId: string | string[] | undefined = req.headers["spotback-correlation-id"];
            if (!this.validate(req) || !spotbackCorrelationId) throw new Error(Constants.CLIENT_ERROR_HB);
            const legit = JWT.verify(req.headers.bearer as string);
            if (legit) {
                const email: string = legit.email;
                console.log(`the email ${email}`);
                // email belonging to user who wrote the rating
                this.findTransaction(email, req, res, false, (userWhoWroteRatingError: any, userWhoWroteRatingResult: any) => {
                    // callback error
                    if (userWhoWroteRatingError) {
                        WebUtil.errorResponse(res, userWhoWroteRatingResult, Constants.SERVER_ERROR, 400);
                        return;
                    } else {
                        //flag: if false then return just one result if true it returns all of them
                        console.log("matching transaction", userWhoWroteRatingResult);
                        if (!userWhoWroteRatingResult || userWhoWroteRatingResult.length < 1) {
                            WebUtil.errorResponse(res, null, Constants.TRANSACTION_NOT_FOUND, 404);
                            console.log("log in the error");
                            return;
                        } else {
                            // callback result
                            let userGettingRated = userWhoWroteRatingResult[0].email
                            console.log(`matching transaction email 0 ${userGettingRated}`);
                            this.findTransaction(userGettingRated, req, res, true, (userWhoIsGettingRatedError: any, userWhoGettingRatedResult: any) => {
                                if (userWhoIsGettingRatedError) {
                                    WebUtil.errorResponse(res, userWhoIsGettingRatedError, Constants.SERVER_ERROR, 500);
                                    return;
                                } else {
                                    UserTransactionDB.findOneAndUpdate({ email: userGettingRated }, { transactions: userWhoGettingRatedResult }, (findErr: any, findResult: UserTransactions | null) => {
                                        if (findErr) {
                                            WebUtil.errorResponse(res, findErr, Constants.SERVER_ERROR, 500);
                                            return;
                                        } else {
                                            // calculate new average and update the user account
                                            const avgOfAllRatings = userWhoGettingRatedResult.reduce((prev: number, cur: TransactionDetail) => prev + cur.rating.stars, 0) / userWhoGettingRatedResult.length;
                                            this.updateAvgRating(userGettingRated, avgOfAllRatings, res)
                                        }
                                    });
                                }
                            })
                        }
                    }
                });
            } else {
                WebUtil.errorResponse(res, Constants.CLIENT_ERROR_UA_T, Constants.CLIENT_ERROR_UA, 401);
                return;
            }
        } catch (error) {
            WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
            return;
        }
    }
}

export default new Rate();
