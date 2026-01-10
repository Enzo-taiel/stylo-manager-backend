import { supabase } from "@/shared/infrastructure/storage/supabase.config";

export class BusinessStorage {

  static async uploadAvatarEmployee(category: string, file: Express.Multer.File, userId: string, businessId: string, employeeId: string) {
    const fileName = `avatar/${userId}/${businessId}/${employeeId}/${file.originalname}`;

    const { error } = await supabase.storage
      .from(category)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(`Error uploading avatar: ${error.message}`);
    const { data } = supabase.storage.from(category).getPublicUrl(fileName);
    return data.publicUrl
  }
}