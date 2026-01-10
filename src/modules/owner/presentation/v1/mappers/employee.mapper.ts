// import { tryParseArray } from "@/shared/utils/tryParse";
// import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../dto/employee.dto";

// const normalizeArrayOfStrings = (value: any): string[] => {
//   return tryParseArray(value).map((v: any) =>
//     String(v).trim().toLowerCase()
//   );
// };

// const normalizeInfo = (info: any) => {
//   if (!info) return { };

//   return {
//     city: info.city?.trim() ?? "",
//     hoursAvailable: tryParseArray(info.hoursAvailable),
//     daysAvailable: tryParseArray(info.daysAvailable)
//   };
// };

// export const normalizeCreateEmployee = (body: any): CreateEmployeeDTO => {
//   return {
//     name: body.name?.trim() ?? "",
//     skills: normalizeArrayOfStrings(body.skills),
//     daysUnavailable: normalizeArrayOfStrings(body.daysUnavailable),
//     hoursUnavailable: normalizeArrayOfStrings(body.hoursUnavailable),
//     info: normalizeInfo(body.info)
//   };
// };


// export const normalizeUpdateEmployee = (body: any): UpdateEmployeeDTO => {
//   return {
//     name: body.name?.trim() ?? "",
//     skills: normalizeArrayOfStrings(body.skills),
//     daysUnavailable: normalizeArrayOfStrings(body.daysUnavailable),
//     hoursUnavailable: normalizeArrayOfStrings(body.hoursUnavailable),
//     info: normalizeInfo(body.info)
//   };
// };
