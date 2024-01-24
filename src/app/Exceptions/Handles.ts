import { NextFunction, Request, Response } from "express"

class Handles {

  public error(error: any, req: Request, res: Response, next: NextFunction) {
    let status = error['status']
    if(status === "" || status === undefined) {
      status = 500
    } 
    res.status(status).json({ message: error.message, status })
    // error["status"] = 200;
    return;
  }

}

export const handles: Handles = new Handles();