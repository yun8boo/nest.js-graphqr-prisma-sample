import { Injectable } from '@nestjs/common';
import { AuthGuard as P_AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends P_AuthGuard('local') {}
