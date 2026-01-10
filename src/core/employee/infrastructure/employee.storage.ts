import { supabase } from "@/shared/infrastructure/storage/supabase.config";

export class EmployeeStorage {

  static async uploadAvatar(category: string, file: Express.Multer.File, businessId: string, userId: string, employeeId: string) {
    const fileName = `avatar/${userId}/${businessId}/${employeeId}/${file.originalname}`;
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

  static async uploadJobs(files: Express.Multer.File[], category: string, userId: string, businessId: string, employeeId: string) {

    const jobsUrl: string[] = []

    for (const [, jobFile] of files.entries()) {
      const fileName = `jobs/${userId}/${businessId}-EID${employeeId}/${jobFile.originalname}`;

      const { error } = await supabase.storage
        .from(category)
        .upload(fileName, jobFile.buffer, {
          contentType: jobFile.mimetype,
          upsert: false,
        });

      if (error) {
        throw new Error(`Error uploading jobs: ${error.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from(category)
        .getPublicUrl(fileName);

      jobsUrl.push(publicUrlData.publicUrl);
    }

    return jobsUrl

  }

}