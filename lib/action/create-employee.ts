"use server";
import { z } from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const EmployeeSchema = z.object({
  name: z.string().min(1, "Name is required."),
  years: z.string(),
  userEmail: z.string(),
  department: z.string().min(1, "Department is required."),
});

export async function createEmployee(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = EmployeeSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, years, department, userEmail } = validatedFields.data;

  try {
    await prisma.employee.create({
      data: { name, years, department, userEmail },
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return { error: { message: ["Failed to create employee"] } };
  }
  revalidatePath("/");
  redirect('/')
}
