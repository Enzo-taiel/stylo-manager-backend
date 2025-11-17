import { Request, Response, NextFunction } from "express"
import { UsersModel, BusinessModel } from "../../database/models/index.model";

export const ObtainMeController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId
  try {
    const user = await UsersModel.findById(userId).select("-password -__v -createdAt -updatedAt");
    if (!user) return next({ status: 404, message: "User not found" });

    const business = await BusinessModel.findOne({ owner: user._id });
    return res.status(200).json({
      error: false,
      success: true,
      message: "User data obtained successfully.",
      user,
      business: business ?? null,
    })
  } catch (error) {
    return next(error);
  }
}