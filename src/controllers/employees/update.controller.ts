import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { EmployeesModel } from "../../database/models/index.model";
import { supabase } from "../../helpers/supabase";

export const UpdateEmployeeController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ inputError: errors.array()[0], success: false });

  const { employeeId } = req.params;
  const { name, skills, days_unavailable, hours_unavailable, existingJobs, info } = req.body;
  // @ts-ignore — Multer agrega los campos dinámicamente
  const file = req.files?.avatar?.[0] as Express.Multer.File | undefined;
  // @ts-ignore
  const jobFiles = req.files?.jobs as Express.Multer.File[] | undefined;

  const parsed = {
    ...(name && { name }),
    skills: skills ? JSON.parse(skills) : [],
    days_unavailable: days_unavailable ? JSON.parse(days_unavailable) : [],
    hours_unavailable: hours_unavailable ? JSON.parse(hours_unavailable) : [],
    info: info ? JSON.parse(info) : {},
  };

  try {
    // Buscar al empleado por ID
    const employee = await EmployeesModel.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Empleado no encontrado.' });

    if (file) {
      const fileName = `avatar/BID${req.businessId}-UID${req.userId}-EID${employeeId}-${file.originalname}`;

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
            upsert: true,
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


      employee.jobs = [...uploadedUrls, ...JSON.parse(existingJobs)];
    } else {
      employee.jobs = [...JSON.parse(existingJobs)]
    }


    // Actualizar campos opcionales
    Object.keys(parsed).forEach((key) => {
      if (key === 'info' && typeof parsed.info === 'object') {
        employee.info = { ...employee.info, ...parsed.info };
      } else {
        (employee as any)[key] = parsed[key];
      }
    });

    await employee.save();

    return res.status(200).json({ message: 'Empleado actualizado correctamente.', employee });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el empleado.', error: error.message });
  }
};
