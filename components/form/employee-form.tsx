"use client";
import React from "react";
import { useActionState } from "react";
import { createEmployee } from "@/lib/action/create-employee";
import { updateEmployee } from "@/lib/action/update-employee";
import SubmitButton from "./submit-btn";

interface EmployeeFormProps {
  action: "create" | "update";
  userEmail: string | null;
  initialData?: {
    id?: string;
    name: string;
    department: string;
    years: string;
  };
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  action,
  userEmail,
  initialData,
}) => {
  // Adjust actionWrapper to match the signature expected by useActionState
  const actionWrapper = async (_state: any, formData: FormData) => {
    return action === "create"
      ? await createEmployee(formData)
      : await updateEmployee(formData);
  };

  // Use the adjusted actionWrapper
  const [state, formAction] = useActionState(actionWrapper, null);

  return (
    <form
      action={formAction}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
    >
      <input type="hidden" name="userEmail" value={userEmail || ""} />
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={initialData?.name || ""}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-200"
          required
        />
      </div>
      <div>
        <label
          htmlFor="department"
          className="block text-gray-700 font-medium mb-2"
        >
          Department
        </label>
        <input
          id="department"
          name="department"
          type="text"
          defaultValue={initialData?.department || ""}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-200"
          required
        />
      </div>
      <div>
        <label
          htmlFor="years"
          className="block text-gray-700 font-medium mb-2"
        >
          Years Worked
        </label>
        <input
          id="years"
          name="years"
          type="number"
          defaultValue={initialData?.years || ""}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-purple-200"
          min="0"
          required
        />
      </div>
      <SubmitButton
        defaultText={action === "create" ? "Create Employee" : "Update Employee"}
        pendingText={action === "create" ? "Creating..." : "Updating..."}
      />
      {state?.error && (
        <div className="text-red-500 text-sm mt-2">
          {Object.entries(state.error)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join(". ")}
        </div>
      )}
    </form>
  );
};

export default EmployeeForm;
