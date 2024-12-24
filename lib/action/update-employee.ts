"use server";
import { z } from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const EmployeeSchema = z.object({
  id: z.string().min(1, "ID is required."),
  name: z.string().min(1, "Name is required."),
  years: z.string().min(1, "Years worked is required."),
  userEmail: z.string().email("Valid user email is required."),
  department: z.string().min(1, "Department is required."),
});

export async function updateEmployee(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log("Received form data:", data);

  // Validate the form data
  const validatedFields = EmployeeSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten());
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, name, years, department, userEmail } = validatedFields.data;

  try {
    // Ensure all fields are non-null before attempting the update
    if (!id || !name || !years || !department || !userEmail) {
      throw new Error("Missing required fields");
    }

    // Perform the update
    await prisma.employee.update({
      where: { id },
      data: { name, years, department, userEmail },
    });

  } catch (error) {
    console.error("Error updating employee:", error);
    return { error: { message: ["Failed to update employee"] } };
  }
  revalidatePath("/");
  redirect('/')
}
