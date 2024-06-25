import { SetMetadata } from "@nestjs/common";

export const hasRole = (...hasRoles: string[]) => SetMetadata('roles', hasRoles);