import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../validation/shemaValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories";

export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email,name,password,confirmPassword} = req.body;
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.flatten() });
    }
  
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const user = userRepository.create({name,email, password: hashedPassword},);
  


    /// Save the user to the database
    await userRepository.save(user);
    // Send a success response
    return res.status(201).json({ message: "User registered successfully",user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
//login code
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.flatten() });
    }

    const { email, password } = parsedData.data;
    console.log("Login Body Password:", password);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    console.log("User Password in DB:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};







