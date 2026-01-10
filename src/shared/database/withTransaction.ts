import mongoose from "mongoose";

export interface ITransactionManager {
  run<T>(work: (session: unknown) => Promise<T>): Promise<T>;
}

export async function withTransaction<T>(handle: (session: mongoose.mongo.ClientSession) => Promise<T>): Promise<T> {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const result = await handle(session)
    await session.commitTransaction()
    return result
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

export class MongooseTransactionManager implements ITransactionManager {

  async run<T>(work: (session: any) => Promise<T>): Promise<T> {
    return withTransaction(work);
  }
}