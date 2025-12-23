import ProtectedRoute from "@/app/components/ProtectedRoute";
import CreateOrGenerateReceiptForm from "@/app/components/dashboard/CreateOrGenerateReceiptForm";
import { redirect } from "next/navigation";

export default async function CreateReceipt({ searchParams }) {
  
  const { mode, id } = await searchParams;

  if (mode === "generate" && !id) {
    redirect("/app/create-receipt");
  }
  return (
    <ProtectedRoute>
      <CreateOrGenerateReceiptForm mode={mode} id={id} />
    </ProtectedRoute>
  );
}