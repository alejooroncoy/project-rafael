import { AuthContainer } from "@/server/auth/infrastructure/container/inversify.conf";
import { AUTH_CONTAINER_TYPES } from "@/server/auth/infrastructure/container/types";
import { CreateUserFromFirebaseCase } from "@/server/auth/application/CreateUserFromFirebaseCase";
import { NextRequest, NextResponse } from "next/server";
import { ValidateFirebaseTokenCase } from "@/server/auth/application/ValidateFirebaseTokenCase";

export async function POST(req: NextRequest) {
  try {
    const { token, name, secretSignup } = await req.json();
    
    const decoded = await AuthContainer.get<ValidateFirebaseTokenCase>(AUTH_CONTAINER_TYPES.ValidateFirebaseTokenCase).execute(token);
    if (!decoded.email) {
      return NextResponse.json({ message: "Email not found" }, { status: 400 });
    }
    await AuthContainer.get<CreateUserFromFirebaseCase>(AUTH_CONTAINER_TYPES.CreateUserFromFirebaseCase).execute(decoded.uid, decoded.email, name);
    return NextResponse.json({ message: "Account created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating account" }, { status: 500 });
  }
}