import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  const { role, name, email, password, phone, address } = req.body;

  if (!role || !name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  const existing = await User.findOne({ email: normalizedEmail });
  if (existing)
    return res.status(409).json({ message: "Email already exists" });

  const passwordHash = await bcrypt.hash(String(password), 10);

  const status = role === "VENDOR" ? "PENDING" : "ACTIVE";

  const user = await User.create({
    role,
    status,
    name,
    email: normalizedEmail,
    passwordHash,
    phone: phone || "",
    address: address || "",
  });

  return res.status(201).json({
    message: "Registered",
    user: {
      id: user._id,
      role: user.role,
      status: user.status,
      name: user.name,
      email: user.email,
    },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccessToken(user);

  return res.json({
    accessToken,
    user: {
      id: user._id,
      role: user.role,
      status: user.status,
      name: user.name,
      email: user.email,
    },
  });
}

function signAccessToken(user: any) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || "15m") as any },
  );
}

export async function me(req: Request, res: Response) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing token" });

  const token = auth.slice("Bearer ".length);

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as any;
    const user = await User.findById(payload.sub).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ user });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
