import jwt, { Secret } from 'jsonwebtoken';
import { injectable } from 'inversify';
import { IncomingHttpHeaders } from 'http';

@injectable()
export class JWTTokenUtil {
    private readonly AUTH_HEADER = 'authorization';

    private readonly SCHEME = 'bearer';

    private readonly MATCHER = /(\S+)\s+(\S+)/;

    generateToken(payload: any, payloadKey: string, secret: Secret, expiresIn: string | number): string {
      return jwt.sign(payloadKey ? { [payloadKey]: payload } : payload, secret, {
        expiresIn,
      });
    }

    decodeToken(token: string, secret: string): object | string | null {
      try {
        return jwt.verify(token, secret);
      } catch {
        return null;
      }
    }

    getTokenFromHeaders(headers: IncomingHttpHeaders): string | null {
      const authHeader = headers[this.AUTH_HEADER];
      if (!authHeader) {
        return null;
      }
      const matches = authHeader.match(this.MATCHER);

      return matches && matches[2];
    }
}
