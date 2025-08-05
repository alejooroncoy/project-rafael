import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { secretSignup } = await req.json();
    
    // Validate secret signup code
    if (!secretSignup || secretSignup !== process.env.SECRET_SIGNUP) {
      return NextResponse.json({ 
        valid: false, 
        message: "Código de registro inválido" 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      valid: true, 
      message: "Código de registro válido" 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      valid: false, 
      message: "Error validando código de registro" 
    }, { status: 500 });
  }
} 