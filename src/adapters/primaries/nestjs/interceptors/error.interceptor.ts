import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException as NestNotFoundException,
  ConflictException as NestConflictException,
  InternalServerErrorException as NestIntervalServerErrorException,
  UnauthorizedException as NestUnauthorizedException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UnauthorizedException } from '../../../../domain/exceptions/unauthorized.exeption';
import { ConflictException } from '../../../../domain/exceptions/conflict.exception';
import { NotFoundException } from '../../../../domain/exceptions/not-found.exception';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<Error> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof NotFoundException) {
          return throwError(() => new NestNotFoundException(error.message));
        }
        if (error instanceof ConflictException) {
          return throwError(() => new NestConflictException(error.message));
        }
        if (error instanceof UnauthorizedException) {
          return throwError(() => new NestUnauthorizedException(error.message));
        }
        return throwError(
          () => new NestIntervalServerErrorException(error.message),
        );
      }),
    );
  }
}
