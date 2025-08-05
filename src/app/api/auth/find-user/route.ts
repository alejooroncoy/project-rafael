import { AuthContainer } from "@/server/auth/infrastructure/container/inversify.conf";
import { AUTH_CONTAINER_TYPES } from "@/server/auth/infrastructure/container/types";
import { FindUserByFirebaseUidCase } from "@/server/auth/application/FindUserByFirebaseUidCase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();
    
    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    const findUserCase = AuthContainer.get<FindUserByFirebaseUidCase>(AUTH_CONTAINER_TYPES.FindUserByFirebaseUidCase);
    const user = await findUserCase.execute(uid);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.uid.value,
      email: user.email,
      name: user.name,
      role: user.role?.value || ""
    });
  } catch (error) {
    console.error('Error finding user:', error);
    return NextResponse.json({ error: "Error finding user" }, { status: 500 });
  }
} 