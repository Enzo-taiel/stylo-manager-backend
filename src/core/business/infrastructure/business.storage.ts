import { supabase } from "@/shared/infrastructure/storage/supabase.config";
import { Types } from "mongoose";

export class BusinessStorage {

  static async uploadFavicon(category: string, file: Express.Multer.File, businessId: Types.ObjectId, userId: Types.ObjectId) {
    const fileName = `favicon/${userId}/${businessId}/${file.originalname}`;
    const { error } = await supabase.storage
      .from(category)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(`Error uploading favicon: ${error.message}`);
    const { data } = supabase.storage.from(category).getPublicUrl(fileName);
    return data.publicUrl
  }
}