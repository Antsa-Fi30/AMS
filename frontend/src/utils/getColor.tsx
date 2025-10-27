export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "success";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};
