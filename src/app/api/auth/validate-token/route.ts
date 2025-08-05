import { AuthContainer } from "@/server/auth/infrastructure/container/inversify.conf";
import { AUTH_CONTAINER_TYPES } from "@/server/auth/infrastructure/container/types";
import { ValidateFirebaseTokenCase } from "@/server/auth/application/ValidateFirebaseTokenCase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const validateTokenCase = AuthContainer.get<ValidateFirebaseTokenCase>(AUTH_CONTAINER_TYPES.ValidateFirebaseTokenCase);
    const { uid } = await validateTokenCase.execute(token);
    
    return NextResponse.json({ uid });
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
} 