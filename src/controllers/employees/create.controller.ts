import { NextFunction, Request, Response } from "express";
import { validationResult,  } from "express-validator";
import { EmployeesModel } from "../../database/models/index.model";
import { supabase } from "../../helpers/supabase";

export const CreateEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] })

  const { name, skills, days_unavailable, hours_unavailable, info, existingJobs } = req.body;
  // @ts-ignore — Multer agrega los campos dinámicamente
  const file = req.files?.avatar?.[0] as Express.Multer.File | undefined;
  // @ts-ignore
  const jobFiles = req.files?.jobs as Express.Multer.File[] | undefined;

  const parsed = {
    ...(name && { name }),
    skills: JSON.parse(skills),
    days_unavailable: JSON.parse(days_unavailable),
    hours_unavailable: JSON.parse(hours_unavailable),
    jobs: JSON.parse(existingJobs),
    info: JSON.parse(info),
    business: req.businessId
  };

  try {
    const employee = await EmployeesModel.create(parsed)

    if (file) {
      const fileName = `avatar/BID${req.businessId}-UID${req.userId}-EID${employee._id}-${file.originalname}`;

      const { error } = await supabase.storage
        .from("peluqueria")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error al subir la imagen a Supabase.",
          error: error.message,
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from("peluqueria")
        .getPublicUrl(fileName);

      employee.avatar_url = publicUrlData.publicUrl;
    }


    if (jobFiles && jobFiles.length > 0) {
      const uploadedUrls: string[] = [];

      for (const [index, jobFile] of jobFiles.entries()) {
        const fileName = `jobs/BID${req.businessId}-UID${req.userId}-EID${employee._id}-${Date.now()}-${index}-${jobFile.originalname}`;

        const { error } = await supabase.storage
          .from("peluqueria")
          .upload(fileName, jobFile.buffer, {
            contentType: jobFile.mimetype,
            upsert: false,
          });

        if (error) {
          console.error("❌ Error al subir job:", error.message);
          continue;
        }

        const { data: publicUrlData } = supabase.storage
          .from("peluqueria")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      // Agregar las nuevas imágenes al array existente
      employee.jobs = [...(employee.jobs), ...uploadedUrls];
    }

    await employee.save()
    return res.status(200).json({ message: "Empleado creado correctamente.", employee, success: true, error: false })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}