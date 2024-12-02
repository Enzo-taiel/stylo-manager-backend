import { Schema } from 'mongoose';
// SCHEMAS
import { SalesSchema } from '../schemas'
import { getIO } from '../sockets/connect';

const Sales_Schema = new Schema(SalesSchema, { timestamps: true });

Sales_Schema.post("save", async function (document, next) {
  const io = getIO()
  const newSale = (
    await (
      await document.populate('employee', 'full_name avatar_url')
    ).populate('service', 'title mount createdAt')
  )
  io.emit("insert-sale", newSale)
  next()
})

Sales_Schema.pre("deleteOne", async function (next) {
  const { _id } = this.getFilter()
  const io = getIO()
  io.emit("delete-sale", _id)
  next()
})

export { Sales_Schema }