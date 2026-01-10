
export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // Nota: el mes en Date empieza desde 0

  const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long'  };
  return new Intl.DateTimeFormat('es-ES', opciones).format(date);
};