import { NextRequest, NextResponse } from 'next/server';
import { AuthContainer } from '@/server/auth/infrastructure/container/inversify.conf';
import { AUTH_CONTAINER_TYPES } from '@/server/auth/infrastructure/container/types';
import { SetRoleCase } from '@/server/auth/application/SetRoleCase';
import { auth } from '@/lib/auth/infrastructure/services/NextAuthService';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }
  const { role } = await req.json();
  if (!role) {
    return NextResponse.json({ error: 'Rol requerido.' }, { status: 400 });
  }
  try {
    const setRoleCase = AuthContainer.get<SetRoleCase>(AUTH_CONTAINER_TYPES.SetRoleCase);
    await setRoleCase.execute(session.user.id, role);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'No se pudo actualizar el rol.' }, { status: 400 });
  }
} 