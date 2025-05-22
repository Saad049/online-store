import z from "zod";
export const signupSchema = z.object({
    
    email: z.string().email("Invalid email address").regex(/@(gmail|yahoo|hotmail|outlook)\.com$/, "Email must be Gmail, Yahoo, Hotmail or Outlook"),
    password: z.string().min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
     name: z.string().min(3),
     
    
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export const orderStatusSchema = z.object({
  status: z.enum(['pending', 'cancelled', 'delivered', 'shipped'], {
    errorMap: () => ({ message: 'Invalid status. Must be pending, cancelled, delivered, or shipped' }),
  }),
});