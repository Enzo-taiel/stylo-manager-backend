import mongoose from 'mongoose'


// this function return number for identify problems.
// if this function return 0: It means that has been created the collection.
// if this functions retun 1: It means that the mistake is in the name
// if this function return 2: It means that the error is on the server

const createCollection = async (businessName: string) => {

  try {
    const collections = await mongoose.connection.db.listCollections().toArray()
    // The name of the business is compared with the collections in the database

    const existCollection = collections.some((collect) => collect.name === businessName);
    if (existCollection) return 1

    await mongoose.connection.db.createCollection(businessName);
    return 0
  } catch (error) {
    console.error(error)
    return 2
  }

}

export { createCollection }