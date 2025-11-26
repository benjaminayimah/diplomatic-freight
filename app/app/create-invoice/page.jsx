import ProtectedRoute from "@/app/components/ProtectedRoute";
import CreateOrUpdateInvoiceForm from "@/app/components/dashboard/CreateOrUpdateInvoiceForm";
import { redirect } from "next/navigation";

export default async function CreateInvoice({ searchParams }) {
  
  const { mode, id } = await searchParams;

  if (mode === "edit" && !id) {
    redirect("/app/create-invoice");
  }
  return (
    <ProtectedRoute>
      <CreateOrUpdateInvoiceForm mode={mode} id={id} />
    </ProtectedRoute>
  );
}